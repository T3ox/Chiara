const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  downloadUpdate: (url) => ipcRenderer.send('download-update', url),
  onDownloadStatus: (callback) => ipcRenderer.on('download-status', (_event, status, message) => callback(status, message)),
  onDownloadProgress: (callback) => ipcRenderer.on('download-progress', (_event, percentage) => callback(percentage)),
  getPlatform: () => process.platform,
  loginWithPassword: (credentials) => ipcRenderer.invoke('auth-login-password', credentials),
  loginWithGoogle: (options) => ipcRenderer.invoke('auth-login-google', options),
  getAuthSession: () => ipcRenderer.invoke('auth-session'),
  getAuthProfile: () => ipcRenderer.invoke('auth-profile'),
  logout: () => ipcRenderer.invoke('auth-logout')
});
