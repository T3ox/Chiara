/**
 * LoginPage — pagina di accesso all'area riservata.
 *
 * L'autenticazione e in fase di sviluppo. La pagina mostra:
 *  - Un form di login visuale (campi email + password)
 *  - Una descrizione di cosa includera l'area riservata
 *  - Un avviso sullo stato di sviluppo
 *
 * I campi del form aiutano a definire la struttura dati per il database.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../data/siteConfig";

const DASHBOARD_FEATURES = [
  {
    title: "Dashboard personale",
    text: "Panoramica delle cartelle organizzate, statistiche di utilizzo e storico delle operazioni.",
  },
  {
    title: "Gestione progetti",
    text: "Crea e gestisci progetti di organizzazione separati, ognuno con le proprie regole e cartelle.",
  },
  {
    title: "Storico operazioni",
    text: "Consulta il log completo di ogni file analizzato, rinominato o spostato, con data e regola applicata.",
  },
  {
    title: "Impostazioni e preferenze",
    text: "Personalizza le regole di naming, le cartelle di destinazione e le preferenze di analisi AI.",
  },
];

export default function LoginPage({ fromAccountPath = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Auth non ancora implementata — il form e dimostrativo
  };

  return (
    <>
      <section className="section shell pricing-hero">
        <h1>Accedi</h1>
        <p className="lead">
          Entra nella tua area riservata per gestire i tuoi progetti di organizzazione,
          consultare lo storico e personalizzare le impostazioni.
        </p>
      </section>

      <section className="section shell">
        <div className="grid two">
          <article className="card">
            <h2>Login</h2>

            <div className="login-coming-soon">
              <span className="badge">In fase di sviluppo</span>
              <p className="muted-note" style={{ marginTop: "12px" }}>
                L'area riservata e in fase di sviluppo attivo.
                Presto potrai accedere con le tue credenziali.
              </p>
            </div>

            <form className="contact-form login-form" onSubmit={handleSubmit}>
              <label className="form-field">
                <span className="form-label">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nome@azienda.com"
                  autoComplete="email"
                  disabled
                />
              </label>

              <label className="form-field">
                <span className="form-label">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="La tua password"
                  autoComplete="current-password"
                  disabled
                />
              </label>

              <button type="submit" className="btn btn-solid" disabled style={{ opacity: 0.5 }}>
                Accedi
              </button>

              <p className="muted-note" style={{ fontSize: "13px", marginTop: "12px" }}>
                Non hai un account?{" "}
                <Link to="/registrati">Crea un account</Link>
              </p>
            </form>
          </article>

          <div className="contact-info-stack">
            <article className="card">
              <h2>Cosa troverai nell'area riservata</h2>
              <p>
                L'area riservata di {siteConfig.brandName} AI ti dara accesso completo
                alla gestione dei tuoi progetti di organizzazione.
              </p>
            </article>

            {DASHBOARD_FEATURES.map((feature) => (
              <article className="card hover-lift" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="callout">
          <div>
            <h2>Vuoi essere tra i primi ad accedere?</h2>
            <p>Contattaci per richiedere l'accesso anticipato all'area riservata.</p>
          </div>
          <div className="hero-actions">
            <Link className="btn btn-solid" to="/contatti">Contattaci</Link>
            <Link className="btn btn-outline" to="/demo">Richiedi demo</Link>
          </div>
        </div>
      </section>
    </>
  );
}
