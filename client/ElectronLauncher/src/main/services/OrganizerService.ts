import { spawn } from 'child_process';
import fsSync from 'fs';
import fs from 'fs/promises';
import path from 'path';
import type { IpcMainInvokeEvent } from 'electron';

const OLLAMA_ORGANIZER_DIR = path.resolve(__dirname, '../../../../../ollama-folder-organizer');
const ORGANIZER_SCRIPT = path.join(OLLAMA_ORGANIZER_DIR, 'main.py');
const PYTHON_BIN = process.env.PYTHON_BIN || (process.platform === 'win32' ? 'python' : 'python3');

export type OrganizerResult = {
  success: true;
  output: string;
};

export function runFolderOrganizer(event: IpcMainInvokeEvent, folderPath: unknown) {
  return new Promise<OrganizerResult>(async (resolve, reject) => {
    if (!folderPath || typeof folderPath !== 'string') {
      reject(new Error('Seleziona una cartella prima di avviare lo script.'));
      return;
    }

    const absolutePath = path.resolve(folderPath);
    try {
      const stats = await fs.stat(absolutePath);
      if (!stats.isDirectory()) {
        reject(new Error('Il percorso selezionato non è una cartella.'));
        return;
      }
    } catch {
      reject(new Error('Cartella selezionata non trovata.'));
      return;
    }

    const pythonBin = resolvePythonBin();
    const child = spawn(pythonBin, [ORGANIZER_SCRIPT, absolutePath], {
      cwd: OLLAMA_ORGANIZER_DIR,
      env: process.env,
      shell: false
    });

    const output: string[] = [];
    const sendOutput = (type: 'stdout' | 'stderr', data: Buffer) => {
      const text = data.toString();
      output.push(text);
      event.sender.send('folder-organizer-output', type, text);
    };

    child.stdout.on('data', (data: Buffer) => sendOutput('stdout', data));
    child.stderr.on('data', (data: Buffer) => sendOutput('stderr', data));
    child.on('error', (error) => reject(error));
    child.on('close', (code) => {
      if (code === 0) {
        resolve({ success: true, output: output.join('') });
        return;
      }

      reject(new Error(`Ollama Folder Organizer terminato con codice ${code}.`));
    });
  });
}

function resolvePythonBin() {
  if (process.env.PYTHON_BIN) {
    return process.env.PYTHON_BIN;
  }

  const venvPython =
    process.platform === 'win32'
      ? path.join(OLLAMA_ORGANIZER_DIR, '.venv', 'Scripts', 'python.exe')
      : path.join(OLLAMA_ORGANIZER_DIR, '.venv', 'bin', 'python');

  return fsSync.existsSync(venvPython) ? venvPython : PYTHON_BIN;
}
