import type { Request } from 'express';

export type HttpError = Error & {
  status?: number;
};

export type RequestWithCookies = Request & {
  cookies?: Record<string, string>;
};

export type AuthProviderConfig = {
  id: string;
  type: 'oidc';
  label: string;
  enabled: boolean;
  clientId: string | null;
  clientSecret: string | null;
  issuer: string | null;
  discoveryUrl: string | null;
  scopes: string[];
};

export type AuthUserRecord = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthIdentityRecord = {
  id: string;
  userId: string;
  provider: string;
  subject: string;
  issuer: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthMembershipRecord = {
  id: string;
  userId: string;
  productCode: string;
  subjectId: string;
  role: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AuthState = {
  version: number;
  providerConfigs: Record<string, AuthProviderConfig>;
  users: AuthUserRecord[];
  authIdentities: AuthIdentityRecord[];
  memberships: AuthMembershipRecord[];
};

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  authMethod: 'oidc';
  authProvider: string | null;
  memberships: AuthMembershipRecord[];
};

export type SessionPayload = {
  sub?: string;
  email?: string;
  name?: string;
  memberships?: unknown;
  authMethod?: unknown;
  authProvider?: unknown;
};

export type OidcFlowPayload = {
  type?: string;
  codeVerifier?: string;
  nonce?: string;
  providerId?: string;
  productCode?: string;
  redirectTo?: string;
  redirectUri?: string;
  state?: string;
};

export type OidcDiscoveryDocument = {
  authorization_endpoint: string;
  issuer: string;
  jwks_uri: string;
  token_endpoint: string;
};

export type OidcVerifiedIdentity = {
  displayName: string | null;
  email: string;
  issuer: string;
  subject: string;
};
