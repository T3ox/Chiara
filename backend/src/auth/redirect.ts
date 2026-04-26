export const AUTH_ERROR_QUERY_PARAM = 'authError';
export const AUTH_ERROR_SIGNIN_FAILED = 'signin_failed';
export const AUTH_REDIRECT_QUERY_PARAM = 'redirect';

export function getSafeAuthRedirectTarget(
  rawTarget: unknown,
  fallback = '/'
): string {
  if (typeof rawTarget !== 'string' || rawTarget.trim() === '') {
    return fallback;
  }

  const target = rawTarget.trim();
  if (!target.startsWith('/') || target.startsWith('//')) {
    return fallback;
  }

  return target;
}

export function buildAuthErrorRedirect(target: string): string {
  const redirectTarget = getSafeAuthRedirectTarget(target);
  const searchParams = new URLSearchParams();

  if (redirectTarget !== '/') {
    searchParams.set(AUTH_REDIRECT_QUERY_PARAM, redirectTarget);
  }

  searchParams.set(AUTH_ERROR_QUERY_PARAM, AUTH_ERROR_SIGNIN_FAILED);
  return `/?${searchParams.toString()}`;
}
