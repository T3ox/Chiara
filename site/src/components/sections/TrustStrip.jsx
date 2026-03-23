/**
 * TrustStrip — barra animata con i formati di file supportati dal prodotto.
 *
 * Mostra un carosello a scorrimento automatico (marquee CSS) con icone e nomi
 * dei formati: Immagini, PDF, Word, Excel, Outlook, PowerPoint.
 *
 * I dati vengono replicati 4 volte nell'array per creare l'effetto loop continuo.
 */
import { useMemo } from "react";
import { LANDING_CONTENT } from "../../data/landingContent";

export default function TrustStrip() {
  // Replica l'array 4 volte per creare il loop visivo del carosello
  const toolsMarquee = useMemo(
    () => Array.from({ length: 4 }, () => LANDING_CONTENT.tools.items).flat(),
    []
  );

  return (
    <section className="band band-tools" aria-label="Formati supportati">
      {/* Intestazione della sezione */}
      <div className="band-inner tools-head reveal-on-scroll">
        <h2>{LANDING_CONTENT.tools.title}</h2>
        <p className="muted-note">{LANDING_CONTENT.tools.subtitle}</p>
      </div>

      {/* Carosello a scorrimento automatico (animazione CSS) */}
      <div className="tools-frame">
        <div className="tools-carousel" role="region" aria-label="Carosello formati">
          <div className="tools-track" role="list">
            {toolsMarquee.map((item, index) => (
              <div className="tool-card" role="listitem" key={`${item.label}-${index}`}>
                <img src={item.icon} alt="" loading="lazy" decoding="async" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
