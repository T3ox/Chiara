require('dotenv/config');

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const AUTH_SERVICE_URL = normalizeBaseUrl(
  process.env.AUTH_SERVICE_URL || 'http://localhost:3100'
);
const BFF_CORS_ORIGIN = parseCorsOrigin(process.env.BFF_CORS_ORIGIN);

const HOP_BY_HOP_HEADERS = new Set([
  'connection',
  'content-length',
  'host',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade'
]);

app.use(cors({
  origin: BFF_CORS_ORIGIN,
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'chiara-bff',
    authServiceUrl: AUTH_SERVICE_URL
  });
});

app.get('/oauth-complete', (_req, res) => {
  res.type('html').send(`<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <title>Login completato</title>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      font-family: system-ui, -apple-system, Segoe UI, sans-serif;
      background: #101820;
      color: #f5f7fb;
    }
  </style>
</head>
<body>
  <main>Login completato. Puoi tornare al launcher.</main>
</body>
</html>`);
});

app.all('/api/auth', proxyAuthRequest);
app.all('/api/auth/*', proxyAuthRequest);

app.get('/api/version', (req, res) => {
  const platform = req.query.platform;
  const updates = {
    win32: 'https://github.com/T3ox/FolderOrganizer/releases/download/v0.0.1/FolderOrganizer.Launcher-0.0.1-win.zip',
    darwin: 'https://github.com/T3ox/FolderOrganizer/releases/download/v0.0.1/FolderOrganizer.Launcher-0.0.1-mac.zip'
  };

  res.json({
    version: '0.1.0',
    downloadUrl: updates[platform] || updates.win32,
    checksum: '',
    releaseNotes: '- Supporto multi-piattaforma per aggiornamenti automatici.\n- Installazione silenziosa su Windows.\n- Miglioramenti alla stabilita dell\'estrazione.'
  });
});

app.get('/api/user/profile', async (req, res) => {
  try {
    const sessionPayload = await callAuthService('/auth/session', {
      method: 'GET',
      headers: buildForwardHeaders(req)
    });

    res.json(buildProfileFromSession(sessionPayload));
  } catch (error) {
    const status = error.status || 502;
    res.status(status).json({
      error: status === 502
        ? 'auth_service_unavailable'
        : status >= 500
          ? 'internal_error'
          : 'request_error',
      service: 'chiara-bff',
      message: error.message || 'Unable to resolve user profile'
    });
  }
});

app.post('/api/version', (req, res) => {
  const { version, downloadUrl } = req.body;

  if (version && downloadUrl) {
    res.status(200).json({
      message: 'Versione aggiornata con successo',
      current: { version, downloadUrl }
    });
    return;
  }

  res.status(400).json({
    error: "I campi 'version' e 'downloadUrl' sono obbligatori."
  });
});

app.listen(PORT, () => {
  console.log(`[chiara-bff] listening on http://localhost:${PORT}`);
  console.log(`[chiara-bff] forwarding auth requests to ${AUTH_SERVICE_URL}`);
});

async function proxyAuthRequest(req, res) {
  try {
    const upstreamResponse = await fetch(buildAuthProxyUrl(req), {
      method: req.method,
      headers: buildForwardHeaders(req),
      body: buildRequestBody(req),
      redirect: 'manual'
    });

    copyResponseHeaders(upstreamResponse, res);
    res.status(upstreamResponse.status);

    if (upstreamResponse.status === 204 || upstreamResponse.status === 304) {
      res.end();
      return;
    }

    const body = Buffer.from(await upstreamResponse.arrayBuffer());
    res.send(body);
  } catch (error) {
    res.status(502).json({
      error: 'auth_service_unavailable',
      service: 'chiara-bff',
      message: error.message || 'Unable to reach auth service'
    });
  }
}

async function callAuthService(path, options) {
  const response = await fetch(`${AUTH_SERVICE_URL}${path}`, {
    ...options,
    redirect: 'manual'
  });
  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const error = new Error(resolveErrorMessage(payload, response.status));
    error.status = response.status;
    throw error;
  }

  return payload;
}

function buildAuthProxyUrl(req) {
  const authPath = req.originalUrl.replace(/^\/api\/auth/, '/auth');
  return `${AUTH_SERVICE_URL}${authPath}`;
}

function buildForwardHeaders(req) {
  const headers = new Headers();

  for (const [name, value] of Object.entries(req.headers)) {
    const lowerName = name.toLowerCase();
    if (HOP_BY_HOP_HEADERS.has(lowerName) || value === undefined) {
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else {
      headers.set(name, value);
    }
  }

  headers.set('x-forwarded-host', req.get('host') || '');
  headers.set('x-forwarded-proto', req.protocol);
  headers.set('x-forwarded-for', req.ip || '');

  return headers;
}

function buildRequestBody(req) {
  if (req.method === 'GET' || req.method === 'HEAD') {
    return undefined;
  }

  const contentType = req.get('content-type') || '';
  if (contentType.includes('application/x-www-form-urlencoded')) {
    return new URLSearchParams(req.body).toString();
  }

  if (contentType.includes('application/json') || typeof req.body === 'object') {
    return JSON.stringify(req.body || {});
  }

  return undefined;
}

function copyResponseHeaders(upstreamResponse, res) {
  upstreamResponse.headers.forEach((value, name) => {
    const lowerName = name.toLowerCase();
    if (!HOP_BY_HOP_HEADERS.has(lowerName) && lowerName !== 'set-cookie') {
      res.setHeader(name, value);
    }
  });

  const setCookie = typeof upstreamResponse.headers.getSetCookie === 'function'
    ? upstreamResponse.headers.getSetCookie()
    : [];
  if (setCookie.length > 0) {
    res.setHeader('set-cookie', setCookie.map(rewriteAuthCookiePath));
    return;
  }

  const fallbackSetCookie = upstreamResponse.headers.get('set-cookie');
  if (fallbackSetCookie) {
    res.setHeader('set-cookie', rewriteAuthCookiePath(fallbackSetCookie));
  }
}

function rewriteAuthCookiePath(cookieHeader) {
  return cookieHeader.replace(/Path=\/auth\/oidc\//i, 'Path=/api/auth/oidc/');
}

function buildProfileFromSession(sessionPayload) {
  const user = sessionPayload && sessionPayload.user ? sessionPayload.user : {};
  const memberships = Array.isArray(user.memberships) ? user.memberships : [];
  const membership = memberships[0] || {};

  return {
    id: user.sub || user.id || user.identityId || null,
    name: user.email || user.sub || user.id || 'Utente autenticato',
    email: user.email || null,
    package: membership.productCode || '—',
    role: membership.role || null,
    gbUsed: 0,
    gbTotal: 0,
    authProvider: user.authProvider || null,
    authMethod: user.authMethod || null,
    memberships
  };
}

function resolveErrorMessage(payload, status) {
  if (payload && typeof payload === 'object' && typeof payload.message === 'string') {
    return payload.message;
  }

  if (typeof payload === 'string' && payload.trim()) {
    return payload;
  }

  return `Request failed with status ${status}`;
}

function normalizeBaseUrl(value) {
  return value.replace(/\/+$/, '');
}

function parseCorsOrigin(value) {
  if (!value || value === 'true') {
    return true;
  }

  return value.split(',').map((origin) => origin.trim()).filter(Boolean);
}
