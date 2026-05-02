import { app, dialog, ipcMain, shell } from 'electron';
import { bffRequest, loginWithGoogle, loginWithMicrosoft } from '../services/AuthService';
import { buildFolderSelection } from '../services/FolderScannerService';
import { runFolderOrganizer, undoLastOrganizerSession } from '../services/OrganizerService';
import { downloadUpdate } from '../services/update/UpdateService';

export function registerIpcHandlers() {
  ipcMain.on('download-update', (event, urlToDownload: string) => {
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
    return loginWithGoogle(options || {});
  });

  ipcMain.handle('auth-login-microsoft', async (_event, options) => {
    return loginWithMicrosoft(options || {});
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

  ipcMain.handle('undo-folder-organizer', async (event, folderPath) => {
    return undoLastOrganizerSession(event, folderPath);
  });

  ipcMain.handle('open-external', async (_event, url: string) => {
    await shell.openExternal(url);
    return { success: true };
  });
}
