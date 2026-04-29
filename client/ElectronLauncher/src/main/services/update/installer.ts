import { app, shell, type IpcMainEvent } from 'electron';
import { exec, execSync } from 'child_process';

type SendStatus = (event: IpcMainEvent, status: string, message: string) => void;

export function installPackage(newAppPath: string, event: IpcMainEvent, sendStatus?: SendStatus) {
  const currentExe = process.execPath;
  const isMacApp = process.platform === 'darwin' && currentExe.includes('.app/Contents/MacOS/');

  if (isMacApp && app.isPackaged) {
    const currentAppPath = currentExe.substring(0, currentExe.indexOf('.app') + 4);
    try {
      execSync(`rm -rf "${currentAppPath}" && mv "${newAppPath}" "${currentAppPath}"`);
      app.quit();
      app.relaunch();
      return;
    } catch (copyErr) {
      const message = copyErr instanceof Error ? copyErr.message : String(copyErr);
      console.error(`[Update] Errore di permessi/copia: ${message}`, copyErr);
      sendStatus?.(event, 'error', "Impossibile sovrascrivere l'app (permessi negati).");
      shell.openPath(newAppPath).then(() => setTimeout(() => app.quit(), 1000));
      return;
    }
  }

  if (process.platform === 'win32' && newAppPath.endsWith('.exe')) {
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
