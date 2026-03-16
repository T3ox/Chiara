/**
 * PillarsSection — carosello dei tre pilastri del prodotto: VEDI, CHIEDI, AGISCI.
 *
 * Struttura visiva:
 *  - Card laterale sinistra: pilastro precedente (versione ridotta)
 *  - Card centrale: pilastro attivo (versione espansa con dettagli)
 *  - Card laterale destra: pilastro successivo (versione ridotta)
 *
 * Navigazione:
 *  - Frecce sinistra/destra per scorrere i pilastri
 *  - Pallini (dot) cliccabili per saltare direttamente a un pilastro
 *
 * Lo stato activePillarIndex determina quale pilastro è in evidenza.
 */
import { useMemo, useState, useCallback } from "react";
import { LANDING_CONTENT } from "../../data/landingContent";
import PillarIcon from "../PillarIcon";
import SmartLink from "../SmartLink";

export default function PillarsSection() {
  // Indice del pilastro attualmente attivo (0=VEDI, 1=CHIEDI, 2=AGISCI)
  const [activePillarIndex, setActivePillarIndex] = useState(1);

  // Direzione dell'ultima transizione — determina da dove entrano le card animate
  const [direction, setDirection] = useState("next");

  const pillars = useMemo(() => LANDING_CONTENT.pillars.items, []);
  const totalPillars = pillars.length;

  // Pilastro attivo e quelli adiacenti (con wrap circolare)
  const activePillar = pillars[activePillarIndex];
  const prevPillar = pillars[(activePillarIndex - 1 + totalPillars) % totalPillars];
  const nextPillar = pillars[(activePillarIndex + 1) % totalPillars];

  // Naviga a un dato indice registrando la direzione per l'animazione di slide
  const goTo = useCallback((newIndex) => {
    setDirection(newIndex > activePillarIndex || (activePillarIndex === totalPillars - 1 && newIndex === 0) ? "next" : "prev");
    setActivePillarIndex(newIndex);
  }, [activePillarIndex, totalPillars]);

  return (
    <section className="section section-alt pillars-section">
      <div className="band-inner">
        {/* Intestazione */}
        <div className="section-head reveal-on-scroll pillars-head">
          <h2>{LANDING_CONTENT.pillars.title}</h2>
          <p className="muted-note">{LANDING_CONTENT.pillars.subtitle}</p>
        </div>

        {/* Controlli di navigazione: frecce e pallini */}
        <div className="pillars-nav reveal-on-scroll" aria-label="Navigazione pilastri">
          <button
            className="pillars-arrow"
            type="button"
            aria-label="Vai al pilastro precedente"
            onClick={() => goTo((activePillarIndex - 1 + totalPillars) % totalPillars)}
          >
            &lt;
          </button>

          <div className="pillars-dots" role="tablist" aria-label="Seleziona pilastro">
            {pillars.map((pillar, index) => (
              <button
                key={pillar.key}
                className={`pillars-dot${index === activePillarIndex ? " is-active" : ""}`}
                type="button"
                role="tab"
                aria-selected={index === activePillarIndex}
                aria-label={`Vai a ${pillar.name}`}
                onClick={() => goTo(index)}
              />
            ))}
          </div>

          <button
            className="pillars-arrow"
            type="button"
            aria-label="Vai al pilastro successivo"
            onClick={() => goTo((activePillarIndex + 1) % totalPillars)}
          >
            &gt;
          </button>
        </div>

        {/* Griglia a 3 colonne: precedente | attivo | successivo */}
        <div className="pillars-grid" data-reveal-seq>
          {/* Card laterale sinistra — pilastro precedente; key forza rimount per rieseguire l'animazione */}
          <article key={`prev-${activePillarIndex}`} className="card pillar-card pillar-card--side pillar-card--anim-side">
            <PillarIcon type={prevPillar.key} />
            <h3>{prevPillar.name}</h3>
            <p className="pillar-tagline">{prevPillar.tagline}</p>
            <p className="muted-note">{prevPillar.summary}</p>
            <SmartLink className="pillars-link" href={prevPillar.ctaHref}>{prevPillar.cta}</SmartLink>
          </article>

          {/* Card centrale — pilastro attivo; data-dir indica da dove scivola dentro */}
          <article key={`main-${activePillarIndex}`} className="card pillar-card pillar-card--main" data-dir={direction} aria-live="polite">
            <PillarIcon type={activePillar.key} />
            <h3>{activePillar.name}</h3>
            <p className="pillar-tagline">{activePillar.tagline}</p>
            <div className="pillar-details">
              {activePillar.details.map((detail) => (
                <div key={detail.title}>
                  <h4>{detail.title}</h4>
                  <p>{detail.body}</p>
                </div>
              ))}
            </div>
          </article>

          {/* Card laterale destra — pilastro successivo; key forza rimount per rieseguire l'animazione */}
          <article key={`next-${activePillarIndex}`} className="card pillar-card pillar-card--side pillar-card--anim-side">
            <PillarIcon type={nextPillar.key} />
            <h3>{nextPillar.name}</h3>
            <p className="pillar-tagline">{nextPillar.tagline}</p>
            <p className="muted-note">{nextPillar.summary}</p>
            <SmartLink className="pillars-link" href={nextPillar.ctaHref}>{nextPillar.cta}</SmartLink>
          </article>
        </div>
      </div>
    </section>
  );
}
