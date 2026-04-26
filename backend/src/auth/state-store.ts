import { Pool } from 'pg';
import type { AuthProviderConfig, AuthState } from './types';

export const AUTH_STATE_TABLE =
  process.env.AUTH_STATE_TABLE || 'chiara_auth_state';

let pool: Pool | null = null;
let state: AuthState | null = null;

function requireDatabaseUrl(): string {
  const databaseUrl = (process.env.AUTH_DATABASE_URL || '').trim();
  if (!databaseUrl) {
    throw new Error('AUTH_DATABASE_URL is required for Chiara backend auth');
  }
  return databaseUrl;
}

function createGoogleProviderConfig(): AuthProviderConfig {
  return {
    id: 'google',
    type: 'oidc',
    label: 'Google',
    enabled: Boolean(
      process.env.AUTH_GOOGLE_CLIENT_ID || process.env.AUTH_OIDC_CLIENT_ID
    ),
    clientId:
      process.env.AUTH_GOOGLE_CLIENT_ID ||
      process.env.AUTH_OIDC_CLIENT_ID ||
      null,
    clientSecret:
      process.env.AUTH_GOOGLE_CLIENT_SECRET ||
      process.env.AUTH_OIDC_CLIENT_SECRET ||
      null,
    issuer:
      process.env.AUTH_GOOGLE_ISSUER_URL ||
      process.env.AUTH_OIDC_ISSUER_URL ||
      'https://accounts.google.com',
    discoveryUrl:
      process.env.AUTH_GOOGLE_DISCOVERY_URL ||
      process.env.AUTH_OIDC_DISCOVERY_URL ||
      'https://accounts.google.com/.well-known/openid-configuration',
    scopes: ['openid', 'profile', 'email']
  };
}

function createDefaultState(): AuthState {
  return {
    version: 1,
    providerConfigs: {
      google: createGoogleProviderConfig()
    },
    users: [],
    authIdentities: [],
    memberships: []
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function normalizeState(payload: unknown): AuthState {
  const defaults = createDefaultState();
  const parsed = isRecord(payload) ? payload : {};
  const providerConfigs = isRecord(parsed.providerConfigs)
    ? parsed.providerConfigs
    : {};

  return {
    ...defaults,
    ...parsed,
    providerConfigs: {
      ...defaults.providerConfigs,
      ...(providerConfigs as Record<string, AuthProviderConfig>)
    },
    users: Array.isArray(parsed.users) ? parsed.users : [],
    authIdentities: Array.isArray(parsed.authIdentities)
      ? parsed.authIdentities
      : [],
    memberships: Array.isArray(parsed.memberships) ? parsed.memberships : []
  } as AuthState;
}

export async function initStateStore(): Promise<void> {
  pool = new Pool({ connectionString: requireDatabaseUrl() });
  await pool.query(`
    CREATE TABLE IF NOT EXISTS ${AUTH_STATE_TABLE} (
      id INTEGER PRIMARY KEY,
      payload JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  const result = await pool.query<{ payload: unknown }>(
    `SELECT payload FROM ${AUTH_STATE_TABLE} WHERE id = 1`
  );
  if (result.rows[0]?.payload) {
    state = normalizeState(result.rows[0].payload);
    return;
  }

  state = createDefaultState();
  await persistState();
}

export function getState(): AuthState {
  if (!state) {
    throw new Error('Auth state store is not initialized');
  }
  return state;
}

export async function persistState(): Promise<void> {
  if (!pool || !state) {
    throw new Error('Auth state store is not initialized');
  }

  await pool.query(
    `INSERT INTO ${AUTH_STATE_TABLE} (id, payload, updated_at) VALUES (1, $1::jsonb, NOW())
     ON CONFLICT (id) DO UPDATE SET payload = EXCLUDED.payload, updated_at = EXCLUDED.updated_at`,
    [JSON.stringify(state)]
  );
}
