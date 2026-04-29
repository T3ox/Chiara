import fs from 'fs';
import { execSync } from 'child_process';

export function extractZip(destination: string, extractPath: string) {
  fs.mkdirSync(extractPath, { recursive: true });

  if (process.platform === 'win32') {
    execSync(`powershell -Command "Expand-Archive -Path '${destination}' -DestinationPath '${extractPath}' -Force"`);
    return;
  }

  execSync(`unzip -q -o "${destination}" -d "${extractPath}"`);
}
