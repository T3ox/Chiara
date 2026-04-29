import { BrowserWindow, session } from 'electron';

const BFF_BASE_URL = process.env.BFF_BASE_URL || 'http://localhost:3000';

type RequestOptions = Parameters<typeof session.defaultSession.fetch>[1];

export async function bffRequest(routePath: string, options: RequestOptions = {}) {
  const response = await session.defaultSession.fetch(`${BFF_BASE_URL}${routePath}`, {
    ...options,
    headers: {
      accept: 'application/json',
      ...(options.headers || {})
    }
  });

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      payload && typeof payload === 'object' && 'message' in payload && typeof payload.message === 'string'
        ? payload.message
        : `Richiesta non riuscita (${response.status})`;
    throw new Error(message);
  }

  return payload;
}

export async function loginWithGoogle(options: { productCode?: string }) {
  const productCode = typeof options.productCode === 'string' ? options.productCode.trim() : '';
  const authUrl = new URL(`${BFF_BASE_URL}/api/auth/providers/google/start`);
  authUrl.searchParams.set('redirect', '/oauth-complete');
  if (productCode) {
    authUrl.searchParams.set('productCode', productCode);
  }

  await openOAuthWindow(authUrl.toString());
  return bffRequest('/api/auth/session');
}

function openOAuthWindow(authUrl: string) {
  return new Promise<void>((resolve, reject) => {
    const oauthWindow = new BrowserWindow({
      width: 520,
      height: 720,
      title: 'Login Google',
      modal: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true
      }
    });

    let completed = false;
    const completeUrl = `${BFF_BASE_URL}/oauth-complete`;

    const fail = (error: Error) => {
      if (completed) return;
      completed = true;
      if (!oauthWindow.isDestroyed()) {
        oauthWindow.close();
      }
      reject(error);
    };

    const finish = () => {
      if (completed) return;
      completed = true;
      if (!oauthWindow.isDestroyed()) {
        oauthWindow.close();
      }
      resolve();
    };

    const inspectUrl = (url: string) => {
      if (url.startsWith(completeUrl)) {
        finish();
      }
    };

    oauthWindow.webContents.on('will-redirect', (_event, url) => inspectUrl(url));
    oauthWindow.webContents.on('will-navigate', (_event, url) => inspectUrl(url));
    oauthWindow.webContents.on('did-fail-load', (_event, errorCode, errorDescription) => {
      if (completed || errorCode === -3) return;
      fail(new Error(errorDescription || 'Login Google non riuscito.'));
    });
    oauthWindow.on('closed', () => {
      if (!completed) {
        reject(new Error('Login Google annullato.'));
      }
    });

    oauthWindow.loadURL(authUrl).catch(fail);
  });
}
