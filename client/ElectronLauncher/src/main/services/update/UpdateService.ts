import fs from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';
import type { App, IpcMainEvent } from 'electron';
import { extractZip } from './extractor';
import { installPackage } from './installer';
import { findExecutableInExtracted, isAllowedUpdateUrl, sendProgress, sendStatus } from './utils';

export function downloadUpdate(urlToDownload: string, event: IpcMainEvent, app: App) {
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(urlToDownload);
  } catch {
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
  const fileName = `update_${Date.now()}.zip`;
  const destination = path.join(tempPath, fileName);
  const fileStream = fs.createWriteStream(destination);

  sendStatus(event, 'start', 'Inizio download in corso...');

  const downloadFile = (urlObj: URL): void => {
    const httpClient = urlObj.protocol === 'http:' ? http : https;

    httpClient
      .get(urlObj.href, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          try {
            const redirectUrl = new URL(response.headers.location || '', urlObj.href);
            downloadFile(redirectUrl);
            return;
          } catch {
            sendStatus(event, 'error', 'Errore durante il parsing del redirect.');
            return;
          }
        }

        if (response.statusCode !== 200) {
          sendStatus(event, 'error', `Errore HTTP durante il download: ${response.statusCode}`);
          return;
        }

        const totalBytes = Number.parseInt(response.headers['content-length'] || '', 10);
        let receivedBytes = 0;

        response.on('data', (chunk: Buffer) => {
          receivedBytes += chunk.length;
          if (totalBytes && !Number.isNaN(totalBytes)) {
            const percentage = Math.min(100, Math.round((receivedBytes / totalBytes) * 100));
            sendProgress(event, percentage);
          }
        });

        response.pipe(fileStream);

        fileStream.on('finish', () => {
          fileStream.close(() => {
            sendStatus(event, 'extract', 'Download completato! Installazione in corso...');

            try {
              const extractPath = path.join(tempPath, `update_extracted_${Date.now()}`);
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
              installPackage(newAppPath, event, sendStatus);
            } catch (err) {
              const message = err instanceof Error ? err.message : String(err);
              console.error(`[Update] Errore generale: ${message}`, err);
              sendStatus(event, 'error', `Errore: ${message}`);
            }
          });
        });
      })
      .on('error', (err) => {
        console.error(`[Update] Download Network Error: ${err.message}`);
        fs.unlink(destination, () => {});
        sendStatus(event, 'error', `Errore durante il download: ${err.message}`);
      });
  };

  downloadFile(parsedUrl);
}
