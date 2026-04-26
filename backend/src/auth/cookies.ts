import type { CookieOptions, Response } from 'express';

export const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'session';
export const AUTH_FLOW_COOKIE_NAME =
  process.env.AUTH_FLOW_COOKIE_NAME || 'auth_flow';

const SESSION_COOKIE_MAX_AGE_MS =
  Number(process.env.SESSION_TTL_HOURS || 8) * 60 * 60 * 1000;
const AUTH_FLOW_COOKIE_MAX_AGE_MS = 10 * 60 * 1000;

function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

function sessionCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProduction(),
    path: '/',
    maxAge: SESSION_COOKIE_MAX_AGE_MS
  };
}

function flowCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProduction(),
    path: '/api/auth',
    maxAge: AUTH_FLOW_COOKIE_MAX_AGE_MS
  };
}

function clearCookieOptions(path = '/'): CookieOptions {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProduction(),
    path
  };
}

export function setSessionCookie(res: Response, token: string): void {
  res.cookie(SESSION_COOKIE_NAME, token, sessionCookieOptions());
}

export function clearSessionCookie(res: Response): void {
  res.clearCookie(SESSION_COOKIE_NAME, clearCookieOptions('/'));
}

export function setAuthFlowCookie(res: Response, token: string): void {
  res.cookie(AUTH_FLOW_COOKIE_NAME, token, flowCookieOptions());
}

export function clearAuthFlowCookie(res: Response): void {
  res.clearCookie(AUTH_FLOW_COOKIE_NAME, clearCookieOptions('/api/auth'));
}

export function clearAuthCookies(res: Response): void {
  clearSessionCookie(res);
  clearAuthFlowCookie(res);
}
