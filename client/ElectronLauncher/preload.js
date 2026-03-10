const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  downloadUpdate: (url) => ipcRenderer.send('download-update', url),
  onDownloadStatus: (callback) => ipcRenderer.on('download-status', (_event, status, message) => callback(status, message)),
  getPlatform: () => process.platform
});
