/// <reference types="vite/client" />

import type { ElectronAPI } from './types';

declare module 'react' {
  interface InputHTMLAttributes<T> {
    webkitdirectory?: string;
    directory?: string;
  }
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

export {};
