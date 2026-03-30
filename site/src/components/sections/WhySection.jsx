/**
 * WhySection — sezione "Perché usarlo" della homepage.
 *
 * Mostra due card affiancate con:
 *  - "Problemi ricorrenti": i dolori degli utenti prima del prodotto
 *  - "Risultati attesi": i benefici concreti dopo l'adozione
 *
 * L'attributo data-reveal-seq sulle card attiva le animazioni in sequenza
 * (gestito dal sistema globale in App.jsx).
 */
import { LANDING_CONTENT } from "../../data/landingContent";

export default function WhySection() {
  return (
    <section id="perche" className="section shell section-anchor">
      {/* Intestazione della sezione */}
      <div className="section-head reveal-on-scroll">
        <h2>{LANDING_CONTENT.why.title}</h2>
        <p className="muted-note">{LANDING_CONTENT.why.intro}</p>
      </div>

      {/* Griglia a 2 colonne con problemi e risultati */}
      <div className="grid two detail-grid" data-reveal-seq>
        <article className="card reveal-on-scroll">
          <h3>Problemi ricorrenti</h3>
          <ul className="clean-list">
            {LANDING_CONTENT.why.pains.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="card reveal-on-scroll">
          <h3>Risultati attesi</h3>
          <ul className="clean-list">
            {LANDING_CONTENT.why.outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
