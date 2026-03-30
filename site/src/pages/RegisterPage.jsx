/**
 * RegisterPage — pagina di registrazione account.
 *
 * L'autenticazione e in fase di sviluppo. La pagina mostra:
 *  - Un form di registrazione visuale (nome, email, password, azienda)
 *  - I vantaggi della registrazione
 *  - Un avviso sullo stato di sviluppo
 *
 * I campi del form aiutano a definire la struttura dati per il database.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../data/siteConfig";

const REGISTER_BENEFITS = [
  {
    title: "Accesso completo al prodotto",
    text: "Scarica il software, configura le regole e inizia a organizzare i tuoi archivi.",
  },
  {
    title: "Progetti illimitati",
    text: "Crea tutti i progetti di organizzazione che vuoi, ognuno con regole e cartelle dedicate.",
  },
  {
    title: "Storico e reportistica",
    text: "Tieni traccia di ogni operazione eseguita con log dettagliati e report esportabili.",
  },
  {
    title: "Supporto prioritario",
    text: "Accedi al canale di supporto dedicato per risolvere qualsiasi problema rapidamente.",
  },
];

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Auth non ancora implementata — il form e dimostrativo
  };

  return (
    <>
      <section className="section shell pricing-hero">
        <h1>Crea un account</h1>
        <p className="lead">
          Registrati per accedere a {siteConfig.brandName} AI e iniziare
          a organizzare i tuoi file con l'intelligenza artificiale.
        </p>
      </section>

      <section className="section shell">
        <div className="grid two">
          <article className="card">
            <h2>Registrazione</h2>

            <div className="login-coming-soon">
              <span className="badge">In fase di sviluppo</span>
              <p className="muted-note" style={{ marginTop: "12px" }}>
                La registrazione e in fase di sviluppo attivo.
                Presto potrai creare il tuo account.
              </p>
            </div>

            <form className="contact-form login-form" onSubmit={handleSubmit}>
              <label className="form-field">
                <span className="form-label">Nome completo</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nome e cognome"
                  autoComplete="name"
                  disabled
                />
              </label>

              <label className="form-field">
                <span className="form-label">Email aziendale</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="nome@azienda.com"
                  autoComplete="email"
                  disabled
                />
              </label>

              <label className="form-field">
                <span className="form-label">Azienda</span>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Nome azienda (opzionale)"
                  autoComplete="organization"
                  disabled
                />
              </label>

              <div className="form-row">
                <label className="form-field">
                  <span className="form-label">Password</span>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Minimo 8 caratteri"
                    autoComplete="new-password"
                    disabled
                  />
                </label>

                <label className="form-field">
                  <span className="form-label">Conferma password</span>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Ripeti la password"
                    autoComplete="new-password"
                    disabled
                  />
                </label>
              </div>

              <button type="submit" className="btn btn-solid" disabled style={{ opacity: 0.5 }}>
                Crea account
              </button>

              <p className="muted-note" style={{ fontSize: "13px", marginTop: "12px" }}>
                Hai gia un account?{" "}
                <Link to="/accedi">Accedi</Link>
              </p>
            </form>
          </article>

          <div className="contact-info-stack">
            <article className="card">
              <h2>Perche registrarsi</h2>
              <p>
                Con un account {siteConfig.brandName} AI accedi a tutti gli strumenti
                per organizzare i tuoi archivi in modo intelligente.
              </p>
            </article>

            {REGISTER_BENEFITS.map((benefit) => (
              <article className="card hover-lift" key={benefit.title}>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="callout">
          <div>
            <h2>Vuoi prima vedere il prodotto in azione?</h2>
            <p>Richiedi una demo gratuita prima di registrarti.</p>
          </div>
          <div className="hero-actions">
            <Link className="btn btn-solid" to="/demo">Richiedi demo</Link>
            <Link className="btn btn-outline" to="/prezzi">Vedi prezzi</Link>
          </div>
        </div>
      </section>
    </>
  );
}
