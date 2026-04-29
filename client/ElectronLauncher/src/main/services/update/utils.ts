import fs from 'fs';
import path from 'path';
import type { IpcMainEvent } from 'electron';

export const ALLOWED_UPDATE_HOSTS = ['localhost', 'github.com', 'githubusercontent.com'];

export function isAllowedUpdateUrl(url: URL) {
  const isHttp = url.protocol === 'https:' || url.protocol === 'http:';
  const isAllowedHost = ALLOWED_UPDATE_HOSTS.includes(url.hostname);
  return isHttp && isAllowedHost;
}

export function sendStatus(event: IpcMainEvent, status: string, message: string) {
  event.sender.send('download-status', status, message);
}

export function sendProgress(event: IpcMainEvent, percentage: number) {
  event.sender.send('download-progress', percentage);
}

export function findExecutableInExtracted(dirPath: string) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    if (file.endsWith('.app') || file.endsWith('.exe')) {
      return path.join(dirPath, file);
    }
  }

  return null;
}
