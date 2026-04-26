import { createHash } from 'node:crypto';
import * as jose from 'jose';
import { createRandomValue } from './tokens';
import type {
  AuthProviderConfig,
  HttpError,
  OidcDiscoveryDocument,
  OidcVerifiedIdentity
} from './types';

type OidcTokenResponse = {
  id_token?: unknown;
};

export function isProviderConfigured(config: AuthProviderConfig | undefined): boolean {
  return Boolean(
    config &&
      config.type === 'oidc' &&
      config.enabled &&
      config.clientId &&
      config.clientSecret &&
      config.issuer &&
      config.discoveryUrl
  );
}

export async function fetchDiscovery(
  config: AuthProviderConfig
): Promise<OidcDiscoveryDocument> {
  if (!config.discoveryUrl) {
    throw createHttpError(503, 'OIDC discovery URL is missing');
  }

  const response = await fetch(config.discoveryUrl);
  if (!response.ok) {
    throw createHttpError(503, `Unable to load OIDC discovery for ${config.id}`);
  }

  const discovery = (await response.json()) as Partial<OidcDiscoveryDocument>;
  if (
    discovery.issuer !== config.issuer ||
    !discovery.authorization_endpoint ||
    !discovery.token_endpoint ||
    !discovery.jwks_uri
  ) {
    throw createHttpError(503, 'OIDC discovery payload is invalid');
  }
  return discovery as OidcDiscoveryDocument;
}

export function createPkcePair(): {
  codeVerifier: string;
  codeChallenge: string;
  nonce: string;
  state: string;
} {
  const codeVerifier = createRandomValue(48);
  return {
    codeVerifier,
    codeChallenge: createHash('sha256').update(codeVerifier).digest('base64url'),
    nonce: createRandomValue(),
    state: createRandomValue()
  };
}

export function buildAuthorizationUrl(
  config: AuthProviderConfig,
  discovery: OidcDiscoveryDocument,
  input: {
    codeChallenge: string;
    nonce: string;
    redirectUri: string;
    state: string;
  }
): string {
  const url = new URL(discovery.authorization_endpoint);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id', config.clientId || '');
  url.searchParams.set('redirect_uri', input.redirectUri);
  url.searchParams.set('response_mode', 'query');
  url.searchParams.set('scope', config.scopes.join(' '));
  url.searchParams.set('state', input.state);
  url.searchParams.set('nonce', input.nonce);
  url.searchParams.set('code_challenge', input.codeChallenge);
  url.searchParams.set('code_challenge_method', 'S256');
  return url.toString();
}

export async function exchangeAuthorizationCode(
  config: AuthProviderConfig,
  discovery: OidcDiscoveryDocument,
  input: {
    code: string;
    codeVerifier: string;
    redirectUri: string;
  }
): Promise<OidcTokenResponse> {
  const response = await fetch(discovery.token_endpoint, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: config.clientId || '',
      client_secret: config.clientSecret || '',
      code: input.code,
      redirect_uri: input.redirectUri,
      code_verifier: input.codeVerifier
    }).toString()
  });

  if (!response.ok) {
    throw createHttpError(401, 'OIDC token exchange failed');
  }
  return (await response.json()) as OidcTokenResponse;
}

export async function verifyIdToken(
  config: AuthProviderConfig,
  discovery: OidcDiscoveryDocument,
  idToken: string,
  expectedNonce: string
): Promise<OidcVerifiedIdentity> {
  const { payload } = await jose.jwtVerify(
    idToken,
    jose.createRemoteJWKSet(new URL(discovery.jwks_uri)),
    {
      issuer: config.issuer || undefined,
      audience: config.clientId || undefined
    }
  );

  if (payload.nonce !== expectedNonce) {
    throw createHttpError(401, 'OIDC nonce validation failed');
  }

  const email = normalizeEmail(payload.email);
  const emailVerified =
    payload.email_verified === true || payload.email_verified === 'true';
  if (!payload.sub || !email || !emailVerified) {
    throw createHttpError(401, 'OIDC provider did not return a verified email');
  }

  return {
    displayName: typeof payload.name === 'string' ? payload.name : null,
    email,
    issuer: String(payload.iss || config.issuer),
    subject: String(payload.sub)
  };
}

function normalizeEmail(value: unknown): string | null {
  const normalized = String(value || '').trim().toLowerCase();
  return normalized || null;
}

function createHttpError(status: number, message: string): HttpError {
  const error = new Error(message) as HttpError;
  error.status = status;
  return error;
}
