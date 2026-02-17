
export enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  SUCCESS = 'success'
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: LogLevel;
  message: string;
  fileName?: string;
  code?: string;
}

export interface ProcessingStats {
  total: number;
  done: number;
  failed: number;
  currentFile: string | null;
}

export interface FolderStructure {
  inputHandle: FileSystemDirectoryHandle | null;
  resultHandle: FileSystemDirectoryHandle | null;
  availableFolders: string[];
}

export enum ErrorCodes {
  LOCK = 'E_LOCK',
  NOEXT = 'E_NOEXT',
  UNSUP = 'E_UNSUP',
  EMPTY = 'E_EMPTY',
  PROMPT = 'E_PROMPT',
  PDFLIB = 'E_PDFLIB',
  PDFHEAD = 'E_PDFHEAD',
  CONV = 'E_CONV',
  API = 'E_API',
  BADOUT = 'E_BADOUT',
  REPAIR = 'E_REPAIR',
  MOVE = 'E_MOVE',
  SAFE = 'E_SAFE',
  CRASH = 'E_CRASH',
  RATE = 'E_429',
  STOPPED = 'E_STOPPED',
}
