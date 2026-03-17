const { app } = require('electron');
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');

const {
  isAllowedUpdateUrl,
  sendStatus,
  sendProgress,
  findExecutableInExtracted
} = require('./utils');
const { extractZip } = require('./extractor');
const { installPackage } = require('./installer');

function downloadUpdate(urlToDownload, event) {
  let parsedUrl;
  try {
    parsedUrl = new URL(urlToDownload);
  } catch (err) {
    console.error(`[Update] URL malformato: ${urlToDownload}`);
    sendStatus(event, 'error', 'URL di aggiornamento non valido.');
    return;
  }

  if (!isAllowedUpdateUrl(parsedUrl)) {
    console.error(`[Update] URL non autorizzato: ${urlToDownload}`);

    if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') {
      sendStatus(event, 'error', 'Protocollo di download non supportato.');
      return;
    }

    sendStatus(event, 'error', 'Dominio di aggiornamento non autorizzato.');
    return;
  }

  const tempPath = app.getPath('temp');
  const fileName = 'update_' + Date.now() + '.zip';
  const destination = path.join(tempPath, fileName);
  const fileStream = fs.createWriteStream(destination);

  sendStatus(event, 'start', 'Inizio download in corso...');

  const downloadFile = (urlObj) => {
    const httpClient = urlObj.protocol === 'http:' ? http : https;

    httpClient.get(urlObj.href, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        try {
          const redirectUrl = new URL(response.headers.location, urlObj.href);
          return downloadFile(redirectUrl);
        } catch (e) {
          return sendStatus(event, 'error', 'Errore durante il parsing del redirect.');
        }
      }

      if (response.statusCode !== 200) {
        sendStatus(event, 'error', `Errore HTTP durante il download: ${response.statusCode}`);
        return;
      }

      const totalBytes = parseInt(response.headers['content-length'], 10);
      let receivedBytes = 0;

      response.on('data', (chunk) => {
        receivedBytes += chunk.length;
        if (totalBytes && !isNaN(totalBytes)) {
          const percentage = Math.min(100, Math.round((receivedBytes / totalBytes) * 100));
          sendProgress(event, percentage);
        }
      });

      response.pipe(fileStream);

      fileStream.on('finish', async () => {
        fileStream.close(async () => {
          sendStatus(event, 'extract', 'Download completato! Installazione in corso...');

          try {
            const extractPath = path.join(tempPath, 'update_extracted_' + Date.now());
            console.log(`[Update] Extracting to ${extractPath}`);
            extractZip(destination, extractPath);
            console.log('[Update] Extraction complete');

            const newAppPath = findExecutableInExtracted(extractPath);
            console.log(`[Update] Found executable: ${newAppPath}`);

            if (!newAppPath) {
              sendStatus(event, 'error', 'Nessuna applicazione trovata nello zip.');
              return;
            }

            sendStatus(event, 'done', 'Sostituzione in corso... Riavvio imminente.');
            installPackage(newAppPath, event);
          } catch (err) {
            console.error(`[Update] Errore generale: ${err.message}`, err);
            sendStatus(event, 'error', `Errore: ${err.message}`);
          }
        });
      });
    }).on('error', (err) => {
      console.error(`[Update] Download Network Error: ${err.message}`);
      fs.unlink(destination, () => {});
      sendStatus(event, 'error', `Errore durante il download: ${err.message}`);
    });
  };

  downloadFile(parsedUrl);
}

module.exports = {
  downloadUpdate,
};
