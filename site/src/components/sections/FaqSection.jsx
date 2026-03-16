/**
 * FaqSection — sezione FAQ con accordion a griglia 2 colonne.
 *
 * Layout: griglia 2×3 di card indipendenti (su desktop).
 * Ogni card mostra la domanda come pulsante con chevron e
 * la risposta si espande/contrae al click.
 * Una sola risposta aperta alla volta.
 */
import { useState } from "react";
import { LANDING_CONTENT } from "../../data/landingContent";

export default function FaqSection() {
  // Indice della domanda aperta nell'accordion (-1 = nessuna)
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);

  const items = LANDING_CONTENT.faq.items;

  return (
    <section id="faq" className="section shell section-anchor">
      {/* Intestazione */}
      <div className="section-head reveal-on-scroll">
        <h2>{LANDING_CONTENT.faq.title}</h2>
        <p className="muted-note">{LANDING_CONTENT.faq.subtitle}</p>
      </div>

      {/* Griglia 2 colonne di card FAQ */}
      <div className="faq-grid reveal-on-scroll">
        {items.map((item, index) => {
          const isOpen = openFaqIndex === index;
          const panelId = `faq-panel-${index}`;

          return (
            <div key={item.q} className={`faq-card${isOpen ? " is-open" : ""}`}>
              {/* Pulsante domanda con chevron */}
              <button
                className="faq-card-q"
                aria-expanded={isOpen}
                aria-controls={panelId}
                id={`faq-trigger-${index}`}
                onClick={() => setOpenFaqIndex((prev) => (prev === index ? -1 : index))}
              >
                <span>{item.q}</span>
                {/* Chevron ruota a 180° quando la card è aperta */}
                <svg
                  className="faq-chevron"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Pannello risposta — si espande tramite max-height */}
              <div
                className="faq-card-a"
                id={panelId}
                role="region"
                aria-labelledby={`faq-trigger-${index}`}
                style={{ maxHeight: isOpen ? "600px" : "0px" }}
              >
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
