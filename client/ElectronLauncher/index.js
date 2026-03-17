const { app, ipcMain, BrowserWindow } = require('electron');
const { createWindow } = require('./windowManager');
const { downloadUpdate } = require('./updateService');

app.whenReady().then(() => {
  createWindow();

  ipcMain.on('download-update', (event, urlToDownload) => {
    downloadUpdate(urlToDownload, event);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
