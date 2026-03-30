/**
 * ComparisonSection — tabella di confronto tra soluzioni tradizionali e questo prodotto.
 *
 * Mostra una tabella scrollabile con le feature chiave e un confronto
 * tra "Organizer tradizionali (regole statiche)" e "Questo prodotto (AI sul contenuto)".
 *
 * La riga "Gestione duplicati" ha un comportamento speciale: usa getDedupeView()
 * per mostrare il badge "In arrivo" se la funzionalità è in sviluppo.
 */
import { useMemo } from "react";
import { LANDING_CONTENT } from "../../data/landingContent";
import { getDedupeView } from "../../utils/fileUtils";

export default function ComparisonSection() {
  // Calcola la riga duplicati una sola volta in base allo stato configurato
  const dedupe = useMemo(() => getDedupeView(LANDING_CONTENT.settings.DEDUPE_STATUS), []);

  return (
    <section id="confronto" className="section shell section-anchor">
      {/* Intestazione */}
      <div className="section-head reveal-on-scroll">
        <h2>{LANDING_CONTENT.comparison.title}</h2>
        <p className="muted-note">{LANDING_CONTENT.comparison.subtitle}</p>
      </div>

      <div className="compact-details reveal-on-scroll">
        <div className="compact-details-title">Confronto completo</div>
        <div className="details-body">
          <p className="muted-note comparison-guide">{LANDING_CONTENT.comparison.readingGuide}</p>

          {/* Tabella scrollabile su mobile */}
          <div className="comparison-wrap" role="region" aria-label="Tabella confronto" tabIndex="0">
            <table className="comparison-table">
              <thead>
                <tr>
                  {LANDING_CONTENT.comparison.columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LANDING_CONTENT.comparison.rows.map((row) => {
                  // Riga speciale per i duplicati con badge dinamico
                  if (row.key === "dedupe") {
                    return (
                      <tr key={row.feature}>
                        <td>
                          Gestione duplicati{" "}
                          {dedupe.planned ? (
                            <span className="badge planned-badge">In arrivo</span>
                          ) : null}
                        </td>
                        <td>{dedupe.traditional}</td>
                        <td>
                          {dedupe.product === "✔" ? (
                            <span className="ok">✔</span>
                          ) : (
                            dedupe.product
                          )}
                        </td>
                      </tr>
                    );
                  }

                  // Riga standard
                  return (
                    <tr key={row.feature}>
                      <td>{row.feature}</td>
                      <td>{row.traditional}</td>
                      <td>{row.product}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
