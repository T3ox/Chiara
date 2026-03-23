const fs = require('fs');
const { execSync } = require('child_process');

function extractZip(destination, extractPath) {
  fs.mkdirSync(extractPath, { recursive: true });

  if (process.platform === 'win32') {
    execSync(`powershell -Command "Expand-Archive -Path '${destination}' -DestinationPath '${extractPath}' -Force"`);
  } else {
    execSync(`unzip -q -o "${destination}" -d "${extractPath}"`);
  }
}

module.exports = {
  extractZip,
};