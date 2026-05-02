import { contextBridge, ipcRenderer } from 'electron';
import type {
  AuthCredentials,
  AuthSessionPayload,
  DownloadStatus,
  FolderSelection,
  AuthProfile
} from '../types';

contextBridge.exposeInMainWorld('electronAPI', {
  downloadUpdate: (url: string) => ipcRenderer.send('download-update', url),
  onDownloadStatus: (callback: (status: DownloadStatus, message: string) => void) => {
    const listener = (_event: Electron.IpcRendererEvent, status: DownloadStatus, message: string) => callback(status, message);
    ipcRenderer.on('download-status', listener);
    return () => ipcRenderer.removeListener('download-status', listener);
  },
  onDownloadProgress: (callback: (percentage: number) => void) => {
    const listener = (_event: Electron.IpcRendererEvent, percentage: number) => callback(percentage);
    ipcRenderer.on('download-progress', listener);
    return () => ipcRenderer.removeListener('download-progress', listener);
  },
  getPlatform: () => process.platform,
  loginWithPassword: (credentials: AuthCredentials): Promise<AuthSessionPayload> =>
    ipcRenderer.invoke('auth-login-password', credentials),
  loginWithGoogle: (options: { productCode: string }): Promise<AuthSessionPayload> =>
    ipcRenderer.invoke('auth-login-google', options),
  loginWithMicrosoft: (options: { productCode: string }): Promise<AuthSessionPayload> =>
    ipcRenderer.invoke('auth-login-microsoft', options),
  getAuthSession: (): Promise<AuthSessionPayload> => ipcRenderer.invoke('auth-session'),
  getAuthProfile: (): Promise<AuthProfile | null> => ipcRenderer.invoke('auth-profile'),
  logout: (): Promise<unknown> => ipcRenderer.invoke('auth-logout'),
  selectFolder: (): Promise<FolderSelection | null> => ipcRenderer.invoke('select-folder'),
  runFolderOrganizer: (folderPath: string): Promise<{ success: boolean; output?: string }> =>
    ipcRenderer.invoke('run-folder-organizer', folderPath),
  undoFolderOrganizer: (folderPath: string): Promise<{ success: boolean; output?: string }> =>
    ipcRenderer.invoke('undo-folder-organizer', folderPath),
  onFolderOrganizerOutput: (callback: (type: 'stdout' | 'stderr', text: string) => void) => {
    const listener = (_event: Electron.IpcRendererEvent, type: 'stdout' | 'stderr', text: string) => callback(type, text);
    ipcRenderer.on('folder-organizer-output', listener);
    return () => ipcRenderer.removeListener('folder-organizer-output', listener);
  },
  openExternal: (url: string): Promise<{ success: boolean }> => ipcRenderer.invoke('open-external', url)
});
