/**
 * BenefitsSection — sezione "Benefici operativi".
 *
 * Mostra 3 card (griglia a 3 colonne) con i benefici principali del prodotto.
 * I dati vengono costruiti combinando i KPI dell'hero con i risultati attesi
 * della sezione "why", prendendo i primi 3 elementi in totale.
 */
import { useMemo } from "react";
import { LANDING_CONTENT } from "../../data/landingContent";

export default function BenefitsSection() {
  // Combina KPI dell'hero e outcome della sezione "perché" — prende i primi 3
  const featureItems = useMemo(() => {
    const kpis = LANDING_CONTENT.hero.kpis.map((kpi) => ({
      title: kpi.title,
      text: kpi.text,
    }));
    const outcomes = LANDING_CONTENT.why.outcomes.map((text, index) => ({
      title: `Risultato ${index + 1}`,
      text,
    }));
    return [...kpis, ...outcomes].slice(0, 3);
  }, []);

  return (
    <section className="section shell">
      {/* Intestazione */}
      <div className="section-head reveal-on-scroll">
        <h2>Benefici operativi</h2>
        <p className="muted-note">Valore misurabile e standard replicabile tra team.</p>
      </div>

      {/* Griglia 3 card con hover animato */}
      <div className="grid three" data-reveal-seq>
        {featureItems.map((item) => (
          <article
            className="card tilt-card reveal-on-scroll hover-lift"
            key={`feature-${item.title}`}
          >
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
