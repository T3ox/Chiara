const { BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 550,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false
    }
  });

  win.loadFile('index.html');
  win.setMenuBarVisibility(false);

  return win;
}

function hasOpenWindows() {
  return BrowserWindow.getAllWindows().length > 0;
}

module.exports = {
  createWindow,
  hasOpenWindows
};