import { randomUUID } from 'node:crypto';
import type { Request, Response } from 'express';
import {
  AUTH_FLOW_COOKIE_NAME,
  SESSION_COOKIE_NAME,
  clearAuthCookies,
  clearAuthFlowCookie,
  setAuthFlowCookie,
  setSessionCookie
} from './cookies';
import {
  buildAuthorizationUrl,
  createPkcePair,
  exchangeAuthorizationCode,
  fetchDiscovery,
  isProviderConfigured,
  verifyIdToken
} from './oidc';
import { buildAuthErrorRedirect, getSafeAuthRedirectTarget } from './redirect';
import { getState, persistState } from './state-store';
import { signAuthFlow, signSession, verifyAuthFlow, verifySession } from './tokens';
import type {
  AuthProviderConfig,
  HttpError,
  OidcFlowPayload,
  OidcVerifiedIdentity,
  RequestWithCookies,
  SessionPayload,
  SessionUser
} from './types';

type ProviderSummary = {
  id: string;
  type: string;
  label: string;
  enabled: boolean;
  isConfigured: boolean;
  status: 'active' | 'disabled' | 'not_configured';
  loginPath: string;
};

type ProviderUpdateInput = {
  provider?: unknown;
  label?: unknown;
  enabled?: unknown;
  clientId?: unknown;
  clientSecret?: unknown;
  issuer?: unknown;
  discoveryUrl?: unknown;
  scopes?: unknown;
};

type ExternalIdentityLoginInput = {
  authProvider: string;
  identity: OidcVerifiedIdentity;
  productCode: string;
};

export function getPublicBaseUrl(req: Request): string {
  const configured = (process.env.BFF_PUBLIC_BASE_URL || '').replace(/\/+$/, '');
  if (configured) return configured;
  const proto = req.get('x-forwarded-proto') || req.protocol || 'http';
  return `${proto}://${req.get('host')}`;
}

function getProvider(providerId: string): AuthProviderConfig {
  const config = getState().providerConfigs[providerId];
  if (!config) {
    throw createHttpError(404, `Auth provider ${providerId} not found`);
  }
  return config;
}

export function listProviders(): { items: ProviderSummary[] } {
  return {
    items: listProviderSummaries().filter((provider) => provider.status === 'active')
  };
}

export function listAdminProviders(): { items: ProviderSummary[] } {
  return {
    items: listProviderSummaries()
  };
}

function listProviderSummaries(): ProviderSummary[] {
  return Object.values(getState().providerConfigs).map((config) => ({
    id: config.id,
    type: config.type,
    label: config.label,
    enabled: Boolean(config.enabled),
    isConfigured: isProviderConfigured(config),
    status: !config.enabled
      ? 'disabled'
      : isProviderConfigured(config)
        ? 'active'
        : 'not_configured',
    loginPath: `/api/auth/providers/${config.id}/start`
  }));
}

export function getAdminProvider(providerId: string, req: Request) {
  const config = getProvider(providerId);
  return {
    provider: {
      id: config.id,
      type: config.type,
      label: config.label,
      enabled: Boolean(config.enabled),
      isConfigured: isProviderConfigured(config),
      hasClientSecret: Boolean(config.clientSecret),
      status: !config.enabled
        ? 'disabled'
        : isProviderConfigured(config)
          ? 'active'
          : 'not_configured',
      loginPath: `/api/auth/providers/${config.id}/start`,
      publicBaseUrl: getPublicBaseUrl(req),
      callbackUri: `${getPublicBaseUrl(req)}/api/auth/providers/${config.id}/callback`,
      issuer: config.issuer,
      discoveryUrl: config.discoveryUrl,
      scopes: config.scopes
    }
  };
}

export async function updateAdminProvider(providerId: string, body: unknown) {
  const state = getState();
  const current = getProvider(providerId);
  const bodyRecord = isRecord(body) ? (body as ProviderUpdateInput) : {};
  const input = isRecord(bodyRecord.provider)
    ? (bodyRecord.provider as ProviderUpdateInput)
    : bodyRecord;
  const next: AuthProviderConfig = {
    ...current,
    label: normalizeOptionalString(input.label) || current.label,
    enabled: input.enabled === undefined ? current.enabled : Boolean(input.enabled),
    clientId: normalizeOptionalString(input.clientId),
    clientSecret: normalizeOptionalString(input.clientSecret),
    issuer: normalizeOptionalString(input.issuer),
    discoveryUrl: normalizeOptionalString(input.discoveryUrl),
    scopes: Array.isArray(input.scopes)
      ? input.scopes.map(normalizeOptionalString).filter(isString)
      : current.scopes
  };

  if (next.issuer && !next.discoveryUrl) {
    next.discoveryUrl = `${next.issuer.replace(/\/+$/, '')}/.well-known/openid-configuration`;
  }

  state.providerConfigs[providerId] = next;
  await persistState();
  return { provider: { ...next, clientSecret: undefined } };
}

export async function startOidc(
  req: Request,
  res: Response,
  providerId: string
): Promise<void> {
  const config = getProvider(providerId);
  if (!isProviderConfigured(config)) {
    throw createHttpError(404, `OIDC provider ${providerId} is not available`);
  }

  const productCode = normalizeProductCode(req.query.productCode);
  const redirectTo = getSafeAuthRedirectTarget(req.query.redirect || req.query.returnTo);
  const discovery = await fetchDiscovery(config);
  const pkce = createPkcePair();
  const redirectUri = `${getPublicBaseUrl(req)}/api/auth/providers/${providerId}/callback`;
  const authFlowToken = await signAuthFlow({
    codeVerifier: pkce.codeVerifier,
    nonce: pkce.nonce,
    providerId,
    productCode,
    redirectTo,
    redirectUri,
    state: pkce.state
  });
  const authorizationUrl = buildAuthorizationUrl(config, discovery, {
    codeChallenge: pkce.codeChallenge,
    nonce: pkce.nonce,
    redirectUri,
    state: pkce.state
  });

  setAuthFlowCookie(res, authFlowToken);
  res.redirect(302, authorizationUrl);
}

export async function completeOidc(
  req: RequestWithCookies,
  res: Response,
  providerId: string
): Promise<void> {
  const flowToken = req.cookies?.[AUTH_FLOW_COOKIE_NAME];
  clearAuthFlowCookie(res);
  let redirectTo = '/';

  try {
    if (!flowToken) {
      throw createHttpError(401, 'Missing OIDC flow cookie');
    }

    const flow = await verifyAuthFlow(flowToken);
    assertCompleteFlow(flow);
    redirectTo = getSafeAuthRedirectTarget(flow.redirectTo);

    if (flow.providerId !== providerId) {
      throw createHttpError(401, 'OIDC flow mismatch');
    }

    if (req.query.error) {
      res.redirect(302, buildAuthErrorRedirect(redirectTo));
      return;
    }

    if (!req.query.code || req.query.state !== flow.state) {
      throw createHttpError(401, 'OIDC state validation failed');
    }

    const config = getProvider(providerId);
    const discovery = await fetchDiscovery(config);
    const tokenPayload = await exchangeAuthorizationCode(config, discovery, {
      code: String(req.query.code),
      codeVerifier: flow.codeVerifier,
      redirectUri: flow.redirectUri
    });
    const idToken = normalizeOptionalString(tokenPayload.id_token);
    if (!idToken) {
      throw createHttpError(401, 'OIDC response missing id_token');
    }

    const identity = await verifyIdToken(config, discovery, idToken, flow.nonce);
    const user = await resolveExternalIdentityLogin({
      authProvider: providerId,
      identity,
      productCode: flow.productCode
    });
    const sessionToken = await signSession(user);
    setSessionCookie(res, sessionToken);
    res.redirect(302, redirectTo);
  } catch {
    clearAuthCookies(res);
    res.redirect(302, buildAuthErrorRedirect(redirectTo));
  }
}

export async function getSession(req: RequestWithCookies, res: Response) {
  const token = req.cookies?.[SESSION_COOKIE_NAME];
  if (!token) {
    throw createHttpError(401, 'Missing session cookie');
  }

  const payload = await verifySession(token);
  const user = buildUserFromSessionPayload(payload);
  const refreshed = await signSession(user);
  setSessionCookie(res, refreshed);
  return {
    user,
    accessToken: null
  };
}

export function logout(_req: Request, res: Response): { success: true } {
  clearAuthCookies(res);
  return { success: true };
}

export async function getProfile(req: RequestWithCookies, res: Response) {
  const session = await getSession(req, res);
  return buildProfileFromUser(session.user);
}

async function resolveExternalIdentityLogin(
  input: ExternalIdentityLoginInput
): Promise<SessionUser> {
  const state = getState();
  const now = new Date().toISOString();
  let authIdentity = state.authIdentities.find(
    (entry) =>
      entry.provider === input.authProvider && entry.subject === input.identity.subject
  );
  let user = authIdentity
    ? state.users.find((entry) => entry.id === authIdentity?.userId)
    : null;

  if (!user) {
    user = state.users.find((entry) => entry.email === input.identity.email);
  }

  if (!user) {
    user = {
      id: randomUUID(),
      email: input.identity.email,
      name: input.identity.displayName || input.identity.email,
      createdAt: now,
      updatedAt: now
    };
    state.users.push(user);
  }

  if (!authIdentity) {
    authIdentity = {
      id: randomUUID(),
      userId: user.id,
      provider: input.authProvider,
      subject: input.identity.subject,
      issuer: input.identity.issuer,
      email: input.identity.email,
      createdAt: now,
      updatedAt: now
    };
    state.authIdentities.push(authIdentity);
  }

  let membership = state.memberships.find(
    (entry) => entry.userId === user.id && entry.productCode === input.productCode
  );
  if (!membership) {
    membership = {
      id: randomUUID(),
      userId: user.id,
      productCode: input.productCode,
      subjectId: user.id,
      role: 'user',
      active: true,
      createdAt: now,
      updatedAt: now
    };
    state.memberships.push(membership);
  }

  user.updatedAt = now;
  authIdentity.updatedAt = now;
  await persistState();

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    authMethod: 'oidc',
    authProvider: input.authProvider,
    memberships: state.memberships.filter(
      (entry) => entry.userId === user.id && entry.active !== false
    )
  };
}

function buildUserFromSessionPayload(payload: SessionPayload): SessionUser {
  if (!payload.sub || !payload.email) {
    throw createHttpError(401, 'Invalid session token');
  }

  return {
    id: payload.sub,
    email: payload.email,
    name: payload.name || payload.email,
    authMethod: 'oidc',
    authProvider:
      typeof payload.authProvider === 'string' ? payload.authProvider : null,
    memberships: Array.isArray(payload.memberships)
      ? payload.memberships
      : []
  };
}

function buildProfileFromUser(user: SessionUser) {
  const membership = user.memberships[0] || null;
  return {
    id: user.id,
    name: user.name || user.email || 'Utente autenticato',
    email: user.email || null,
    package: membership?.productCode || '—',
    role: membership?.role || null,
    gbUsed: 0,
    gbTotal: 0,
    authProvider: user.authProvider || null,
    authMethod: user.authMethod || null,
    memberships: user.memberships
  };
}

function assertCompleteFlow(
  flow: OidcFlowPayload
): asserts flow is Required<Omit<OidcFlowPayload, 'type'>> & { type?: string } {
  if (
    !flow.codeVerifier ||
    !flow.nonce ||
    !flow.providerId ||
    !flow.productCode ||
    !flow.redirectTo ||
    !flow.redirectUri ||
    !flow.state
  ) {
    throw createHttpError(401, 'Invalid OIDC flow token');
  }
}

function normalizeProductCode(value: unknown): string {
  const normalized = normalizeOptionalString(value);
  if (!normalized) {
    throw createHttpError(400, 'productCode is required');
  }
  return normalized;
}

function normalizeOptionalString(value: unknown): string | null {
  const normalized = String(value || '').trim();
  return normalized || null;
}

function isString(value: string | null): value is string {
  return value !== null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function createHttpError(status: number, message: string): HttpError {
  const error = new Error(message) as HttpError;
  error.status = status;
  return error;
}
