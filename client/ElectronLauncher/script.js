const dropzone = document.getElementById('dropzone');
const selectedPath = document.getElementById('selectedPath');
const status = document.getElementById('status');
const confirmBtn = document.getElementById('confirmBtn');
const folderPicker = document.getElementById('folderPicker');

let selectedFiles = [];

function setStatus(msg) {
  status.textContent = msg || '';
}

function setSelection(files) {
  selectedFiles = Array.from(files || []);
  if (selectedFiles.length === 0) {
    selectedPath.textContent = 'Nessuna cartella selezionata';
    confirmBtn.disabled = true;
    return;
  }

  // In browser non hai un "path" vero. Mostro un riassunto.
  // Con webkitdirectory hai webkitRelativePath (tipo "Cartella/file.txt").
  const rel = selectedFiles[0].webkitRelativePath || selectedFiles[0].name;
  const folderName = rel.includes('/') ? rel.split('/')[0] : rel;

  selectedPath.textContent = `Selezionato: ${folderName} (${selectedFiles.length} file)`;
  confirmBtn.disabled = false;
  setStatus('');
}

// Drag over/leave
dropzone.addEventListener('dragover', (e) => {
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
  e.preventDefault();
  dropzone.classList.remove('dragover');

  // Nota: spesso il drop di cartelle richiede DataTransferItem / webkitGetAsEntry (non standard)
  // Qui gestiamo almeno file drop semplici
  const files = e.dataTransfer?.files;
  if (!files || files.length === 0) {
    setStatus('Niente da selezionare (il browser potrebbe bloccare le cartelle trascinate).');
    return;
  }
  setSelection(files);
});

// Folder picker (consigliato)
folderPicker.addEventListener('change', (e) => {
  setSelection(e.target.files);
});

// Cliccare sulla dropzone per aprire il selettore file
dropzone.addEventListener('click', () => {
  folderPicker.click();
});

confirmBtn.addEventListener('click', () => {
  if (selectedFiles.length === 0) return;
  setStatus(`Confermato (${selectedFiles.length} file). Qui chiameresti la tua logica.`);
  // Qui metti la logica equivalente a ConfirmButton_Click
  // es: upload, chiamata API, ecc.
});

// --- Update Checker Logic --- //
const currentVersion = "0.0.0";
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

    updateModalUpdateBtn.addEventListener('click', () => {
      if (downloadUrlToOpen) {
        if (window.electronAPI && window.electronAPI.downloadUpdate) {
            // Disable buttons and update text
            updateModalUpdateBtn.disabled = true;
            updateModalIgnoreBtn.disabled = true;
            updateModalUpdateBtn.textContent = 'Scaricamento in corso...';
            
            // Send IPC message to start download
            window.electronAPI.downloadUpdate(downloadUrlToOpen);
        } else {
            // Fallback for browsers
            window.open(downloadUrlToOpen, '_blank');
            updateModal.classList.add('hidden');
        }
      } else {
        updateModal.classList.add('hidden');
      }
    });

    // Listen for download status updates
    if (window.electronAPI && window.electronAPI.onDownloadStatus) {
        window.electronAPI.onDownloadStatus((status, message) => {
            if (status === 'done') {
                updateModalUpdateBtn.textContent = 'Scaricato! Estrarre il file.';
                setTimeout(() => {
                    updateModal.classList.add('hidden');
                    // Reset modal for future use
                    updateModalUpdateBtn.disabled = false;
                    updateModalIgnoreBtn.disabled = false;
                    updateModalUpdateBtn.textContent = 'Aggiorna';
                }, 3000);
            } else if (status === 'error') {
                console.error(message);
                updateModalUpdateBtn.textContent = 'Errore Download';
                updateModalUpdateBtn.disabled = false;
                updateModalIgnoreBtn.disabled = false;
            } else {
                updateModalUpdateBtn.textContent = message; // status: 'start' or 'progress'
            }
        });
    }

    // Run check on load
    window.addEventListener('DOMContentLoaded', checkForUpdates);