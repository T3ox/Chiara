const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    height: 450,
    width: 800,
  })

  win.loadFile('index.html');
  win.setMenuBarVisibility(false);

}
app.whenReady().then(() => {
  createWindow();
}) ;