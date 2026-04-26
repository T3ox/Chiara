import { randomBytes } from 'node:crypto';
import * as jose from 'jose';
import type { OidcFlowPayload, SessionPayload, SessionUser } from './types';

const encoder = new TextEncoder();
const sessionSecret = encoder.encode(
  process.env.SESSION_JWT_SECRET ||
    process.env.JWT_SECRET ||
    'chiara-local-session-secret-change-me'
);
const flowSecret = encoder.encode(
  process.env.AUTH_FLOW_JWT_SECRET ||
    process.env.JWT_SECRET ||
    'chiara-local-auth-flow-secret-change-me'
);

export function createRandomValue(size = 32): string {
  return randomBytes(size).toString('base64url');
}

export async function signSession(user: SessionUser): Promise<string> {
  return new jose.SignJWT({
    email: user.email,
    name: user.name,
    memberships: user.memberships,
    authMethod: user.authMethod,
    authProvider: user.authProvider
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(`${Number(process.env.SESSION_TTL_HOURS || 8)}h`)
    .sign(sessionSecret);
}

export async function verifySession(token: string): Promise<SessionPayload> {
  const { payload } = await jose.jwtVerify(token, sessionSecret);
  return payload as SessionPayload;
}

export async function signAuthFlow(
  payload: Required<Omit<OidcFlowPayload, 'type'>>
): Promise<string> {
  return new jose.SignJWT({
    ...payload,
    type: 'oidc-flow'
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('10m')
    .sign(flowSecret);
}

export async function verifyAuthFlow(token: string): Promise<OidcFlowPayload> {
  const { payload } = await jose.jwtVerify(token, flowSecret);
  if (payload.type !== 'oidc-flow') {
    throw new Error('Invalid auth flow token');
  }
  return payload as OidcFlowPayload;
}
