const { app, ipcMain } = require('electron');
const { createWindow, hasOpenWindows } = require('./windowManager');
const { downloadUpdate } = require('./updateService');

app.whenReady().then(() => {
  createWindow();

  ipcMain.on('download-update', (event, urlToDownload) => {
    downloadUpdate(urlToDownload, event, app);
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