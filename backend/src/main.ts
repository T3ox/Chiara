import 'dotenv/config';
import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createAuthRouter, getProfile } from './auth/routes';
import { initStateStore } from './auth/state-store';
import type { HttpError, RequestWithCookies } from './auth/types';

const app = express();
const PORT = Number(process.env.PORT || 3000);
const BFF_CORS_ORIGIN = parseCorsOrigin(process.env.BFF_CORS_ORIGIN);

app.use(cors({
  origin: BFF_CORS_ORIGIN,
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'chiara-bff'
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

app.use('/api/auth', createAuthRouter());

app.get('/api/version', (req, res) => {
  const platform = String(req.query.platform || '');
  const updates: Record<string, string> = {
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
    res.json(await getProfile(req as RequestWithCookies, res));
  } catch (error) {
    const httpError = error as HttpError;
    const status = httpError.status || 500;
    res.status(status).json({
      error: status >= 500 ? 'internal_error' : 'request_error',
      service: 'chiara-bff',
      message: httpError.message || 'Unable to resolve user profile'
    });
  }
});

app.post('/api/version', (req, res) => {
  const { version, downloadUrl } = req.body as {
    version?: unknown;
    downloadUrl?: unknown;
  };

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

app.use((error: HttpError, req: Request, res: Response, _next: NextFunction) => {
  const status = error.status || 500;
  res.status(status).json({
    error: status >= 500 ? 'internal_error' : 'request_error',
    service: 'chiara-bff',
    path: req.originalUrl,
    message: error.message || 'Request failed'
  });
});

initStateStore()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[chiara-bff] listening on http://localhost:${PORT}`);
      console.log('[chiara-bff] auth is handled inside Chiara/backend');
    });
  })
  .catch((error: Error) => {
    console.error(`[chiara-bff] failed to start: ${error.message}`);
    process.exit(1);
  });

function parseCorsOrigin(value: string | undefined): boolean | string[] {
  if (!value || value === 'true') {
    return true;
  }

  return value.split(',').map((origin) => origin.trim()).filter(Boolean);
}
