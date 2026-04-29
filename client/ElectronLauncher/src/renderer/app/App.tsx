import type { ChangeEvent, DragEvent } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { AuthProfile, AuthSessionPayload, ElectronFile, FolderSelection } from '../../types';
import { FolderActions } from '../components/FolderActions';
import { FolderDropzone } from '../components/FolderDropzone';
import { LoginPanel } from '../components/LoginPanel';
import { ProfileSidebar } from '../components/ProfileSidebar';
import { ProgressBar } from '../components/ProgressBar';
import { UpdateModal, type UpdateModalState } from '../components/UpdateModal';

type WebkitEntry = {
  name: string;
  fullPath: string;
  isFile: boolean;
  isDirectory: boolean;
  file?: (success: (file: File) => void, error: (error: DOMException) => void) => void;
  createReader?: () => {
    readEntries: (success: (entries: WebkitEntry[]) => void, error: (error: DOMException) => void) => void;
  };
};

const CURRENT_VERSION = '0.1.0';
const DEFAULT_PRODUCT_CODE = 'default';
const PRICING_URL = 'http://localhost:5173/prezzi';

const initialUpdateModal: UpdateModalState = {
  visible: false,
  currentVersion: CURRENT_VERSION,
  newVersion: '',
  releaseNotes: '',
  downloadUrl: null,
  progressVisible: false,
  progressPercent: 0,
  progressText: 'Download: 0%',
  updateButtonText: 'Aggiorna',
  updateDisabled: false,
  ignoreDisabled: false,
};

function mapSessionToProfile(sessionPayload: AuthSessionPayload | null): AuthProfile | null {
  const user = sessionPayload?.user;
  if (!user) {
    return null;
  }

  const membership = user.memberships?.[0] || {};
  return {
    name: user.email || user.sub || user.id || 'Utente autenticato',
    email: user.email || '',
    package: membership.productCode || '—',
    gbUsed: 0,
    gbTotal: 0,
  };
}

function getRemainingMb(profile: AuthProfile | null) {
  if (!profile) return null;

  if (typeof profile.mbTotal === 'number' && profile.mbTotal > 0) {
    return profile.mbTotal - (profile.mbUsed || 0);
  }

  if (typeof profile.gbTotal === 'number' && profile.gbTotal > 0) {
    return (profile.gbTotal - (profile.gbUsed || 0)) * 1024;
  }

  return null;
}

function resolveFolderPathFromFiles(files: ElectronFile[]) {
  if (!files.length) return null;

  const firstPath = files.find((file) => typeof file.path === 'string' && file.path)?.path;
  if (!firstPath) return null;

  const rel = files[0].webkitRelativePath || files[0].name;
  const firstRelativeParts = rel.includes('/') ? rel.split('/') : [files[0].name];
  const depthToFolder = Math.max(firstRelativeParts.length - 1, 1);
  const separator = firstPath.includes('\\') ? '\\' : '/';
  const parts = firstPath.split(/[\\/]/);
  return parts.slice(0, Math.max(parts.length - depthToFolder, 1)).join(separator);
}

function readEntriesAsync(reader: ReturnType<NonNullable<WebkitEntry['createReader']>>) {
  return new Promise<WebkitEntry[]>((resolve, reject) => {
    reader.readEntries(resolve, reject);
  });
}

function getFileAsync(fileEntry: WebkitEntry) {
  return new Promise<File>((resolve, reject) => {
    if (!fileEntry.file) {
      reject(new Error('Entry non valida.'));
      return;
    }
    fileEntry.file(resolve, reject);
  });
}

function getEntryFromItem(item: DataTransferItem) {
  return (
    (item as DataTransferItem & { webkitGetAsEntry?: () => WebkitEntry | null }).webkitGetAsEntry?.() || null
  );
}

export default function App() {
  const folderPickerRef = useRef<HTMLInputElement | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<AuthProfile | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [loginStatus, setLoginStatus] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loginPending, setLoginPending] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<ElectronFile[]>([]);
  const [selectedFolderPath, setSelectedFolderPath] = useState<string | null>(null);
  const [selectedFolderLabel, setSelectedFolderLabel] = useState('Nessuna cartella selezionata');
  const [canConfirm, setCanConfirm] = useState(false);
  const [status, setStatus] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [folderSizeWarning, setFolderSizeWarning] = useState('');
  const [readProgress, setReadProgress] = useState({
    visible: false,
    text: 'Lettura file: 0 / 0',
    percent: 0,
  });
  const [updateModal, setUpdateModal] = useState<UpdateModalState>(initialUpdateModal);

  const sessionLabel = useMemo(() => {
    if (!isAuthenticated) {
      return 'Effettua il login con le credenziali abilitate su auth-service.';
    }
    return `Sessione attiva${userProfile?.email ? ` per ${userProfile.email}` : ''}.`;
  }, [isAuthenticated, userProfile]);

  const setLoginMessage = useCallback((message: string, isError = false) => {
    setLoginStatus(message);
    setLoginError(isError);
  }, []);

  const applyAuthenticated = useCallback((value: boolean, profile: AuthProfile | null) => {
    setIsAuthenticated(value);
    setUserProfile(value ? profile : null);

    if (!value) {
      setSelectedFiles([]);
      setSelectedFolderPath(null);
      setSelectedFolderLabel('Nessuna cartella selezionata');
      setFolderSizeWarning('');
      setStatus('');
      setCanConfirm(false);
      setIsProfileOpen(false);
      setReadProgress((current) => ({ ...current, visible: false }));
    }
  }, []);

  const fetchProfileData = useCallback(async () => {
    try {
      const data = window.electronAPI?.getAuthProfile
        ? await window.electronAPI.getAuthProfile()
        : await fetch('http://localhost:3000/api/user/profile').then((response) => {
            if (!response.ok) return null;
            return response.json() as Promise<AuthProfile>;
          });

      if (!data) {
        return null;
      }

      applyAuthenticated(true, data);
      return data;
    } catch (err) {
      console.warn('Impossibile recuperare i dati del profilo:', err);
      return null;
    }
  }, [applyAuthenticated]);

  const refreshAuthSession = useCallback(async () => {
    try {
      const sessionPayload = await window.electronAPI?.getAuthSession();
      const profile = mapSessionToProfile(sessionPayload || null);
      applyAuthenticated(Boolean(profile), profile);
      setLoginMessage(profile ? 'Sessione gia attiva.' : '');
      return profile;
    } catch {
      applyAuthenticated(false, null);
      return null;
    }
  }, [applyAuthenticated, setLoginMessage]);

  const validateFolderSize = useCallback(
    async (totalSizeBytes: number) => {
      let profile = userProfile;
      if (!profile) {
        profile = await fetchProfileData();
      }

      const remainingMb = getRemainingMb(profile);
      if (remainingMb === null) {
        setFolderSizeWarning('');
        return true;
      }

      const totalSizeMb = totalSizeBytes / (1024 * 1024);
      if (totalSizeMb > remainingMb) {
        const totalSizeGb = totalSizeMb / 1024;
        const remainingGb = remainingMb / 1024;
        setFolderSizeWarning(
          `Cartella troppo grande (${totalSizeGb.toFixed(2)} GB). Spazio rimanente: ${remainingGb.toFixed(2)} GB.`,
        );
        return false;
      }

      setFolderSizeWarning('');
      return true;
    },
    [fetchProfileData, userProfile],
  );

  const setSelection = useCallback(
    async (filesValue: FileList | File[]) => {
      const files = Array.from(filesValue || []) as ElectronFile[];
      setSelectedFiles(files);
      setSelectedFolderPath(resolveFolderPathFromFiles(files));

      if (!files.length) {
        setSelectedFolderLabel('Nessuna cartella selezionata');
        setCanConfirm(false);
        setFolderSizeWarning('');
        return;
      }

      const totalSizeBytes = files.reduce((acc, file) => acc + (file.size || 0), 0);
      const totalSizeGb = totalSizeBytes / (1024 * 1024 * 1024);
      const rel = files[0].webkitRelativePath || files[0].name;
      const folderName = rel.includes('/') ? rel.split('/')[0] : rel;

      setSelectedFolderLabel(
        `Selezionato: ${folderName} (${files.length} file, ${totalSizeGb.toFixed(2)} GB)`,
      );
      const isValidSize = await validateFolderSize(totalSizeBytes);
      setCanConfirm(isAuthenticated && isValidSize);
      setStatus('');
    },
    [isAuthenticated, validateFolderSize],
  );

  const setFolderSelection = useCallback(
    async (selection: FolderSelection | null) => {
      if (!selection) return;

      setSelectedFiles([]);
      setSelectedFolderPath(selection.folderPath);
      const totalSizeBytes = selection.totalSizeBytes || 0;
      const totalSizeGb = totalSizeBytes / (1024 * 1024 * 1024);

      setSelectedFolderLabel(
        `Selezionato: ${selection.folderName} (${selection.fileCount || 0} file, ${totalSizeGb.toFixed(2)} GB)`,
      );
      const isValidSize = await validateFolderSize(totalSizeBytes);
      setCanConfirm(isAuthenticated && isValidSize);
      setStatus('');
    },
    [isAuthenticated, validateFolderSize],
  );

  const handleLogout = useCallback(async () => {
    try {
      await window.electronAPI?.logout();
    } catch (err) {
      console.warn('Logout non riuscito:', err);
    }

    setLoginMessage('');
    applyAuthenticated(false, null);
  }, [applyAuthenticated, setLoginMessage]);

  const handlePasswordLogin = useCallback(
    async (identifierValue: string, password: string) => {
      const identifier = identifierValue.trim();
      if (!identifier || !password) {
        setLoginMessage('Inserisci username/email e password.', true);
        return;
      }

      if (!window.electronAPI) {
        setLoginMessage('Bridge Electron non disponibile.', true);
        return;
      }

      setLoginPending(true);
      setLoginMessage('Autenticazione in corso...');

      try {
        const sessionPayload = await window.electronAPI.loginWithPassword({
          username: identifier,
          email: identifier,
          password,
          productCode: DEFAULT_PRODUCT_CODE,
        });
        const profile = mapSessionToProfile(sessionPayload);
        applyAuthenticated(true, profile);
        setLoginMessage('Login completato.');
        setStatus('');
      } catch (err) {
        applyAuthenticated(false, null);
        setLoginMessage(err instanceof Error ? err.message : 'Login non riuscito.', true);
      } finally {
        setLoginPending(false);
      }
    },
    [applyAuthenticated, setLoginMessage],
  );

  const handleGoogleLogin = useCallback(async () => {
    if (!window.electronAPI) {
      setLoginMessage('Bridge Electron non disponibile.', true);
      return;
    }

    setLoginPending(true);
    setLoginMessage('Apertura login Google...');

    try {
      const sessionPayload = await window.electronAPI.loginWithGoogle({ productCode: DEFAULT_PRODUCT_CODE });
      const profile = mapSessionToProfile(sessionPayload);
      applyAuthenticated(true, profile);
      setLoginMessage('Login Google completato.');
      setStatus('');
    } catch (err) {
      setLoginMessage(err instanceof Error ? err.message : 'Login Google non riuscito.', true);
    } finally {
      setLoginPending(false);
    }
  }, [applyAuthenticated, setLoginMessage]);

  const handleUpgradeClick = useCallback(() => {
    if (window.electronAPI?.openExternal) {
      window.electronAPI.openExternal(PRICING_URL);
    } else {
      window.open(PRICING_URL, '_blank');
    }
  }, []);

  const handleDrop = useCallback(
    async (event: DragEvent<HTMLDivElement>) => {
      if (!isAuthenticated) {
        setStatus('Effettua il login prima di selezionare una cartella.');
        return;
      }

      event.preventDefault();
      setIsDragOver(false);

      if (!event.dataTransfer?.items) {
        setStatus('Niente da selezionare.');
        return;
      }

      setStatus('Calcolo dei file in corso...');
      setReadProgress({ visible: true, text: 'Scansione cartella...', percent: 0 });

      const entries: WebkitEntry[] = [];
      const fileEntries: WebkitEntry[] = [];

      for (let i = 0; i < event.dataTransfer.items.length; i += 1) {
        const item = event.dataTransfer.items[i];
        if (item.kind === 'file') {
          const entry = getEntryFromItem(item);
          if (entry) entries.push(entry);
        }
      }

      const scanQueue = [...entries];
      while (scanQueue.length > 0) {
        const entry = scanQueue.shift();
        if (!entry) continue;
        if (entry.isFile) {
          fileEntries.push(entry);
        } else if (entry.isDirectory && entry.createReader) {
          const reader = entry.createReader();
          try {
            let results = await readEntriesAsync(reader);
            while (results.length > 0) {
              scanQueue.push(...results);
              results = await readEntriesAsync(reader);
            }
          } catch (err) {
            console.warn('Errore lettura cartella:', err);
          }
        }
      }

      if (!fileEntries.length) {
        setStatus('Nessun file trovato.');
        setReadProgress((current) => ({ ...current, visible: false }));
        return;
      }

      setStatus('Lettura dei file in corso...');
      const files: File[] = [];

      for (let i = 0; i < fileEntries.length; i += 1) {
        const entry = fileEntries[i];
        try {
          const file = await getFileAsync(entry);
          Object.defineProperty(file, 'webkitRelativePath', {
            value: entry.fullPath.substring(1),
          });
          files.push(file);
        } catch (err) {
          console.warn('Errore lettura file:', entry.name, err);
        }

        const percent = ((i + 1) / fileEntries.length) * 100;
        setReadProgress({ visible: true, text: `File ${i + 1} di ${fileEntries.length}`, percent });
      }

      await setSelection(files);
      setReadProgress((current) => ({ ...current, visible: false }));
    },
    [isAuthenticated, setSelection],
  );

  const handlePickerChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!isAuthenticated) {
        setStatus('Effettua il login prima di selezionare una cartella.');
        return;
      }

      const files = event.target.files;
      if (!files) {
        return;
      }

      if (files.length > 50) {
        setReadProgress({ visible: true, text: `Elaborazione di ${files.length} file...`, percent: 50 });
        window.setTimeout(() => {
          void setSelection(files).then(() => {
            setReadProgress({ visible: true, text: `Elaborazione di ${files.length} file...`, percent: 100 });
            window.setTimeout(() => setReadProgress((current) => ({ ...current, visible: false })), 500);
          });
        }, 100);
      } else {
        void setSelection(files);
      }
    },
    [isAuthenticated, setSelection],
  );

  const handleDropzoneClick = useCallback(() => {
    if (!isAuthenticated) {
      setStatus('Effettua il login prima di selezionare una cartella.');
      return;
    }

    if (window.electronAPI?.selectFolder) {
      window.electronAPI
        .selectFolder()
        .then((selection) => setFolderSelection(selection))
        .catch((err: unknown) =>
          setStatus(err instanceof Error ? err.message : 'Selezione cartella non riuscita.'),
        );
      return;
    }

    folderPickerRef.current?.click();
  }, [isAuthenticated, setFolderSelection]);

  const handleConfirm = useCallback(async () => {
    if (!isAuthenticated || !selectedFolderPath) {
      setStatus('Seleziona una cartella prima di confermare.');
      return;
    }

    setCanConfirm(false);
    setStatus('Avvio organizzazione cartella...');

    try {
      await window.electronAPI?.runFolderOrganizer(selectedFolderPath);
      setStatus('Organizzazione completata.');
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Errore durante esecuzione script Python.');
    } finally {
      setCanConfirm(true);
    }
  }, [isAuthenticated, selectedFolderPath]);

  const checkForUpdates = useCallback(async () => {
    try {
      const platform = window.electronAPI?.getPlatform ? window.electronAPI.getPlatform() : 'win32';
      const response = await fetch(`http://localhost:3000/api/version?platform=${platform}`);
      if (!response.ok) return;

      const data = (await response.json()) as {
        version?: string;
        releaseNotes?: string;
        downloadUrl?: string;
      };

      if (data.version && data.version > CURRENT_VERSION) {
        setUpdateModal({
          ...initialUpdateModal,
          visible: true,
          newVersion: data.version,
          releaseNotes: data.releaseNotes || 'Nessuna nota di rilascio disponibile.',
          downloadUrl: data.downloadUrl || null,
        });
      }
    } catch (err) {
      console.warn('Impossibile controllare gli aggiornamenti: ', err);
    }
  }, []);

  const resetUpdateModal = useCallback(() => {
    setUpdateModal(initialUpdateModal);
  }, []);

  const handleUpdate = useCallback(() => {
    if (!updateModal.downloadUrl) {
      resetUpdateModal();
      return;
    }

    if (window.electronAPI?.downloadUpdate) {
      setUpdateModal((current) => ({
        ...current,
        updateDisabled: true,
        ignoreDisabled: true,
        updateButtonText: 'Scaricamento in corso...',
        progressVisible: true,
        progressPercent: 0,
        progressText: 'Download: 0%',
      }));
      window.electronAPI.downloadUpdate(updateModal.downloadUrl);
      return;
    }

    window.open(updateModal.downloadUrl, '_blank');
    resetUpdateModal();
  }, [resetUpdateModal, updateModal.downloadUrl]);

  useEffect(() => {
    void refreshAuthSession();
    void checkForUpdates();
  }, [checkForUpdates, refreshAuthSession]);

  useEffect(() => {
    if (!window.electronAPI?.onFolderOrganizerOutput) {
      return undefined;
    }

    return window.electronAPI.onFolderOrganizerOutput((type, text) => {
      const lines = String(text || '')
        .trim()
        .split(/\r?\n/)
        .filter(Boolean);
      const lastLine = lines[lines.length - 1];
      if (lastLine) {
        setStatus(type === 'stderr' ? `Python: ${lastLine}` : lastLine);
      }
    });
  }, []);

  useEffect(() => {
    const cleanups: VoidFunction[] = [];

    if (window.electronAPI?.onDownloadProgress) {
      cleanups.push(
        window.electronAPI.onDownloadProgress((percentage) => {
          setUpdateModal((current) => ({
            ...current,
            progressPercent: percentage,
            progressText:
              percentage >= 100 ? 'Download completato! Estrazione in corso...' : `Download: ${percentage}%`,
          }));
        }),
      );
    }

    if (window.electronAPI?.onDownloadStatus) {
      cleanups.push(
        window.electronAPI.onDownloadStatus((downloadStatus, message) => {
          if (downloadStatus === 'done') {
            setUpdateModal((current) => ({
              ...current,
              progressPercent: 100,
              progressText: 'Installazione completata! Riavvio in corso...',
            }));
            window.setTimeout(resetUpdateModal, 3000);
          } else if (downloadStatus === 'extract') {
            setUpdateModal((current) => ({ ...current, progressText: message }));
          } else if (downloadStatus === 'error') {
            console.error(message);
            setUpdateModal((current) => ({
              ...current,
              progressVisible: true,
              progressText: `Errore: ${message}`,
              updateButtonText: 'Riprovare',
              updateDisabled: false,
              ignoreDisabled: false,
            }));
          } else if (downloadStatus === 'start') {
            setUpdateModal((current) => ({ ...current, updateButtonText: 'Scaricamento in corso...' }));
          }
        }),
      );
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [resetUpdateModal]);

  return (
    <>
      <ProfileSidebar
        profile={userProfile}
        isOpen={isProfileOpen}
        isAuthenticated={isAuthenticated}
        onOpen={() => {
          if (!isAuthenticated) {
            setStatus('Effettua il login per aprire il profilo.');
            return;
          }
          setIsProfileOpen(true);
          void fetchProfileData();
        }}
        onClose={() => setIsProfileOpen(false)}
        onLogout={handleLogout}
      />

      <main className="window">
        <h1 className="title">Chiara Launcher</h1>
        <h2 id="versionLabel" className="version-label">
          Version: {CURRENT_VERSION}
        </h2>

        <LoginPanel
          isAuthenticated={isAuthenticated}
          loginStatus={loginStatus}
          loginError={loginError}
          sessionLabel={sessionLabel}
          isPending={loginPending}
          onPasswordLogin={handlePasswordLogin}
          onGoogleLogin={handleGoogleLogin}
          onLogout={handleLogout}
        />

        <FolderDropzone
          isAuthenticated={isAuthenticated}
          isDragOver={isDragOver}
          selectedPathLabel={selectedFolderLabel}
          onClick={handleDropzoneClick}
          onDrop={handleDrop}
          onDragOver={(event) => {
            if (!isAuthenticated) return;
            event.preventDefault();
            setIsDragOver(true);
            setStatus('Rilascia per selezionare');
          }}
          onDragLeave={() => {
            setIsDragOver(false);
            setStatus('');
          }}
        />

        {isAuthenticated && <div className="status">{status}</div>}

        {folderSizeWarning && (
          <div className="folder-size-warning">
            <span>Attenzione: {folderSizeWarning}</span>
            <button
              className="btn-upgrade"
              type="button"
              title="Vedi i piani disponibili"
              onClick={handleUpgradeClick}>
              Upgrade
            </button>
          </div>
        )}

        {readProgress.visible && <ProgressBar label={readProgress.text} percentage={readProgress.percent} />}

        <FolderActions
          isAuthenticated={isAuthenticated}
          canConfirm={canConfirm}
          folderPickerRef={folderPickerRef}
          onConfirm={handleConfirm}
          onPickerChange={handlePickerChange}
        />

        <UpdateModal state={updateModal} onIgnore={resetUpdateModal} onUpdate={handleUpdate} />
      </main>
    </>
  );
}
