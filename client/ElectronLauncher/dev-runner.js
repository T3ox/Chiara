const { spawn } = require('child_process');
const http = require('http');
const https = require('https');

const rendererUrl = process.env.ELECTRON_RENDERER_URL || 'http://127.0.0.1:5174';
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const electronCommand = process.platform === 'win32'
  ? 'node_modules\\.bin\\electron.cmd'
  : 'node_modules/.bin/electron';

function waitForRenderer(url, timeoutMs = 30000) {
  const startedAt = Date.now();
  const client = url.startsWith('https:') ? https : http;

  return new Promise((resolve, reject) => {
    const check = () => {
      const request = client.get(url, (response) => {
        response.resume();
        resolve();
      });

      request.on('error', () => {
        if (Date.now() - startedAt > timeoutMs) {
          reject(new Error(`Renderer non disponibile su ${url}`));
          return;
        }
        setTimeout(check, 250);
      });
    };

    check();
  });
}

const renderer = spawn(npmCommand, ['run', 'dev:renderer'], {
  stdio: 'inherit',
  env: process.env
});

let electron = null;

function shutdown(code = 0) {
  if (electron && !electron.killed) {
    electron.kill();
  }
  if (!renderer.killed) {
    renderer.kill();
  }
  process.exit(code);
}

renderer.on('exit', (code) => {
  shutdown(code || 1);
});

waitForRenderer(rendererUrl)
  .then(() => {
    electron = spawn(electronCommand, ['.'], {
      stdio: 'inherit',
      env: {
        ...process.env,
        ELECTRON_RENDERER_URL: rendererUrl
      }
    });

    electron.on('exit', (code) => shutdown(code || 0));
  })
  .catch((error) => {
    console.error(error.message);
    shutdown(1);
  });

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
