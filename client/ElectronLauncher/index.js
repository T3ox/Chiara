const { app, BrowserWindow, ipcMain, session } = require('electron');
const { createWindow, hasOpenWindows } = require('./windowManager');
const { downloadUpdate } = require('./updateService');

const BFF_BASE_URL = process.env.BFF_BASE_URL || 'http://localhost:3000';

app.whenReady().then(() => {
  createWindow();

  ipcMain.on('download-update', (event, urlToDownload) => {
    downloadUpdate(urlToDownload, event, app);
  });

  ipcMain.handle('auth-login-password', async (_event, credentials) => {
    return bffRequest('/api/auth/login/password', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(credentials || {})
    });
  });

  ipcMain.handle('auth-session', async () => {
    return bffRequest('/api/auth/session');
  });

  ipcMain.handle('auth-login-google', async (_event, options) => {
    return startGoogleLogin(options || {});
  });

  ipcMain.handle('auth-profile', async () => {
    return bffRequest('/api/user/profile');
  });

  ipcMain.handle('auth-logout', async () => {
    return bffRequest('/api/auth/logout', {
      method: 'POST'
    });
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (!hasOpenWindows()) {
    createWindow();
  }
});

async function bffRequest(path, options = {}) {
  const response = await session.defaultSession.fetch(`${BFF_BASE_URL}${path}`, {
    ...options,
    headers: {
      accept: 'application/json',
      ...(options.headers || {})
    }
  });

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      payload && typeof payload === 'object' && typeof payload.message === 'string'
        ? payload.message
        : `Richiesta non riuscita (${response.status})`;
    throw new Error(message);
  }

  return payload;
}

async function startGoogleLogin(options) {
  const productCode = typeof options.productCode === 'string'
    ? options.productCode.trim()
    : '';
  const authUrl = new URL(`${BFF_BASE_URL}/api/auth/providers/google/start`);
  authUrl.searchParams.set('redirect', '/oauth-complete');
  if (productCode) {
    authUrl.searchParams.set('productCode', productCode);
  }

  await openOAuthWindow(authUrl.toString());
  return bffRequest('/api/auth/session');
}

function openOAuthWindow(authUrl) {
  return new Promise((resolve, reject) => {
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
    const fail = (error) => {
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
    const inspectUrl = (url) => {
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
