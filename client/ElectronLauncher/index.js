const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const https = require('https');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 550,
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
    const tempPath = app.getPath('temp');
    const fileName = 'update_' + Date.now() + '.zip';
    const destination = path.join(tempPath, fileName);
    const fileStream = fs.createWriteStream(destination);
    
    event.sender.send('download-status', 'start', 'Inizio download in corso...');
    
    const downloadFile = (url) => {
      https.get(url, (response) => {
        // Resource moved
        if (response.statusCode === 301 || response.statusCode === 302) {
          return downloadFile(response.headers.location);
        }

        // Generic HTTP error
        if (response.statusCode !== 200) {
          event.sender.send('download-status', 'error', `Errore HTTP durante il download: ${response.statusCode}`);
          return;
        }

        response.pipe(fileStream);

        fileStream.on('finish', () => {
          fileStream.close(async () => {
            event.sender.send('download-status', 'extract', 'Download completato! Installazione in corso...');
            
            try {
              const extractPath = path.join(tempPath, 'update_extracted_' + Date.now());
              fs.mkdirSync(extractPath, { recursive: true });
                            
              // Su macOS, fare 'unzip' nativo è spesso più sicuro per i bundle .app per preservare i symlinks e i permessi
              const { execSync } = require('child_process');
              try {
                  execSync(`unzip -q -o "${destination}" -d "${extractPath}"`);
              } catch (unzipErr) {
                  console.error(`[Update] Native unzip failed: ${unzipErr.message}`);
                  throw unzipErr;
              }
                            
              const files = fs.readdirSync(extractPath);
              let newAppPath = null;
              
              for (const file of files) {
                if (file.endsWith('.app') || file.endsWith('.exe')) {
                  newAppPath = path.join(extractPath, file);
                  break;
                }
              }

              if (newAppPath) {
                event.sender.send('download-status', 'done', 'Sostituzione in corso... Riavvio imminente.');
                
                // SEAMLESS UPDATE LOGIC
                const currentExe = process.execPath;
                const isMacApp = process.platform === 'darwin' && currentExe.includes('.app/Contents/MacOS/');
                
                if (isMacApp && app.isPackaged) {
                  const currentAppPath = currentExe.substring(0, currentExe.indexOf('.app') + 4);
                  try {
                    const { execSync } = require('child_process');
                    execSync(`rm -rf "${currentAppPath}" && mv "${newAppPath}" "${currentAppPath}"`);
                    
                    app.quit();
                    app.relaunch();
                  } catch (copyErr) {
                    console.error(`[Update] Errore di permessi/copia: ${copyErr.message}`, copyErr);
                    event.sender.send('download-status', 'error', `Impossibile sovrascrivere l'app (permessi negati). Aperta cartella per aggiornamento manuale. Dettagli: ${copyErr.message}`);
                    // Fallback: Apri l'app appena estratta se non abbiamo i permessi per sovrascrivere
                    shell.openPath(newAppPath).then(() => {
                      setTimeout(() => app.quit(), 1000);
                    });
                  }
                } else {
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