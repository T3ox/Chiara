import { app } from 'electron';
import { registerIpcHandlers } from './ipc/registerHandlers';
import { createWindow, hasOpenWindows } from './windows/createMainWindow';

app.whenReady().then(() => {
  createWindow();
  registerIpcHandlers();
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
