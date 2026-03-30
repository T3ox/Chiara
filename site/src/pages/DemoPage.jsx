/**
 * DemoPage — pagina di richiesta demo.
 *
 * Spiega cosa include la sessione demo, il formato, mostra
 * i passaggi concreti e offre un form per richiedere la demo.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { LANDING_CONTENT } from "../data/landingContent";
import { siteConfig } from "../data/siteConfig";
import usePageMeta from "../hooks/usePageMeta";

const DEMO_STEPS = [
  {
    step: "1",
    title: "Raccontaci il tuo caso",
    text: "Compila il form qui sotto con una breve descrizione dei file che gestisci e delle sfide principali.",
  },
  {
    step: "2",
    title: "Sessione guidata",
    text: "Ti mostriamo come FolderOrganizer AI analizza, classifica e riorganizza una cartella simile alla tua.",
  },
  {
    step: "3",
    title: "Risultato e prossimi passi",
    text: "Ricevi un riepilogo con i risultati della demo e una proposta concreta per il tuo caso.",
  },
];

export default function DemoPage() {
  usePageMeta({ title: "Richiedi demo", description: "Prenota una demo gratuita di FolderOrganizer AI. Ti mostriamo come organizzare i tuoi file con l'intelligenza artificiale." });
  const [form, setForm] = useState({ name: "", email: "", company: "", files: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Richiesta demo - ${form.name}`);
    const body = encodeURIComponent(
      `Nome: ${form.name}\nEmail: ${form.email}\nAzienda: ${form.company || "—"}\nTipi di file: ${form.files || "—"}\n\nNote: ${form.notes || "—"}`
    );
    window.open(`mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`, "_self");
    setSubmitted(true);
  };

  return (
    <>
      <section className="section shell pricing-hero">
        <h1>Richiedi una demo</h1>
        <p className="lead">{LANDING_CONTENT.demo.body}</p>
      </section>

      <section className="section shell">
        <div className="grid three demo-steps-grid">
          {DEMO_STEPS.map((item) => (
            <article className="card hover-lift" key={item.step}>
              <span className="demo-step-number">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
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

            <h3 style={{ marginTop: "24px" }}>Formato della sessione</h3>
            <ul className="clean-list">
              <li>Sessione guidata con cartella campione o materiale condiviso.</li>
              <li>Analisi dei casi reali e regole di naming piu adatte al tuo team.</li>
              <li>Consegna di un riepilogo con prossimi passi consigliati.</li>
            </ul>
          </article>

          <article className="card">
            <h2>Richiedi la tua demo</h2>
            {submitted ? (
              <div className="contact-success">
                <h3>Richiesta inviata</h3>
                <p>
                  Si e aperto il tuo client email con i dati compilati.
                  Se non si e aperto, puoi scriverci direttamente a{" "}
                  <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
                </p>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", company: "", files: "", notes: "" });
                  }}
                >
                  Nuova richiesta
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <label className="form-field">
                    <span className="form-label">Nome *</span>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Il tuo nome"
                      autoComplete="name"
                    />
                  </label>
                  <label className="form-field">
                    <span className="form-label">Email *</span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="nome@azienda.com"
                      autoComplete="email"
                    />
                  </label>
                </div>

                <div className="form-row">
                  <label className="form-field">
                    <span className="form-label">Azienda</span>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Nome azienda (opzionale)"
                      autoComplete="organization"
                    />
                  </label>
                  <label className="form-field">
                    <span className="form-label">Tipi di file gestiti</span>
                    <input
                      type="text"
                      name="files"
                      value={form.files}
                      onChange={handleChange}
                      placeholder="es. PDF, foto, Excel..."
                    />
                  </label>
                </div>

                <label className="form-field">
                  <span className="form-label">Note aggiuntive</span>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Descrivi brevemente la tua situazione..."
                  />
                </label>

                <button type="submit" className="btn btn-solid">Prenota la demo</button>
              </form>
            )}
          </article>
        </div>
      </section>

      <section className="section shell">
        <div className="callout">
          <div>
            <h2>Preferisci contattarci direttamente?</h2>
            <p>
              Scrivici a{" "}
              <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>{" "}
              e organizziamo una sessione su misura.
            </p>
          </div>
          <div className="hero-actions">
            <Link className="btn btn-outline" to="/prezzi">Vedi prezzi</Link>
          </div>
        </div>
      </section>
    </>
  );
}
