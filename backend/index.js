const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Abilita CORS per permettere richieste dal client (se necessario)
app.use(cors());
app.use(express.json());

// Simulazione di una riga del database contenente la versione attuale e il link per il download
// Endpoint GET per recuperare la versione attuale
app.get('/api/version', (req, res) => {
    const platform = req.query.platform; // 'win32' o 'darwin'
    
    // Definiamo i link separati per le release
    const updates = {
        win32: "https://github.com/T3ox/FolderOrganizer/releases/download/v0.0.1/FolderOrganizer.Launcher-0.0.1-win.zip",
        darwin: "https://github.com/T3ox/FolderOrganizer/releases/download/v0.0.1/FolderOrganizer.Launcher-0.0.1-mac.zip"
    };

    res.json({
        version: "0.1.0",
        downloadUrl: updates[platform] || updates.win32, // fallback su windows
        checksum: "", 
        releaseNotes: "- Supporto multi-piattaforma per aggiornamenti automatici.\n- Installazione silenziosa su Windows.\n- Miglioramenti alla stabilità dell'estrazione."
    });
});

// Endpoint GET profilo utente
// TODO: sostituire i dati mock con quelli reali dal database
app.get('/api/user/profile', (req, res) => {
    res.json({
        name:    "Chiara Rossi",
        package: "Pro — 50 GB",
        gbUsed:  49.5,
        gbTotal: 50
    });
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
