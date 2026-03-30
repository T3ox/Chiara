/**
 * HowItWorksSection — sezione "Come funziona" con progress indicator + spotlight.
 *
 * Struttura:
 *  - Progress indicator (how-progress): cerchi numerati collegati da una linea,
 *    pattern classico e immediatamente comprensibile come sequenza di passi.
 *    Gli step già visitati mostrano il cerchio pieno, quello attivo è evidenziato.
 *  - Pannello spotlight (how-spotlight): numero decorativo grande in teal
 *    semitrasparente a sinistra, titolo e descrizione a destra.
 *    Entra con animazione di slide in base alla direzione di navigazione.
 *  - Riga rassicurante (how-reassurances): privacy, anteprima, log.
 */
import { Fragment, useMemo, useState, useCallback } from "react";
import { LANDING_CONTENT } from "../../data/landingContent";

export default function HowItWorksSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("next");

  const steps = useMemo(() => LANDING_CONTENT.how.steps, []);

  // Naviga a uno step registrando la direzione per l'animazione di slide
  const goTo = useCallback((newIndex) => {
    setDirection(newIndex > activeIndex ? "next" : "prev");
    setActiveIndex(newIndex);
  }, [activeIndex]);

  const step = steps[activeIndex];

  return (
    <section id="come-funziona" className="section shell section-divider section-anchor">
      {/* Intestazione */}
      <div className="section-head reveal-on-scroll">
        <h2>{LANDING_CONTENT.how.title}</h2>
        <p className="muted-note">{LANDING_CONTENT.how.subtitle}</p>
      </div>

      {/* Progress indicator — cerchi + linee di connessione */}
      <div className="how-progress reveal-on-scroll" role="tablist" aria-label="Step del processo">
        {steps.map((s, index) => (
          <Fragment key={s.title}>
            {/* Cerchio numerato cliccabile */}
            <button
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-controls="how-spotlight"
              className={[
                "how-progress-step",
                index === activeIndex ? "is-active" : "",
                index < activeIndex  ? "is-done"   : "",
              ].filter(Boolean).join(" ")}
              onClick={() => goTo(index)}
            >
              <span className="how-progress-circle" aria-hidden="true">
                {/* Segno di spunta per gli step già visti */}
                {index < activeIndex ? (
                  <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  index + 1
                )}
              </span>
              <span className="how-progress-label">{s.title}</span>
            </button>

            {/* Linea di connessione tra i cerchi (non dopo l'ultimo) */}
            {index < steps.length - 1 && (
              <div
                className={`how-progress-line${index < activeIndex ? " is-done" : ""}`}
                aria-hidden="true"
              />
            )}
          </Fragment>
        ))}
      </div>

      {/* Pannello spotlight — key forza rimount per riavviare l'animazione CSS */}
      <div
        key={activeIndex}
        id="how-spotlight"
        className="how-spotlight"
        role="tabpanel"
        aria-live="polite"
        data-dir={direction}
      >
        {/* Numero decorativo: teal semitrasparente, non letto dallo screen reader */}
        <div className="how-spotlight-num" aria-hidden="true">
          {String(activeIndex + 1).padStart(2, "0")}
        </div>

        <div className="how-spotlight-body">
          <h3>{step.title}</h3>
          <p>{step.longDetail ?? step.detail}</p>
        </div>
      </div>

      {/* Tre punti rassicuranti: privacy, anteprima, log */}
      <div className="how-reassurances reveal-on-scroll">
        {LANDING_CONTENT.how.reassurances.map((item) => (
          <div key={item.label} className="how-reassurance">
            <strong>{item.label}</strong>
            <span>{item.note}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
