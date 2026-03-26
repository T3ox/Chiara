const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  downloadUpdate: (url) => ipcRenderer.send('download-update', url),
  onDownloadStatus: (callback) => ipcRenderer.on('download-status', (_event, status, message) => callback(status, message)),
  onDownloadProgress: (callback) => ipcRenderer.on('download-progress', (_event, percentage) => callback(percentage)),
  getPlatform: () => process.platform,
  openExternal: (url) => ipcRenderer.send('open-external', url)
});
