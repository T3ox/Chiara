const dropzone = document.getElementById('dropzone');
const selectedPath = document.getElementById('selectedPath');
const status = document.getElementById('status');
const confirmBtn = document.getElementById('confirmBtn');
const folderPicker = document.getElementById('folderPicker');
const actions = document.querySelector('.actions');
const profileBtn = document.getElementById('profileBtn');
const profileSidebar = document.getElementById('profileSidebar');
const profileOverlay = document.getElementById('profileOverlay');
const profileClose = document.getElementById('profileClose');
const profileName = document.getElementById('profileName');
const profileEmail = document.getElementById('profileEmail');
const profilePackage = document.getElementById('profilePackage');
const profileGbFill = document.getElementById('profileGbFill');
const profileGbLabel = document.getElementById('profileGbLabel');
const profileLogoutBtn = document.getElementById('profileLogoutBtn');
const folderSizeWarning = document.getElementById('folderSizeWarning');
const folderSizeWarningText = document.getElementById('folderSizeWarningText');
const upgradeBtn = document.getElementById('upgradeBtn');

upgradeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const pricingUrl = 'http://localhost:5173/prezzi';
  if (window.electronAPI && window.electronAPI.openExternal) {
    window.electronAPI.openExternal(pricingUrl);
  } else {
    window.open(pricingUrl, '_blank');
  }
});
const readProgressContainer = document.getElementById('readProgressContainer');
const readProgressBar = document.getElementById('readProgressBar');
const readProgressText = document.getElementById('readProgressText');
const loginForm = document.getElementById('loginForm');
const loginIdentifier = document.getElementById('loginIdentifier');
const loginPassword = document.getElementById('loginPassword');
const loginSubmitBtn = document.getElementById('loginSubmitBtn');
const googleLoginBtn = document.getElementById('googleLoginBtn');
const oauthActions = document.getElementById('oauthActions');
const loginStatus = document.getElementById('loginStatus');
const loginBadge = document.getElementById('loginBadge');
const loginSessionLabel = document.getElementById('loginSessionLabel');
const logoutBtn = document.getElementById('logoutBtn');

let selectedFiles = [];
let selectedFolderPath = null;
let selectedFolderSummary = null;
let userProfile = null;
let isAuthenticated = false;
const DEFAULT_PRODUCT_CODE = 'default';

function setStatus(msg) {
  status.textContent = msg || '';
}

function setLoginStatus(message, isError = false) {
  loginStatus.textContent = message || '';
  loginStatus.classList.toggle('error', isError);
}

function setAuthenticated(value, profile) {
  isAuthenticated = value;
  userProfile = value ? profile : null;
  dropzone.classList.toggle('hidden', !value);
  actions.classList.toggle('hidden', !value);
  status.classList.toggle('hidden', !value);
  readProgressContainer.classList.add('hidden');
  loginBadge.textContent = value ? 'Autenticato' : 'Non autenticato';
  loginBadge.classList.toggle('authenticated', value);
  loginForm.classList.toggle('hidden', value);
  oauthActions.classList.toggle('hidden', value);
  logoutBtn.classList.toggle('hidden', !value);
  profileBtn.disabled = !value;
  profileBtn.classList.toggle('hidden', !value);
  loginSessionLabel.textContent = value
    ? `Sessione attiva${profile && profile.email ? ` per ${profile.email}` : ''}.`
    : 'Effettua il login con le credenziali abilitate su auth-service.';
  updateProfileUI(profile);

  if (!value) {
    selectedFiles = [];
    selectedFolderPath = null;
    selectedFolderSummary = null;
    selectedPath.textContent = 'Nessuna cartella selezionata';
    folderSizeWarning.classList.add('hidden');
    setStatus('');
    confirmBtn.disabled = true;
    toggleProfileSidebar(false);
  } else if (selectedFiles.length > 0) {
    confirmBtn.disabled = false;
  }
}

function mapSessionToProfile(sessionPayload) {
  const user = sessionPayload && sessionPayload.user ? sessionPayload.user : null;
  if (!user) {
    return null;
  }

  const memberships = Array.isArray(user.memberships) ? user.memberships : [];
  const membership = memberships[0] || {};
  return {
    name: user.email || user.sub || user.id || 'Utente autenticato',
    email: user.email || '',
    package: membership.productCode || '—',
    gbUsed: 0,
    gbTotal: 0
  };
}

async function refreshAuthSession() {
  try {
    const sessionPayload = await window.electronAPI.getAuthSession();
    const profile = mapSessionToProfile(sessionPayload);
    setAuthenticated(Boolean(profile), profile);
    setLoginStatus(profile ? 'Sessione gia attiva.' : '');
    return profile;
  } catch (_err) {
    setAuthenticated(false, null);
    return null;
  }
}

async function handleLogout() {
  try {
    await window.electronAPI.logout();
  } catch (err) {
    console.warn('Logout non riuscito:', err);
  }

  loginPassword.value = '';
  setLoginStatus('');
  setAuthenticated(false, null);
  toggleProfileSidebar(false);
}

async function setSelection(files) {
  selectedFiles = Array.from(files || []);
  selectedFolderPath = resolveFolderPathFromFiles(selectedFiles);
  selectedFolderSummary = null;
  const fileCount = selectedFiles.length;

  if (fileCount === 0) {
    selectedPath.textContent = 'Nessuna cartella selezionata';
    selectedFolderPath = null;
    selectedFolderSummary = null;
    confirmBtn.disabled = true;
    folderSizeWarning.classList.add('hidden');
    return;
  }

  // Calculate total size in bytes
  const totalSizeBytes = selectedFiles.reduce((acc, file) => acc + (file.size || 0), 0);
  const totalSizeMB = totalSizeBytes / (1024 * 1024);
  const totalSizeGB = totalSizeMB / 1024;

  const rel = selectedFiles[0].webkitRelativePath || selectedFiles[0].name;
  const folderName = rel.includes('/') ? rel.split('/')[0] : rel;

  selectedPath.textContent = `Selezionato: ${folderName} (${fileCount} file, ${totalSizeGB.toFixed(2)} GB)`;
  
  // Validation against user profile
  if (!userProfile) {
    await fetchProfileData();
  }

  if (userProfile) {
    const remainingMB = userProfile.mbTotal - userProfile.mbUsed;
    const remainingGB = remainingMB / 1024;
    
    if (totalSizeMB > remainingMB) {
      folderSizeWarningText.textContent = `⚠️ Cartella troppo grande (${totalSizeGB.toFixed(2)} GB). Spazio rimanente: ${remainingGB.toFixed(2)} GB.`;
      folderSizeWarning.classList.remove('hidden');
      confirmBtn.disabled = true;
    } else {
      folderSizeWarning.classList.add('hidden');
      confirmBtn.disabled = false;
    }
  } else {
    confirmBtn.disabled = !isAuthenticated;
  }
  
  setStatus('');
}

async function setFolderSelection(selection) {
  if (!selection) return;

  selectedFiles = [];
  selectedFolderPath = selection.folderPath;
  selectedFolderSummary = selection;

  const fileCount = selection.fileCount || 0;
  const totalSizeBytes = selection.totalSizeBytes || 0;
  const totalSizeMB = totalSizeBytes / (1024 * 1024);
  const totalSizeGB = totalSizeMB / 1024;

  selectedPath.textContent = `Selezionato: ${selection.folderName} (${fileCount} file, ${totalSizeGB.toFixed(2)} GB)`;

  if (!userProfile) {
    await fetchProfileData();
  }

  if (userProfile) {
    const remainingMB = userProfile.mbTotal - userProfile.mbUsed;
    const remainingGB = remainingMB / 1024;

    if (totalSizeMB > remainingMB) {
      folderSizeWarningText.textContent = `⚠️ Cartella troppo grande (${totalSizeGB.toFixed(2)} GB). Spazio rimanente: ${remainingGB.toFixed(2)} GB.`;
      folderSizeWarning.classList.remove('hidden');
      confirmBtn.disabled = true;
    } else {
      folderSizeWarning.classList.add('hidden');
      confirmBtn.disabled = false;
    }
  } else {
    confirmBtn.disabled = !isAuthenticated;
  }

  setStatus('');
}

function resolveFolderPathFromFiles(files) {
  if (!Array.isArray(files) || files.length === 0) return null;

  const firstPath = files.find((file) => typeof file.path === 'string' && file.path).path;
  if (!firstPath) return null;

  const rel = files[0].webkitRelativePath || files[0].name;
  const firstRelativeParts = rel.includes('/') ? rel.split('/') : [files[0].name];
  const depthToFolder = Math.max(firstRelativeParts.length - 1, 1);
  const separator = firstPath.includes('\\') ? '\\' : '/';
  const parts = firstPath.split(/[\\/]/);
  return parts.slice(0, Math.max(parts.length - depthToFolder, 1)).join(separator);
}

// Drag over/leave
dropzone.addEventListener('dragover', (e) => {
  if (!isAuthenticated) return;
  e.preventDefault();
  dropzone.classList.add('dragover');
  setStatus('Rilascia per selezionare');
});

dropzone.addEventListener('dragleave', () => {
  dropzone.classList.remove('dragover');
  setStatus('');
});

// Drop
dropzone.addEventListener('drop', async (e) => {
  if (!isAuthenticated) {
    setStatus('Effettua il login prima di selezionare una cartella.');
    return;
  }

  e.preventDefault();
  dropzone.classList.remove('dragover');

  if (!e.dataTransfer || !e.dataTransfer.items) {
    setStatus('Niente da selezionare.');
    return;
  }

  setStatus('Calcolo dei file in corso...');
  readProgressContainer.classList.remove('hidden');
  readProgressBar.style.width = '0%';
  readProgressText.textContent = 'Scansione cartella...';

  const entries = [];
  const fileEntries = [];

  // 1. Passaggio 1: Scansione ricorsiva per trovare tutti i FileEntry
  for (let i = 0; i < e.dataTransfer.items.length; i++) {
    const item = e.dataTransfer.items[i];
    if (item.kind === 'file') {
      const entry = item.webkitGetAsEntry();
      if (entry) entries.push(entry);
    }
  }

  const scanQueue = [...entries];
  const readEntriesAsync = (reader) => new Promise((resolve, reject) => {
    reader.readEntries(resolve, reject);
  });

  while (scanQueue.length > 0) {
    const entry = scanQueue.shift();
    if (entry.isFile) {
      fileEntries.push(entry);
    } else if (entry.isDirectory) {
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

  const totalFiles = fileEntries.length;
  if (totalFiles === 0) {
    setStatus('Nessun file trovato.');
    readProgressContainer.classList.add('hidden');
    return;
  }

  // 2. Passaggio 2: Lettura dei file con progress bar
  setStatus('Lettura dei file in corso...');
  const files = [];
  const getFileAsync = (fileEntry) => new Promise((resolve, reject) => {
    fileEntry.file(resolve, reject);
  });

  for (let i = 0; i < totalFiles; i++) {
    const entry = fileEntries[i];
    try {
      const file = await getFileAsync(entry);
      Object.defineProperty(file, 'webkitRelativePath', {
        value: entry.fullPath.substring(1)
      });
      files.push(file);
    } catch (err) {
      console.warn('Errore lettura file:', entry.name, err);
    }

    // Aggiornamento progress bar
    const percent = ((i + 1) / totalFiles) * 100;
    readProgressBar.style.width = `${percent}%`;
    readProgressText.textContent = `File ${i + 1} di ${totalFiles}`;
  }

  await setSelection(files);
  readProgressContainer.classList.add('hidden');
});

// Folder picker (consigliato)
folderPicker.addEventListener('change', async (e) => {
  if (!isAuthenticated) {
    setStatus('Effettua il login prima di selezionare una cartella.');
    return;
  }

  const files = e.target.files;
  const totalFiles = files.length;
  
  if (totalFiles > 50) { // Mostra progress bar solo se ci sono molti file
    readProgressContainer.classList.remove('hidden');
    readProgressBar.style.width = '0%';
    
    // Purtroppo con il filePicker standard non possiamo intercettare il caricamento singolo facilmente
    // ma possiamo almeno mostrare la barra mentre calcoliamo la selezione
    readProgressText.textContent = `Elaborazione di ${totalFiles} file...`;
    readProgressBar.style.width = '50%';
    
    setTimeout(async () => {
      await setSelection(files);
      readProgressBar.style.width = '100%';
      setTimeout(() => readProgressContainer.classList.add('hidden'), 500);
    }, 100);
  } else {
    await setSelection(files);
  }
});

// Cliccare sulla dropzone per aprire il selettore file
dropzone.addEventListener('click', () => {
  if (!isAuthenticated) {
    setStatus('Effettua il login prima di selezionare una cartella.');
    return;
  }

  if (window.electronAPI && window.electronAPI.selectFolder) {
    window.electronAPI.selectFolder()
      .then((selection) => setFolderSelection(selection))
      .catch((err) => setStatus(err && err.message ? err.message : 'Selezione cartella non riuscita.'));
    return;
  }

  folderPicker.click();
});

confirmBtn.addEventListener('click', async () => {
  if (!isAuthenticated || !selectedFolderPath) {
    setStatus('Seleziona una cartella prima di confermare.');
    return;
  }

  confirmBtn.disabled = true;
  setStatus('Avvio organizzazione cartella...');

  try {
    await window.electronAPI.runFolderOrganizer(selectedFolderPath);
    setStatus('Organizzazione completata.');
  } catch (err) {
    setStatus(err && err.message ? err.message : 'Errore durante esecuzione script Python.');
  } finally {
    confirmBtn.disabled = false;
  }
});

if (window.electronAPI && window.electronAPI.onFolderOrganizerOutput) {
  window.electronAPI.onFolderOrganizerOutput((type, text) => {
    const lines = String(text || '').trim().split(/\r?\n/).filter(Boolean);
    const lastLine = lines[lines.length - 1];
    if (lastLine) {
      setStatus(type === 'stderr' ? `Python: ${lastLine}` : lastLine);
    }
  });
}

// --- Profile Sidebar Logic --- //
function toggleProfileSidebar(show) {
  if (show && !isAuthenticated) {
    setStatus('Effettua il login per aprire il profilo.');
    return;
  }

  if (show) {
    profileSidebar.classList.add('open');
    profileOverlay.classList.add('visible');
    profileSidebar.setAttribute('aria-hidden', 'false');
    fetchProfileData();
  } else {
    profileSidebar.classList.remove('open');
    profileOverlay.classList.remove('visible');
    profileSidebar.setAttribute('aria-hidden', 'true');
  }
}

async function fetchProfileData() {
  try {
    const data = window.electronAPI.getAuthProfile
      ? await window.electronAPI.getAuthProfile()
      : await fetch('http://localhost:3000/api/user/profile').then((response) => {
        if (!response.ok) return null;
        return response.json();
      });
    if (!data) return;
    userProfile = data;
    setAuthenticated(true, data);
    updateProfileUI(data);
  } catch (err) {
    console.warn("Impossibile recuperare i dati del profilo:", err);
  }
}

function updateProfileUI(data) {
  profileName.textContent = data && data.name ? data.name : '—';
  profileEmail.textContent = data && data.email ? data.email : '—';
  profilePackage.textContent = data && data.package ? data.package : '—';
  
  if (data && data.gbTotal > 0) {
    const remaining = data.gbTotal - data.gbUsed;
    const percentage = (remaining / data.gbTotal) * 100;
    profileGbFill.style.width = `${100 - percentage}%`;
    profileGbLabel.textContent = `${remaining.toFixed(1)} GB rimanenti`;
  } else {
    profileGbFill.style.width = '0%';
    profileGbLabel.textContent = 'Quota non disponibile';
  }
}

profileBtn.addEventListener('click', () => toggleProfileSidebar(true));
profileClose.addEventListener('click', () => toggleProfileSidebar(false));
profileOverlay.addEventListener('click', () => toggleProfileSidebar(false));
logoutBtn.addEventListener('click', handleLogout);
profileLogoutBtn.addEventListener('click', handleLogout);

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const identifier = loginIdentifier.value.trim();
  const password = loginPassword.value;

  if (!identifier || !password) {
    setLoginStatus('Inserisci username/email e password.', true);
    return;
  }

  loginSubmitBtn.disabled = true;
  setLoginStatus('Autenticazione in corso...');

  try {
    const sessionPayload = await window.electronAPI.loginWithPassword({
      username: identifier,
      email: identifier,
      password,
      productCode: DEFAULT_PRODUCT_CODE
    });
    const profile = mapSessionToProfile(sessionPayload);
    setAuthenticated(true, profile);
    setLoginStatus('Login completato.');
    loginPassword.value = '';
    setStatus('');
  } catch (err) {
    setAuthenticated(false, null);
    setLoginStatus(err && err.message ? err.message : 'Login non riuscito.', true);
  } finally {
    loginSubmitBtn.disabled = false;
  }
});

googleLoginBtn.addEventListener('click', async () => {
  googleLoginBtn.disabled = true;
  loginSubmitBtn.disabled = true;
  setLoginStatus('Apertura login Google...');

  try {
    const sessionPayload = await window.electronAPI.loginWithGoogle({
      productCode: DEFAULT_PRODUCT_CODE
    });
    const profile = mapSessionToProfile(sessionPayload);
    setAuthenticated(true, profile);
    setLoginStatus('Login Google completato.');
    loginPassword.value = '';
    setStatus('');
  } catch (err) {
    setLoginStatus(err && err.message ? err.message : 'Login Google non riuscito.', true);
  } finally {
    googleLoginBtn.disabled = false;
    loginSubmitBtn.disabled = false;
  }
});

// --- Update Checker Logic --- //
const currentVersion = "0.1.0";
const versionLabel = document.getElementById('versionLabel');
versionLabel.textContent = `Version: ${currentVersion}`;
const updateModal = document.getElementById('updateModal');
const updateModalCurrentVersion = document.getElementById('updateModalCurrentVersion');
const updateModalNewVersion = document.getElementById('updateModalNewVersion');
const updateModalNotes = document.getElementById('updateModalNotes');
const updateModalIgnoreBtn = document.getElementById('updateModalIgnoreBtn');
const updateModalUpdateBtn = document.getElementById('updateModalUpdateBtn');

let downloadUrlToOpen = null;

async function checkForUpdates() {
  try {
    const platform = window.electronAPI.getPlatform ? window.electronAPI.getPlatform() : 'win32';
    const response = await fetch(`http://localhost:3000/api/version?platform=${platform}`);
    if (!response.ok) return;

    const data = await response.json();
    
    // Simple version comparison (e.g. "0.0.1" > "0.0.0")
    if (data && data.version && data.version > currentVersion) {
      updateModalCurrentVersion.textContent = `Versione attuale: ${currentVersion}`;
      updateModalNewVersion.textContent = `Nuova versione disponibile: ${data.version}`;
      updateModalNotes.value = data.releaseNotes || "Nessuna nota di rilascio disponibile.";
      downloadUrlToOpen = data.downloadUrl;
      
      updateModal.classList.remove('hidden');
    }
  } catch (err) {
    console.warn("Impossibile controllare gli aggiornamenti: ", err);
  }
}

updateModalIgnoreBtn.addEventListener('click', () => {
  updateModal.classList.add('hidden');
});

const updateProgressContainer = document.getElementById('updateProgressContainer');
const updateProgressBar = document.getElementById('updateProgressBar');
const updateProgressText = document.getElementById('updateProgressText');

function resetUpdateModal() {
  updateModalUpdateBtn.disabled = false;
  updateModalIgnoreBtn.disabled = false;
  updateModalUpdateBtn.textContent = 'Aggiorna';
  updateProgressContainer.classList.add('hidden');
  updateProgressBar.style.width = '0%';
  updateProgressText.textContent = 'Download: 0%';
}

updateModalUpdateBtn.addEventListener('click', () => {
  if (downloadUrlToOpen) {
    if (window.electronAPI && window.electronAPI.downloadUpdate) {
        updateModalUpdateBtn.disabled = true;
        updateModalIgnoreBtn.disabled = true;
        updateModalUpdateBtn.textContent = 'Scaricamento in corso...';
        // Show the progress bar
        updateProgressContainer.classList.remove('hidden');
        updateProgressBar.style.width = '0%';
        updateProgressText.textContent = 'Download: 0%';
        
        window.electronAPI.downloadUpdate(downloadUrlToOpen);
    } else {
        window.open(downloadUrlToOpen, '_blank');
        updateModal.classList.add('hidden');
    }
  } else {
    updateModal.classList.add('hidden');
  }
});

// Listen for download progress
if (window.electronAPI && window.electronAPI.onDownloadProgress) {
  window.electronAPI.onDownloadProgress((percentage) => {
    updateProgressBar.style.width = `${percentage}%`;
    updateProgressText.textContent = `Download: ${percentage}%`;
    if (percentage >= 100) {
      updateProgressText.textContent = 'Download completato! Estrazione in corso...';
    }
  });
}

// Listen for download status updates
if (window.electronAPI && window.electronAPI.onDownloadStatus) {
  window.electronAPI.onDownloadStatus((status, message) => {
    if (status === 'done') {
      updateProgressBar.style.width = '100%';
      updateProgressText.textContent = 'Installazione completata! Riavvio in corso...';
      setTimeout(() => {
        updateModal.classList.add('hidden');
                resetUpdateModal();
            }, 3000);
        } else if (status === 'extract') {
            updateProgressText.textContent = message;
        } else if (status === 'error') {
            console.error(message);
            updateProgressText.textContent = `Errore: ${message}`;
            updateProgressContainer.classList.remove('hidden');
            updateModalUpdateBtn.textContent = 'Riprovare';
            updateModalUpdateBtn.disabled = false;
            updateModalIgnoreBtn.disabled = false;
        } else if (status === 'start') {
            updateModalUpdateBtn.textContent = 'Scaricamento in corso...';
        }
    });
}

// Run checks on load
window.addEventListener('DOMContentLoaded', async () => {
  setAuthenticated(false, null);
  await refreshAuthSession();
  checkForUpdates();
});
