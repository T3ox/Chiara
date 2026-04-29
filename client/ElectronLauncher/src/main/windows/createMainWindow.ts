import { BrowserWindow } from 'electron';
import path from 'path';

export function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 550,
    webPreferences: {
      preload: path.join(__dirname, '..', '..', 'preload', 'index.js'),
      contextIsolation: true
    }
  });

  const rendererUrl = process.env.ELECTRON_RENDERER_URL;
  if (rendererUrl) {
    win.loadURL(rendererUrl);
  } else {
    win.loadFile(path.join(__dirname, '..', '..', '..', 'dist', 'index.html'));
  }
  win.setMenuBarVisibility(false);

  return win;
}

export function hasOpenWindows() {
  return BrowserWindow.getAllWindows().length > 0;
}
