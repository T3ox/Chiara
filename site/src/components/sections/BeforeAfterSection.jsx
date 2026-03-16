/**
 * BeforeAfterSection — sezione "Use case + impatto reale".
 *
 * Contiene due card affiancate:
 *  1. Card "Use case": lista dei casi d'uso pratici del prodotto
 *  2. Card "Prima/Dopo": simulatore di file browser interattivo
 *     - Stato "Prima": lista piatta di file con nomi caotici
 *     - Stato "Dopo": stessa lista organizzata in cartelle espandibili
 *
 * L'utente può cliccare i pulsanti "Prima" / "Dopo" per vedere la differenza.
 * Le cartelle nello stato "Dopo" possono essere aperte/chiuse.
 */
import { useMemo, useState } from "react";
import { LANDING_CONTENT } from "../../data/landingContent";
import { getExtension, getIconPath, getTypeLabel } from "../../utils/fileUtils";

export default function BeforeAfterSection() {
  // Controlla se mostrare la vista "prima" (false) o "dopo" (true)
  const [isAfterState, setIsAfterState] = useState(false);

  // Stato di apertura di ogni cartella nella vista "dopo" — { percorsoCartella: boolean }
  const [openFolders, setOpenFolders] = useState({});

  // Raggruppa i file della vista "dopo" per cartella di destinazione
  const groupedAfter = useMemo(() => {
    const grouped = new Map();

    LANDING_CONTENT.why.examples.after.forEach((fullName) => {
      const parts = fullName.split("/").filter(Boolean);
      const fileName = parts.pop() || fullName;
      const folderPath = parts.join("/") || "Cartella destinazione";

      if (!grouped.has(folderPath)) grouped.set(folderPath, []);
      grouped.get(folderPath).push(fileName);
    });

    return Array.from(grouped.entries());
  }, []);

  // Apre o chiude una cartella nella vista "dopo"
  const toggleFolder = (folderPath) => {
    setOpenFolders((prev) => ({ ...prev, [folderPath]: !prev[folderPath] }));
  };

  return (
    <section className="section section-alt">
      <div className="band-inner">
        {/* Intestazione */}
        <div className="section-head reveal-on-scroll">
          <h2>Use case + impatto reale</h2>
          <p className="muted-note">Dalla teoria alla cartella operativa: prima e dopo.</p>
        </div>

        <div className="why-main-stack">
          {/* Card 1: casi d'uso */}
          <article className="card reveal-on-scroll hover-lift use-case-card">
            <h3>Use case</h3>
            <ul className="clean-list">
              {LANDING_CONTENT.why.useCases.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          {/* Card 2: simulatore prima/dopo */}
          <article className="card reveal-on-scroll hover-lift before-after-card">
            {/* Controllo toggle Prima / Dopo */}
            <div className="before-after-head">
              <div className="before-after-controls">
                <div
                  className={`before-after-toggle${isAfterState ? " is-after" : ""}`}
                  role="tablist"
                  aria-label="Stato confronto prima dopo"
                >
                  <button
                    className="before-after-toggle-option"
                    type="button"
                    role="tab"
                    aria-selected={!isAfterState}
                    aria-controls="compare-stage"
                    onClick={() => setIsAfterState(false)}
                  >
                    Prima
                  </button>
                  <button
                    className="before-after-toggle-option"
                    type="button"
                    role="tab"
                    aria-selected={isAfterState}
                    aria-controls="compare-stage"
                    onClick={() => setIsAfterState(true)}
                  >
                    Dopo
                  </button>
                </div>
              </div>
            </div>

            {/* Finestra del file browser simulato */}
            <div className="folder-sim-grid">
              <div
                id="morph-window"
                className="folder-window morph-window before-window"
                aria-live="polite"
                aria-label="Simulazione organizzazione cartella"
              >
                {/* Barra superiore stile Windows */}
                <div className="folder-window-top">
                  <div className="window-actions">
                    <span className="folder-dot"></span>
                    <span className="folder-dot"></span>
                    <span className="folder-dot"></span>
                  </div>
                  <strong>Esplora file - Confronto organizzazione</strong>
                </div>

                {/* Barra del percorso */}
                <div className="folder-pathbar">
                  <span className="path-chip">Questo PC</span>
                  <span className="path-sep">&gt;</span>
                  <span className="path-chip">Cartella sorgente</span>
                  <span className="path-sep">&gt;</span>
                  <span className="path-chip active">Output ordinato</span>
                </div>

                {/* Intestazione colonne della lista file */}
                <ul className="explorer-head" aria-hidden="true">
                  <li>Nome</li>
                  <li>Data modifica</li>
                  <li>Tipo</li>
                  <li>Dimensione</li>
                </ul>

                {/* Area che mostra "prima" o "dopo" in base allo stato */}
                <div
                  id="compare-stage"
                  className={`morph-stage compare-stage${isAfterState ? " is-after" : ""}`}
                >
                  {/* Vista PRIMA: file piatti disorganizzati */}
                  <div className="compare-layer layer-before">
                    <ul className="file-list explorer-list">
                      {LANDING_CONTENT.why.examples.before.map((fileName, index) => {
                        const ext = getExtension(fileName);
                        const type = getTypeLabel(ext);
                        const day = String(10 + (index % 16)).padStart(2, "0");
                        const sizeKb = 120 + fileName.length * 7 + index * 23;
                        const iconPath = getIconPath(ext);

                        return (
                          <li className="explorer-row" key={`before-${fileName}`}>
                            <div className="explorer-cell name-cell">
                              <img className="file-type-icon" src={iconPath} alt="" loading="lazy" decoding="async" />
                              <code title={fileName}>{fileName}</code>
                            </div>
                            <div className="explorer-cell muted-col">2025-02-{day}</div>
                            <div className="explorer-cell muted-col">{type}</div>
                            <div className="explorer-cell muted-col size-col">{sizeKb} KB</div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Vista DOPO: file raggruppati in cartelle espandibili */}
                  <div className="compare-layer layer-after">
                    <ul className="file-list explorer-list after-folder-list">
                      {groupedAfter.map(([folderPath, files], folderIndex) => {
                        const folderDay = String(10 + ((folderIndex + 1) % 16)).padStart(2, "0");
                        const isOpen = !!openFolders[folderPath];

                        return (
                          <li
                            className={`folder-group${isOpen ? " is-open" : ""}`}
                            key={`folder-${folderPath}`}
                          >
                            {/* Riga cartella: cliccabile per espandere/collassare */}
                            <button
                              className="explorer-row explorer-folder-row folder-toggle"
                              type="button"
                              data-folder-toggle
                              aria-expanded={isOpen}
                              onClick={() => toggleFolder(folderPath)}
                            >
                              <div className="explorer-cell name-cell">
                                <span className="folder-chevron" aria-hidden="true">▸</span>
                                <img className="file-type-icon" src="/img/file-icons/folder.svg" alt="" loading="lazy" decoding="async" />
                                <code title={folderPath}>{folderPath}</code>
                              </div>
                              <div className="explorer-cell muted-col">2025-02-{folderDay}</div>
                              <div className="explorer-cell muted-col">Cartella</div>
                              <div className="explorer-cell muted-col size-col">
                                {files.length} {files.length === 1 ? "elemento" : "elementi"}
                              </div>
                            </button>

                            {/* File figli della cartella */}
                            <ul className="folder-children">
                              {files.map((fileName, fileIndex) => {
                                const ext = getExtension(fileName);
                                const type = getTypeLabel(ext);
                                const day = String(10 + ((folderIndex + fileIndex + 2) % 16)).padStart(2, "0");
                                const sizeKb = 120 + fileName.length * 7 + fileIndex * 23;
                                const iconPath = getIconPath(ext);

                                return (
                                  <li
                                    className="explorer-row explorer-row-child"
                                    key={`after-${folderPath}-${fileName}`}
                                  >
                                    <div className="explorer-cell name-cell">
                                      <span className="row-indent" aria-hidden="true"></span>
                                      <img className="file-type-icon" src={iconPath} alt="" loading="lazy" decoding="async" />
                                      <code title={fileName}>{fileName}</code>
                                    </div>
                                    <div className="explorer-cell muted-col">2025-02-{day}</div>
                                    <div className="explorer-cell muted-col">{type}</div>
                                    <div className="explorer-cell muted-col size-col">{sizeKb} KB</div>
                                  </li>
                                );
                              })}
                            </ul>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
