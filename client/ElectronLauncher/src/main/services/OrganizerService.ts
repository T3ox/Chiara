import { spawn } from 'child_process';
import fsSync from 'fs';
import fs from 'fs/promises';
import path from 'path';
import type { IpcMainInvokeEvent } from 'electron';

const OLLAMA_ORGANIZER_DIR = path.resolve(__dirname, '../../../../../ollama-folder-organizer');
const ORGANIZER_SCRIPT = path.join(OLLAMA_ORGANIZER_DIR, 'main.py');
const UNDO_SCRIPT = path.join(OLLAMA_ORGANIZER_DIR, 'undo.py');
const ORGANIZER_HISTORY_FILE = '.organizer_history.json';
const PYTHON_BIN = process.env.PYTHON_BIN || (process.platform === 'win32' ? 'python' : 'python3');

export type OrganizerResult = {
  success: true;
  output: string;
};

export function runFolderOrganizer(event: IpcMainInvokeEvent, folderPath: unknown) {
  return new Promise<OrganizerResult>(async (resolve, reject) => {
    let absolutePath: string;
    try {
      absolutePath = await resolveOrganizerFolder(folderPath, 'Seleziona una cartella prima di avviare lo script.');
    } catch (error) {
      reject(error);
      return;
    }

    const pythonBin = resolvePythonBin();
    const child = spawnOrganizerProcess(pythonBin, [ORGANIZER_SCRIPT, absolutePath]);

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

export function undoLastOrganizerSession(event: IpcMainInvokeEvent, folderPath: unknown) {
  return new Promise<OrganizerResult>(async (resolve, reject) => {
    let absolutePath: string;
    try {
      absolutePath = await resolveOrganizerFolder(folderPath, 'Seleziona una cartella prima di annullare le modifiche.');
    } catch (error) {
      reject(error);
      return;
    }

    const historyPath = path.join(absolutePath, ORGANIZER_HISTORY_FILE);
    if (!fsSync.existsSync(historyPath)) {
      reject(new Error('Nessuna cronologia undo trovata per la cartella selezionata.'));
      return;
    }

    const pythonBin = resolvePythonBin();
    const child = spawnOrganizerProcess(pythonBin, [UNDO_SCRIPT, '--history', historyPath]);

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

      reject(new Error(`Undo Organizer terminato con codice ${code}.`));
    });
  });
}

async function resolveOrganizerFolder(folderPath: unknown, message: string) {
  if (!folderPath || typeof folderPath !== 'string') {
    throw new Error(message);
  }

  const absolutePath = path.resolve(folderPath);
  await ensureDirectory(absolutePath);
  return absolutePath;
}

async function ensureDirectory(absolutePath: string) {
  try {
    const stats = await fs.stat(absolutePath);
    if (!stats.isDirectory()) {
      throw new Error('Il percorso selezionato non è una cartella.');
    }
  } catch (error) {
    if (error instanceof Error && error.message === 'Il percorso selezionato non è una cartella.') {
      throw error;
    }
    throw new Error('Cartella selezionata non trovata.');
  }
}

function spawnOrganizerProcess(pythonBin: string, args: string[]) {
  return spawn(pythonBin, args, {
    cwd: OLLAMA_ORGANIZER_DIR,
    env: process.env,
    shell: false
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
