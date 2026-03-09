const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Abilita CORS per permettere richieste dal client (se necessario)
app.use(cors());
app.use(express.json());

// Simulazione di una riga del database contenente la versione attuale e il link per il download
let appInfo = {
    version: "0.0.1",
    downloadUrl: "https://github.com/T3ox/Chiara/releases/download/v0.0.1/FolderOrganizer.Launcher-0.0.1-mac.zip",
    checksum: "", // Checksum vuoto fa saltare la validazione al client
    releaseNotes: "- Aggiunta la funzione di check updates.\n- Miglioramenti vari alla UI tra cui una nuova modale per riassumere le novità."
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
