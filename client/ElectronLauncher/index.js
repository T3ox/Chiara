const { app, BrowserWindow, dialog, ipcMain, session, shell } = require('electron');
const { spawn } = require('child_process');
const fsSync = require('fs');
const fs = require('fs/promises');
const path = require('path');
const { createWindow, hasOpenWindows } = require('./windowManager');
const { downloadUpdate } = require('./updateService');

const BFF_BASE_URL = process.env.BFF_BASE_URL || 'http://localhost:3000';
const OLLAMA_ORGANIZER_DIR = path.resolve(__dirname, '../../ollama-folder-organizer');
const ORGANIZER_SCRIPT = path.join(OLLAMA_ORGANIZER_DIR, 'main.py');
const PYTHON_BIN = process.env.PYTHON_BIN || (process.platform === 'win32' ? 'python' : 'python3');

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

  ipcMain.handle('select-folder', async () => {
    const result = await dialog.showOpenDialog({
      title: 'Seleziona cartella da organizzare',
      properties: ['openDirectory']
    });

    if (result.canceled || result.filePaths.length === 0) {
      return null;
    }

    return buildFolderSelection(result.filePaths[0]);
  });

  ipcMain.handle('run-folder-organizer', async (event, folderPath) => {
    return runFolderOrganizer(event, folderPath);
  });

  ipcMain.handle('open-external', async (_event, url) => {
    await shell.openExternal(url);
    return { success: true };
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

async function buildFolderSelection(folderPath) {
  const absolutePath = path.resolve(folderPath);
  const stats = await fs.stat(absolutePath);
  if (!stats.isDirectory()) {
    throw new Error('Il percorso selezionato non è una cartella.');
  }

  const summary = await scanFolder(absolutePath);
  return {
    folderPath: absolutePath,
    folderName: path.basename(absolutePath),
    fileCount: summary.fileCount,
    totalSizeBytes: summary.totalSizeBytes
  };
}

async function scanFolder(folderPath) {
  let fileCount = 0;
  let totalSizeBytes = 0;
  const entries = await fs.readdir(folderPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(folderPath, entry.name);
    if (entry.isDirectory()) {
      const nested = await scanFolder(entryPath);
      fileCount += nested.fileCount;
      totalSizeBytes += nested.totalSizeBytes;
    } else if (entry.isFile()) {
      const stats = await fs.stat(entryPath);
      fileCount += 1;
      totalSizeBytes += stats.size;
    }
  }

  return { fileCount, totalSizeBytes };
}

function runFolderOrganizer(event, folderPath) {
  return new Promise(async (resolve, reject) => {
    if (!folderPath || typeof folderPath !== 'string') {
      reject(new Error('Seleziona una cartella prima di avviare lo script.'));
      return;
    }

    const absolutePath = path.resolve(folderPath);
    try {
      const stats = await fs.stat(absolutePath);
      if (!stats.isDirectory()) {
        reject(new Error('Il percorso selezionato non è una cartella.'));
        return;
      }
    } catch {
      reject(new Error('Cartella selezionata non trovata.'));
      return;
    }

    const pythonBin = resolvePythonBin();
    const child = spawn(pythonBin, [ORGANIZER_SCRIPT, absolutePath], {
      cwd: OLLAMA_ORGANIZER_DIR,
      env: process.env,
      shell: false
    });

    const output = [];
    const sendOutput = (type, data) => {
      const text = data.toString();
      output.push(text);
      event.sender.send('folder-organizer-output', type, text);
    };

    child.stdout.on('data', (data) => sendOutput('stdout', data));
    child.stderr.on('data', (data) => sendOutput('stderr', data));
    child.on('error', (error) => reject(error));
    child.on('close', (code) => {
      if (code === 0) {
        resolve({ success: true, output: output.join('') });
        return;
      }

      const details = output.join('').trim();
      const message = details
        ? `Ollama Folder Organizer terminato con codice ${code}.\n${details}`
        : `Ollama Folder Organizer terminato con codice ${code}.`;
      reject(new Error(message));
    });
  });
}

function resolvePythonBin() {
  if (process.env.PYTHON_BIN) {
    return process.env.PYTHON_BIN;
  }

  const venvPython = process.platform === 'win32'
    ? path.join(OLLAMA_ORGANIZER_DIR, '.venv', 'Scripts', 'python.exe')
    : path.join(OLLAMA_ORGANIZER_DIR, '.venv', 'bin', 'python');

  return fsSync.existsSync(venvPython) ? venvPython : PYTHON_BIN;
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
