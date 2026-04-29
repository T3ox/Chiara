export type AuthCredentials = {
  username: string;
  email: string;
  password: string;
  productCode: string;
};

export type AuthProfile = {
  name?: string;
  email?: string;
  package?: string;
  gbUsed?: number;
  gbTotal?: number;
  mbUsed?: number;
  mbTotal?: number;
};

export type AuthSessionPayload = {
  user?: {
    id?: string;
    sub?: string;
    email?: string;
    memberships?: Array<{
      productCode?: string;
    }>;
  };
};

export type FolderSelection = {
  folderPath: string;
  folderName: string;
  fileCount: number;
  totalSizeBytes: number;
};

export type ElectronFile = File & {
  path?: string;
  webkitRelativePath?: string;
};

export type DownloadStatus = 'start' | 'extract' | 'done' | 'error' | string;

export type ElectronAPI = {
  downloadUpdate: (url: string) => void;
  onDownloadStatus: (callback: (status: DownloadStatus, message: string) => void) => VoidFunction;
  onDownloadProgress: (callback: (percentage: number) => void) => VoidFunction;
  getPlatform: () => string;
  loginWithPassword: (credentials: AuthCredentials) => Promise<AuthSessionPayload>;
  loginWithGoogle: (options: { productCode: string }) => Promise<AuthSessionPayload>;
  getAuthSession: () => Promise<AuthSessionPayload>;
  getAuthProfile: () => Promise<AuthProfile | null>;
  logout: () => Promise<unknown>;
  selectFolder: () => Promise<FolderSelection | null>;
  runFolderOrganizer: (folderPath: string) => Promise<{ success: boolean; output?: string }>;
  onFolderOrganizerOutput: (callback: (type: 'stdout' | 'stderr', text: string) => void) => VoidFunction;
  openExternal: (url: string) => Promise<{ success: boolean }>;
};
