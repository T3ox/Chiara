/**
 * DownloadPage.jsx — Pagina di download del software .NET.
 *
 * Sezioni:
 *  1. Hero con versione corrente e pulsante download diretto
 *  2. Requisiti di sistema
 *  3. Istruzioni di installazione
 *  4. Checksum / verifica integrità
 *  5. Changelog / Release notes
 *  6. Nota accesso riservato agli utenti paganti
 */
import { Link } from "react-router-dom";
import { siteConfig } from "../data/siteConfig";

const CURRENT_RELEASE = {
  version: "0.0.9",
  date: "2026-03-23",
  fileName: "FolderOrganizer_v0-0-9.zip",
  downloadUrl:
    "https://github.com/T3ox/Chiara/releases/download/Release/FolderOrganizer_v0-0-9.zip",
  releasesUrl: "https://github.com/T3ox/Chiara/releases/tag/Release",
  size: "~15 MB",
  sha256: "Disponibile nella pagina della release su GitHub",
};

const REQUIREMENTS = [
  {
    label: ".NET Runtime 8.0+",
    detail:
      "Necessario per l'esecuzione dell'applicazione. Se non presente, il programma ti guiderà nell'installazione al primo avvio.",
  },
  {
    label: "Python 3.10+",
    detail:
      "Richiesto dal modulo di analisi AI. Deve essere accessibile da riga di comando (aggiunto al PATH di sistema).",
  },
  {
    label: "Windows 10 / 11",
    detail:
      "Il software è attualmente disponibile solo per sistemi operativi Windows a 64 bit.",
  },
  {
    label: "Connessione internet",
    detail:
      "Necessaria per le chiamate API a OpenAI durante l'analisi dei file. Non richiesta per le operazioni offline (rinomina, spostamento).",
  },
  {
    label: "Chiave API OpenAI",
    detail:
      "Richiesta per l'analisi AI del contenuto dei file. Configurabile al primo avvio dell'applicazione.",
  },
  {
    label: "Permessi di lettura/scrittura",
    detail:
      "L'applicazione necessita di accesso in lettura e scrittura sulle cartelle che si desidera organizzare.",
  },
];

const INSTALL_STEPS = [
  "Scarica il file ZIP dal pulsante qui sopra.",
  "Estrai il contenuto in una cartella a tua scelta (es. C:\\Program Files\\FolderOrganizer).",
  "Avvia FolderOrganizer.exe — al primo avvio ti verrà chiesto di configurare la chiave API OpenAI.",
  "Se il .NET Runtime non è presente, il programma mostrerà un link diretto per scaricarlo.",
  "Seleziona la cartella da organizzare e segui il flusso guidato: analisi, anteprima, conferma.",
];

const CHANGELOG = [
  {
    version: "0.0.9",
    date: "23 marzo 2026",
    type: "Release iniziale",
    changes: [
      "Analisi AI del contenuto di file PDF, immagini e documenti Office",
      "Proposta automatica di rinomina e riorganizzazione in cartelle",
      "Modalità anteprima con conferma esplicita prima di ogni modifica",
      "Log completo delle operazioni eseguite",
      "Supporto formati: JPG, PNG, PDF, DOCX, XLSX, PPTX, MSG",
    ],
  },
];

export default function DownloadPage() {
  return (
    <>
      {/* Hero download */}
      <section className="section shell pricing-hero">
        <h1>Download</h1>
        <p className="lead">
          Scarica {siteConfig.brandName} AI per Windows e inizia a organizzare
          i tuoi file con l'aiuto dell'intelligenza artificiale.
        </p>
      </section>

      {/* Card download principale */}
      <section className="section shell">
        <div className="download-hero-card card">
          <div className="download-hero-info">
            <div className="download-version-row">
              <span className="badge">Ultima versione</span>
              <span className="download-version">v{CURRENT_RELEASE.version}</span>
            </div>
            <h2>{siteConfig.brandName} AI per Windows</h2>
            <ul className="download-meta">
              <li><strong>File:</strong> {CURRENT_RELEASE.fileName}</li>
              <li><strong>Dimensione:</strong> {CURRENT_RELEASE.size}</li>
              <li><strong>Data rilascio:</strong> {CURRENT_RELEASE.date}</li>
              <li><strong>Piattaforma:</strong> Windows 10 / 11 (x64)</li>
            </ul>
          </div>
          <div className="download-hero-actions">
            <a
              className="btn btn-solid download-btn"
              href={CURRENT_RELEASE.downloadUrl}
              download
            >
              Scarica ZIP
            </a>
            <a
              className="btn btn-outline"
              href={CURRENT_RELEASE.releasesUrl}
              target="_blank"
              rel="noreferrer"
            >
              Vedi su GitHub
            </a>
          </div>
        </div>

        <div className="download-access-note callout-card card">
          <p>
            Il download è riservato agli utenti che hanno sottoscritto un piano attivo.
            Se non hai ancora un account,{" "}
            <Link to="/prezzi">consulta i piani disponibili</Link> oppure{" "}
            <Link to="/demo">richiedi una demo</Link> per valutare il prodotto.
          </p>
        </div>
      </section>

      {/* Requisiti di sistema + Installazione */}
      <section className="section shell">
        <div className="grid two">
          <article className="card">
            <h2>Requisiti di sistema</h2>
            <div className="requirements-list">
              {REQUIREMENTS.map((req) => (
                <div key={req.label} className="requirement-item">
                  <strong>{req.label}</strong>
                  <span>{req.detail}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="card">
            <h2>Installazione</h2>
            <ol className="install-steps">
              {INSTALL_STEPS.map((step, i) => (
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

      {/* Checksum / Verifica integrità */}
      <section className="section shell">
        <article className="card">
          <h2>Verifica integrità del file</h2>
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
              <a href={CURRENT_RELEASE.releasesUrl} target="_blank" rel="noreferrer">
                Verifica sulla pagina release GitHub
              </a>
            </div>
          </div>
          <p className="checksum-howto">
            Su Windows, apri il Terminale nella cartella del file scaricato ed esegui:
          </p>
          <pre className="checksum-command">
            <code>certutil -hashfile {CURRENT_RELEASE.fileName} SHA256</code>
          </pre>
        </article>
      </section>

      {/* Release notes */}
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
            Lo storico completo delle release è disponibile su{" "}
            <a href={CURRENT_RELEASE.releasesUrl} target="_blank" rel="noreferrer">
              GitHub Releases
            </a>.
          </p>
        </article>
      </section>

      {/* CTA finale */}
      <section className="section shell">
        <div className="callout">
          <div>
            <h2>Serve aiuto con l'installazione?</h2>
            <p>
              Contattaci a{" "}
              <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> —
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
