/**
 * DownloadPage.jsx - Pagina di download del software.
 *
 * Supporta due piattaforme (Windows e macOS) con selezione tramite tab.
 * Rileva automaticamente il sistema operativo dell'utente e pre-seleziona
 * la piattaforma corrispondente.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../data/siteConfig";

const RELEASES_URL = "https://github.com/T3ox/Chiara/releases/tag/Release";

function WindowsIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M0 3.5l9.9-1.4v9.6H0V3.5zm11.1-1.6L24 0v11.7H11.1V1.9zM0 12.9h9.9v9.6L0 21.1v-8.2zm11.1 0H24V24l-12.9-1.8V12.9z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

const SHARED_REQUIREMENTS = [
  {
    label: "Connessione internet",
    detail:
      "Necessaria per le chiamate API a OpenAI durante l'analisi dei file. Non richiesta per le operazioni offline (rinomina, spostamento).",
  },
];

const PLATFORMS = {
  windows: {
    key: "windows",
    label: "Windows",
    icon: WindowsIcon,
    fileName: "FolderOrganizer_v0-0-9.zip",
    downloadUrl:
      "https://github.com/T3ox/Chiara/releases/download/Release/FolderOrganizer_v0-0-9.zip",
    size: "~15 MB",
    osLabel: "Windows 10 / 11 (x64)",
    requirements: [
      {
        label: "Python 3.10+",
        detail:
          "Richiesto dal modulo di analisi AI. Deve essere accessibile da riga di comando (aggiunto al PATH di sistema).",
      },
      {
        label: "Windows 10 / 11",
        detail: "Il software e disponibile per sistemi operativi Windows a 64 bit.",
      },
      ...SHARED_REQUIREMENTS,
      {
        label: "Permessi di lettura/scrittura",
        detail:
          "L'applicazione necessita di accesso in lettura e scrittura sulle cartelle che si desidera organizzare.",
      },
    ],
    installSteps: [
      "Scarica il file ZIP dal pulsante qui sopra.",
      "Estrai il contenuto in una cartella a tua scelta (es. C:\\Program Files\\FolderOrganizer).",
      "Avvia FolderOrganizer.exe.",
      "Seleziona la cartella da organizzare e segui il flusso guidato: analisi, anteprima, conferma.",
    ],
    checksumCmd: "certutil -hashfile FolderOrganizer_v0-0-9.zip SHA256",
    checksumHint: "Su Windows, apri il Terminale nella cartella del file scaricato ed esegui:",
  },
  mac: {
    key: "mac",
    label: "macOS",
    icon: AppleIcon,
    fileName: "FolderOrganizer_v0-0-9_mac.zip",
    downloadUrl:
      "https://github.com/T3ox/Chiara/releases/download/Release/FolderOrganizer_v0-0-9_mac.zip",
    size: "~15 MB",
    osLabel: "macOS 13 Ventura+ (Apple Silicon / Intel)",
    requirements: [
      {
        label: "Python 3.10+",
        detail:
          "Richiesto dal modulo di analisi AI. Preinstallato su macOS o installabile con brew install python.",
      },
      {
        label: "macOS 13 Ventura o successivo",
        detail:
          "Compatibile con Mac dotati di chip Apple Silicon (M1/M2/M3/M4) e processori Intel.",
      },
      ...SHARED_REQUIREMENTS,
      {
        label: "Permessi di lettura/scrittura",
        detail:
          "L'applicazione necessita di accesso alle cartelle tramite Impostazioni di Sistema > Privacy e Sicurezza > Accesso completo al disco.",
      },
    ],
    installSteps: [
      "Scarica il file ZIP dal pulsante qui sopra.",
      "Apri il file ZIP; macOS lo estrarra automaticamente nella cartella Download.",
      "Sposta FolderOrganizer nella cartella Applicazioni.",
      "Al primo avvio, macOS potrebbe mostrare un avviso di sicurezza: vai su Impostazioni di Sistema > Privacy e Sicurezza e clicca \"Apri comunque\".",
      "Apri l'app e seleziona la cartella da organizzare.",
    ],
    checksumCmd: "shasum -a 256 FolderOrganizer_v0-0-9_mac.zip",
    checksumHint: "Su macOS, apri il Terminale nella cartella del file scaricato ed esegui:",
  },
};

const CHANGELOG = [
  {
    version: "0.0.9",
    date: "23 marzo 2026",
    type: "Release iniziale",
    changes: [
      "Analisi AI del contenuto di file PDF, immagini e documenti Office",
      "Proposta automatica di rinomina e riorganizzazione in cartelle",
      "Modalita anteprima con conferma esplicita prima di ogni modifica",
      "Log completo delle operazioni eseguite",
      "Supporto formati: JPG, PNG, PDF, DOCX, XLSX, PPTX, MSG",
      "Disponibile per Windows e macOS",
    ],
  },
];

function detectOS() {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("mac")) return "mac";
  return "windows";
}

export default function DownloadPage() {
  const detectedOS = useMemo(() => detectOS(), []);
  const [selectedOS, setSelectedOS] = useState(detectedOS);
  const platform = PLATFORMS[selectedOS];

  return (
    <>
      <section className="section shell pricing-hero">
        <h1>Download</h1>
        <p className="lead">
          Scarica {siteConfig.brandName} AI e inizia a organizzare
          i tuoi file con l'aiuto dell'intelligenza artificiale.
        </p>
      </section>

      <section className="section shell">
        <div className="platform-selector" role="tablist" aria-label="Seleziona piattaforma">
          {Object.values(PLATFORMS).map((p) => (
            <button
              key={p.key}
              type="button"
              role="tab"
              aria-selected={selectedOS === p.key}
              className={`platform-tab${selectedOS === p.key ? " platform-tab--active" : ""}`}
              onClick={() => setSelectedOS(p.key)}
            >
              <span className="platform-tab-icon"><p.icon /></span>
              {p.label}
            </button>
          ))}
        </div>

        <div className="download-hero-card card">
          <div className="download-hero-info">
            <div className="download-version-row">
              <span className="badge">v0.0.9</span>
              <span className="download-platform-badge">{platform.label}</span>
            </div>
            <h2>{siteConfig.brandName} AI per {platform.label}</h2>
            <ul className="download-meta">
              <li><strong>File:</strong> {platform.fileName}</li>
              <li><strong>Dimensione:</strong> {platform.size}</li>
              <li><strong>Piattaforma:</strong> {platform.osLabel}</li>
              <li><strong>Data rilascio:</strong> 2026-03-23</li>
            </ul>
          </div>
          <div className="download-hero-actions">
            <a className="btn btn-solid download-btn" href={platform.downloadUrl} download>
              Scarica per {platform.label}
            </a>
            <a className="btn btn-outline" href={RELEASES_URL} target="_blank" rel="noreferrer">
              Vedi su GitHub
            </a>
          </div>
        </div>

        <div className="download-access-note callout-card card">
          <p>
            Il download e riservato agli utenti che hanno sottoscritto un piano attivo.
            Se non hai ancora un account,{" "}
            <Link to="/prezzi">consulta i piani disponibili</Link> oppure{" "}
            <Link to="/demo">richiedi una demo</Link> per valutare il prodotto.
          </p>
        </div>
      </section>

      <section className="section shell">
        <div className="grid two">
          <article className="card">
            <h2>Requisiti di sistema - {platform.label}</h2>
            <div className="requirements-list">
              {platform.requirements.map((req) => (
                <div key={req.label} className="requirement-item">
                  <strong>{req.label}</strong>
                  <span>{req.detail}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="card">
            <h2>Installazione - {platform.label}</h2>
            <ol className="install-steps">
              {platform.installSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            <div className="install-note">
              <strong>Consiglio:</strong> prima di organizzare una cartella di lavoro,
              esegui sempre un backup dei file originali.
              Le operazioni di rinomina sono irreversibili dopo la conferma.
            </div>
          </article>
        </div>
      </section>

      <section className="section shell">
        <article className="card">
          <h2>Verifica integrita del file</h2>
          <p>
            Per verificare che il file scaricato non sia stato alterato, confronta l'hash SHA-256
            con quello pubblicato nella pagina della release su GitHub.
          </p>
          <div className="checksum-box">
            <div className="checksum-row">
              <span className="checksum-label">Algoritmo</span>
              <span>SHA-256</span>
            </div>
            <div className="checksum-row">
              <span className="checksum-label">Hash</span>
              <a href={RELEASES_URL} target="_blank" rel="noreferrer">
                Verifica sulla pagina release GitHub
              </a>
            </div>
          </div>
          <p className="checksum-howto">
            {platform.checksumHint}
          </p>
          <pre className="checksum-command">
            <code>{platform.checksumCmd}</code>
          </pre>
        </article>
      </section>

      <section className="section shell">
        <article className="card">
          <h2>Release notes</h2>
          {CHANGELOG.map((release) => (
            <div key={release.version} className="release-entry">
              <div className="release-header">
                <span className="release-version">v{release.version}</span>
                <span className="badge">{release.type}</span>
                <span className="release-date">{release.date}</span>
              </div>
              <ul className="clean-list">
                {release.changes.map((change, i) => (
                  <li key={i}>{change}</li>
                ))}
              </ul>
            </div>
          ))}
          <p className="release-footer">
            Lo storico completo delle release e disponibile su{" "}
            <a href={RELEASES_URL} target="_blank" rel="noreferrer">
              GitHub Releases
            </a>.
          </p>
        </article>
      </section>

      <section className="section shell">
        <div className="callout">
          <div>
            <h2>Serve aiuto con l'installazione?</h2>
            <p>
              Contattaci a{" "}
              <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>;
              ti guidiamo nel setup passo dopo passo.
            </p>
          </div>
          <div className="hero-actions">
            <Link className="btn btn-solid" to="/demo">Richiedi demo</Link>
            <Link className="btn btn-outline" to="/">Torna alla Home</Link>
          </div>
        </div>
      </section>
    </>
  );
}
