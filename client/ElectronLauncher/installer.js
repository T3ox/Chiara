const { app, shell } = require('electron');

function installPackage(newAppPath, event, sendStatus) {
  const currentExe = process.execPath;
  const isMacApp = process.platform === 'darwin' && currentExe.includes('.app/Contents/MacOS/');

  if (isMacApp && app.isPackaged) {
    const currentAppPath = currentExe.substring(0, currentExe.indexOf('.app') + 4);
    try {
      const { execSync } = require('child_process');
      execSync(`rm -rf "${currentAppPath}" && mv "${newAppPath}" "${currentAppPath}"`);
      app.quit();
      app.relaunch();
      return;
    } catch (copyErr) {
      console.error(`[Update] Errore di permessi/copia: ${copyErr.message}`, copyErr);
      if (sendStatus) sendStatus(event, 'error', "Impossibile sovrascrivere l'app (permessi negati).");
      shell.openPath(newAppPath).then(() => setTimeout(() => app.quit(), 1000));
      return;
    }
  }

  if (process.platform === 'win32' && newAppPath.endsWith('.exe')) {
    const { exec } = require('child_process');
    exec(`"${newAppPath}" /S`, (err) => {
      if (err) {
        console.error(`[Update] Errore avvio installer silenzioso: ${err.message}`);
        shell.openPath(newAppPath);
      }
      setTimeout(() => app.quit(), 1000);
    });
    return;
  }

  shell.openPath(newAppPath).then(() => setTimeout(() => app.quit(), 1000));
}

module.exports = {
  installPackage,
};