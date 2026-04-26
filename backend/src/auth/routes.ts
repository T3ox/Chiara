import express from 'express';
import type { NextFunction, Request, RequestHandler, Response } from 'express';
import {
  completeOidc,
  getAdminProvider,
  getProfile,
  getSession,
  listAdminProviders,
  listProviders,
  logout,
  startOidc,
  updateAdminProvider
} from './auth-service';
import type { RequestWithCookies } from './types';

export function createAuthRouter(): express.Router {
  const router = express.Router();

  router.get('/providers', (_req, res) => {
    res.json(listProviders());
  });

  router.get('/config', (_req, res) => {
    res.json({
      passwordLoginEnabled: false
    });
  });

  router.get('/csrf', (_req, res) => {
    res.json({
      csrfToken: null
    });
  });

  router.post('/login/password', (_req, res) => {
    res.status(404).json({
      error: 'request_error',
      service: 'chiara-bff',
      message: 'Password login is disabled. Use Google login.'
    });
  });

  router.get('/session', asyncHandler(async (req, res) => {
    res.json(await getSession(req as RequestWithCookies, res));
  }));

  router.get('/me', asyncHandler(async (req, res) => {
    res.json(await getSession(req as RequestWithCookies, res));
  }));

  router.post('/logout', (req, res) => {
    res.json(logout(req, res));
  });

  router.get('/providers/:provider/start', asyncHandler(async (req, res) => {
    await startOidc(req, res, resolveParam(req.params.provider));
  }));

  router.get('/providers/:provider/callback', asyncHandler(async (req, res) => {
    await completeOidc(req as RequestWithCookies, res, resolveParam(req.params.provider));
  }));

  router.get('/oidc/:provider/start', asyncHandler(async (req, res) => {
    await startOidc(req, res, resolveParam(req.params.provider));
  }));

  router.get('/oidc/:provider/callback', asyncHandler(async (req, res) => {
    await completeOidc(req as RequestWithCookies, res, resolveParam(req.params.provider));
  }));

  router.get('/admin/providers', requireInternalToken, (_req, res) => {
    res.json(listAdminProviders());
  });

  router.get('/admin/providers/:provider', requireInternalToken, (req, res) => {
    res.json(getAdminProvider(resolveParam(req.params.provider), req));
  });

  router.put('/admin/providers/:provider', requireInternalToken, asyncHandler(async (req, res) => {
    res.json(await updateAdminProvider(resolveParam(req.params.provider), req.body));
  }));

  return router;
}

function resolveParam(value: string | string[]): string {
  return Array.isArray(value) ? value[0] || '' : value;
}

function requireInternalToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const expected =
    process.env.PLATFORM_INTERNAL_TOKEN || 'platform-local-stack-internal-token';
  if (req.get('x-platform-internal-token') !== expected) {
    res.status(401).json({
      error: 'unauthorized',
      service: 'chiara-bff',
      message: 'Missing or invalid internal token'
    });
    return;
  }
  next();
}

function asyncHandler(
  handler: (req: Request, res: Response, next: NextFunction) => Promise<void>
): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

export { getProfile };
