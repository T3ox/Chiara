const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const https = require('https');

const createWindow = () => {
  const win = new BrowserWindow({
    height: 450,
    width: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html');
  win.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.on('download-update', (event, urlToDownload) => {
    // 1. Download to a temp directory so it's transparent to the user
    const tempPath = app.getPath('temp');
    const fileName = 'update_' + Date.now() + '.zip';
    const destination = path.join(tempPath, fileName);
    
    event.sender.send('download-status', 'start', 'Inizio download in corso...');

    const fileStream = fs.createWriteStream(destination);
    
    const downloadFile = (url) => {
      https.get(url, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
           console.log(`[Update] Redirected to ${response.headers.location}`);
           return downloadFile(response.headers.location);
        }

        if (response.statusCode !== 200) {
            console.error(`[Update] HTTP Error: ${response.statusCode}`);
            event.sender.send('download-status', 'error', `Errore HTTP durante il download: ${response.statusCode}`);
            return;
        }

        response.pipe(fileStream);

        console.log('[Update] Download started piping to fileStream');

        fileStream.on('finish', () => {
          console.log('[Update] Download fileStream finished');
          fileStream.close(async () => {
            console.log(`[Update] File closed, starting extraction of ${destination}`);
            event.sender.send('download-status', 'extract', 'Download completato! Installazione in corso...');
            
            try {
              const extractPath = path.join(tempPath, 'update_extracted_' + Date.now());
              fs.mkdirSync(extractPath, { recursive: true });
              
              console.log(`[Update] Extracting to ${extractPath} using native unzip`);
              
              // On macOS, native 'unzip' is often safer for .app bundles to preserve symlinks and permissions
              const { execSync } = require('child_process');
              try {
                  execSync(`unzip -q -o "${destination}" -d "${extractPath}"`);
              } catch (unzipErr) {
                  // If native unzip fails, log it
                  console.error(`[Update] Native unzip failed: ${unzipErr.message}`);
                  throw unzipErr;
              }
              
              console.log('[Update] Extraction complete');
              
              // Find the extracted .app or .exe
              const files = fs.readdirSync(extractPath);
              let newAppPath = null;
              
              for (const file of files) {
                if (file.endsWith('.app') || file.endsWith('.exe')) {
                  newAppPath = path.join(extractPath, file);
                  break;
                }
              }

              console.log(`[Update] Found executable: ${newAppPath}`);

              if (newAppPath) {
                event.sender.send('download-status', 'done', 'Sostituzione in corso... Riavvio imminente.');
                
                // === SEAMLESS UPDATE LOGIC ===
                // Check if we are running a packaged Mac app (usually ends in .app/Contents/MacOS/Executable)
                const currentExe = process.execPath;
                const isMacApp = process.platform === 'darwin' && currentExe.includes('.app/Contents/MacOS/');
                
                console.log(`[Update] Current Executable: ${currentExe}`);
                console.log(`[Update] Is Mac App: ${isMacApp}, Is Packaged: ${app.isPackaged}`);
                
                if (isMacApp && app.isPackaged) {
                   // Find the root .app path of the CURRENT running application
                   const currentAppPath = currentExe.substring(0, currentExe.indexOf('.app') + 4);
                   console.log(`[Update] Current App Root Path: ${currentAppPath}`);
                   
                   // Move the old app to trash or delete it
                   try {
                     // Move the new app to the current app's location (overwrite)
                     // fs.cpSync is available in newer Node versions, or we can use shell commands
                     const { execSync } = require('child_process');
                     
                     console.log(`[Update] Executing replacement command: rm -rf "${currentAppPath}" && mv "${newAppPath}" "${currentAppPath}"`);
                     execSync(`rm -rf "${currentAppPath}" && mv "${newAppPath}" "${currentAppPath}"`);
                     
                     console.log('[Update] Replacement successful. Relaunching...');
                     // Relaunch the (now updated) application from its original path
                     app.relaunch();
                     app.quit();
                     
                   } catch (copyErr) {
                      console.error(`[Update] Errore di permessi/copia: ${copyErr.message}`, copyErr);
                      event.sender.send('download-status', 'error', `Impossibile sovrascrivere l'app (permessi negati). Aperta cartella per aggiornamento manuale. Dettagli: ${copyErr.message}`);
                      // Fallback: Just open the newly extracted app if we don't have permissions to overwrite in /Applications
                      shell.openPath(newAppPath).then(() => {
                        setTimeout(() => app.quit(), 1000);
                      });
                   }
                } else {
                   console.log('[Update] Not a packaged Mac App. Opening extracted executable normally.');
                   // Windows or unpacked environment: just launch the extracted file
                   shell.openPath(newAppPath).then(() => {
                     setTimeout(() => app.quit(), 1000);
                   });
                }
              } else {
                 console.warn('[Update] No executable found in extracted zip.');
                 shell.showItemInFolder(extractPath);
                 event.sender.send('download-status', 'error', 'Nessuna applicazione (.app o .exe) trovata nello zip estratto.');
              }
            } catch (err) {
               console.error(`[Update] Errore durante l'estrazione: ${err.message}`, err);
               event.sender.send('download-status', 'error', `Errore durante l'estrazione: ${err.message}`);
               shell.showItemInFolder(destination); 
            }
          });
        });
      }).on('error', (err) => {
        console.error(`[Update] Download Network Error: ${err.message}`);
        fs.unlink(destination, () => {}); 
        event.sender.send('download-status', 'error', `Errore durante il download: ${err.message}`);
      });
    };

    downloadFile(urlToDownload);
  });
});