/**
 * DemoPage — pagina di richiesta demo.
 *
 * Spiega cosa include la sessione demo, il formato e offre
 * un pulsante mailto per prenotare una call.
 */
import { Link } from "react-router-dom";
import { LANDING_CONTENT } from "../data/landingContent";

export default function DemoPage() {
  return (
    <>
      <section className="section shell pricing-hero">
        <h1>Demo</h1>
        <p className="lead">{LANDING_CONTENT.demo.body}</p>
      </section>

      <section className="section shell">
        <div className="grid two">
          <article className="card">
            <h2>Cosa include la demo</h2>
            <ul className="clean-list demo-list">
              {LANDING_CONTENT.demo.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="card">
            <h2>Formato della sessione</h2>
            <ul className="clean-list">
              <li>Sessione guidata con cartella campione o materiale condiviso.</li>
              <li>Analisi dei casi reali e regole di naming più adatte al tuo team.</li>
              <li>Consegna di un riepilogo con prossimi passi consigliati.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section shell">
        <div className="callout">
          <div>
            <h2>Prenota una call demo</h2>
            <p>Una sessione breve per capire se FolderOrganizer AI si adatta al tuo flusso di lavoro.</p>
            <span className="badge">Demo in arrivo</span>
          </div>
          <div className="hero-actions">
            <a className="btn btn-solid" href={LANDING_CONTENT.demo.cta.href}>{LANDING_CONTENT.demo.cta.label}</a>
            <Link className="btn btn-outline" to="/prezzi">Vedi prezzi</Link>
          </div>
        </div>
      </section>
    </>
  );
}
