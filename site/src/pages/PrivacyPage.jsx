import { Link } from "react-router-dom";

export default function PrivacyPage() {
  return (
    <>
      <section className="section shell">
        <h1>Privacy</h1>
        <p className="lead">Versione iniziale dell'informativa. Sara aggiornata con il testo legale definitivo.</p>
      </section>

      <section className="section shell">
        <div className="grid two">
          <article className="card">
            <h2>Principi operativi</h2>
            <ul className="clean-list">
              <li>Raccolta dati limitata alle finalita dichiarate.</li>
              <li>Trattamento orientato a sicurezza e minimizzazione.</li>
              <li>Gestione accessi coerente con ruoli e responsabilita.</li>
              <li>Conservazione dati solo per il tempo necessario.</li>
            </ul>
          </article>
          <article className="card">
            <h2>Diritti dell'interessato</h2>
            <ul className="clean-list">
              <li>Accesso alle informazioni trattate.</li>
              <li>Rettifica o aggiornamento dei dati inesatti.</li>
              <li>Richiesta di cancellazione nei casi applicabili.</li>
              <li>Richiesta di limitazione del trattamento.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section shell">
        <div className="callout">
          <div>
            <h2>Richieste privacy</h2>
            <p>Per informazioni e richieste formali usa il canale contatti indicato nel footer.</p>
          </div>
          <div className="hero-actions">
            <Link className="btn btn-outline" to="/termini">Termini</Link>
            <Link className="btn btn-solid" to="/">Home</Link>
          </div>
        </div>
      </section>
    </>
  );
}
