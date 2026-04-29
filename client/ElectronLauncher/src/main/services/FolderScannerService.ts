import fs from 'fs/promises';
import path from 'path';

export type FolderSelection = {
  folderPath: string;
  folderName: string;
  fileCount: number;
  totalSizeBytes: number;
};

type FolderSummary = {
  fileCount: number;
  totalSizeBytes: number;
};

export async function buildFolderSelection(folderPath: string): Promise<FolderSelection> {
  const absolutePath = path.resolve(folderPath);
  const stats = await fs.stat(absolutePath);
  if (!stats.isDirectory()) {
    throw new Error('Il percorso selezionato non è una cartella.');
  }

  const summary = await scanFolder(absolutePath);
  return {
    folderPath: absolutePath,
    folderName: path.basename(absolutePath),
    fileCount: summary.fileCount,
    totalSizeBytes: summary.totalSizeBytes
  };
}

async function scanFolder(folderPath: string): Promise<FolderSummary> {
  let fileCount = 0;
  let totalSizeBytes = 0;
  const entries = await fs.readdir(folderPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(folderPath, entry.name);
    if (entry.isDirectory()) {
      const nested = await scanFolder(entryPath);
      fileCount += nested.fileCount;
      totalSizeBytes += nested.totalSizeBytes;
    } else if (entry.isFile()) {
      const stats = await fs.stat(entryPath);
      fileCount += 1;
      totalSizeBytes += stats.size;
    }
  }

  return { fileCount, totalSizeBytes };
}
