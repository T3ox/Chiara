/**
 * ChangelogPage — storico delle release e aggiornamenti.
 *
 * Mostra tutte le versioni rilasciate con date, tipo di release
 * e lista dettagliata delle modifiche per ogni versione.
 */
import { Link } from "react-router-dom";
import { siteConfig } from "../data/siteConfig";

const RELEASES_URL = "https://github.com/T3ox/Chiara/releases/tag/Release";

const CHANGELOG = [
  {
    version: "0.0.9",
    date: "23 marzo 2026",
    type: "Release iniziale",
    summary: "Prima release pubblica con supporto completo per l'analisi AI di documenti e immagini.",
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

function ReleaseTypeIcon({ type }) {
  if (type.toLowerCase().includes("fix")) return <span className="release-icon release-icon--fix" aria-hidden="true">&#9670;</span>;
  if (type.toLowerCase().includes("feature")) return <span className="release-icon release-icon--feature" aria-hidden="true">&#9679;</span>;
  return <span className="release-icon release-icon--release" aria-hidden="true">&#9679;</span>;
}

export default function ChangelogPage() {
  return (
    <>
      <section className="section shell pricing-hero">
        <h1>Changelog</h1>
        <p className="lead">
          Tutte le versioni di {siteConfig.brandName} AI con dettaglio delle modifiche,
          nuove funzionalità e correzioni. Aggiornato ad ogni release.
        </p>
      </section>

      <section className="section shell">
        <div className="changelog-list">
          {CHANGELOG.map((release) => (
            <article className="card changelog-entry" key={release.version}>
              <div className="changelog-header">
                <div className="changelog-version-row">
                  <ReleaseTypeIcon type={release.type} />
                  <h2 className="changelog-version">v{release.version}</h2>
                  <span className="badge">{release.type}</span>
                </div>
                <time className="changelog-date">{release.date}</time>
              </div>

              {release.summary && (
                <p className="changelog-summary">{release.summary}</p>
              )}

              <ul className="clean-list changelog-changes">
                {release.changes.map((change, i) => (
                  <li key={i}>{change}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="changelog-footer">
          <p className="muted-note">
            Lo storico completo delle release e disponibile su{" "}
            <a href={RELEASES_URL} target="_blank" rel="noreferrer">GitHub Releases</a>.
          </p>
        </div>
      </section>

      <section className="section shell">
        <div className="callout">
          <div>
            <h2>Vuoi provare l'ultima versione?</h2>
            <p>Scarica {siteConfig.brandName} AI per il tuo sistema operativo.</p>
          </div>
          <div className="hero-actions">
            <Link className="btn btn-solid" to="/download">Vai al download</Link>
            <Link className="btn btn-outline" to="/">Torna alla Home</Link>
          </div>
        </div>
      </section>
    </>
  );
}
