const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Abilita CORS per permettere richieste dal client (se necessario)
// L'app aggiornata
const appVersion = "0.0.9";

// Funzione per generare il link GitHub in base alla versione
function getGitHubDownloadUrl(version) {
    // Trasforma "0.0.9" in "0-0-9"
    const formattedVersion = version.replace(/\./g, '-');
    return `https://github.com/T3ox/FolderOrganizer/releases/download/Release/FolderOrganizer_v${formattedVersion}.zip`;
}

// Simulazione di una riga del database contenente la versione attuale e il link per il download
let appInfo = {
    version: appVersion,
    downloadUrl: getGitHubDownloadUrl(appVersion),
    checksum: "" // Checksum vuoto fa saltare la validazione al client
};

// Endpoint GET per recuperare la versione attuale
app.get('/api/version', (req, res) => {
    res.json(appInfo);
});

// Endpoint opzionale: POST per simulare un aggiornamento della versione nel "database"
app.post('/api/version', (req, res) => {
    const { version, downloadUrl } = req.body;
    
    if (version && downloadUrl) {
        appInfo = { version, downloadUrl };
        res.status(200).json({ message: "Versione aggiornata con successo", current: appInfo });
    } else {
        res.status(400).json({ error: "I campi 'version' e 'downloadUrl' sono obbligatori." });
    }
});

app.listen(PORT, () => {
    console.log(`Backend Node.js in esecuzione sulla porta HTTP ${PORT}`);
    console.log(`Puoi testare l'endpoint con: GET http://localhost:${PORT}/api/version`);
});
