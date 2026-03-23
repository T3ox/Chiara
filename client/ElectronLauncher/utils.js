const ALLOWED_UPDATE_HOSTS = ['localhost', 'github.com', 'githubusercontent.com'];

function isAllowedUpdateUrl(url) {
  if (!url || !(url instanceof URL)) return false;
  const isHttp = url.protocol === 'https:' || url.protocol === 'http:';
  const isAllowedHost = ALLOWED_UPDATE_HOSTS.includes(url.hostname);
  return isHttp && isAllowedHost;
}

function sendStatus(event, status, message) {
  if (!event || !event.sender) return;
  event.sender.send('download-status', status, message);
}

function sendProgress(event, percentage) {
  if (!event || !event.sender) return;
  event.sender.send('download-progress', percentage);
}

function findExecutableInExtracted(dirPath) {
  const fs = require('fs');
  const path = require('path');
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    if (file.endsWith('.app') || file.endsWith('.exe')) {
      return path.join(dirPath, file);
    }
  }

  return null;
}

module.exports = {
  ALLOWED_UPDATE_HOSTS,
  isAllowedUpdateUrl,
  sendStatus,
  sendProgress,
  findExecutableInExtracted,
};