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

type OAuthProvider = {
  id: 'google' | 'microsoft';
  label: string;
};

const OAUTH_PROVIDERS: Record<OAuthProvider['id'], OAuthProvider> = {
  google: {
    id: 'google',
    label: 'Google'
  },
  microsoft: {
    id: 'microsoft',
    label: 'Microsoft'
  }
};

type OAuthLoginOptions = { productCode?: string };

export async function loginWithGoogle(options: OAuthLoginOptions) {
  return loginWithOAuthProvider('google', options);
}

export async function loginWithMicrosoft(options: OAuthLoginOptions) {
  return loginWithOAuthProvider('microsoft', options);
}

async function loginWithOAuthProvider(providerId: OAuthProvider['id'], options: OAuthLoginOptions) {
  const provider = OAUTH_PROVIDERS[providerId];
  const productCode = typeof options.productCode === 'string' ? options.productCode.trim() : '';
  const authUrl = new URL(`${BFF_BASE_URL}/api/auth/providers/${provider.id}/start`);
  authUrl.searchParams.set('redirect', '/oauth-complete');
  if (productCode) {
    authUrl.searchParams.set('productCode', productCode);
  }

  await openOAuthWindow(authUrl.toString(), provider.label);
  return bffRequest('/api/auth/session');
}

function openOAuthWindow(authUrl: string, providerLabel: string) {
  return new Promise<void>((resolve, reject) => {
    const oauthWindow = new BrowserWindow({
      width: 520,
      height: 720,
      title: `Login ${providerLabel}`,
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
      fail(new Error(errorDescription || `Login ${providerLabel} non riuscito.`));
    });
    oauthWindow.on('closed', () => {
      if (!completed) {
        reject(new Error(`Login ${providerLabel} annullato.`));
      }
    });

    oauthWindow.loadURL(authUrl).catch(fail);
  });
}
