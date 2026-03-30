/**
 * ContactPage — pagina contatti con form strutturato.
 *
 * Offre un form di contatto lato client (senza backend per ora)
 * e mostra le informazioni di contatto diretto.
 * Il form salva i dati in un mailto link come fallback.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../data/siteConfig";
import usePageMeta from "../hooks/usePageMeta";

const CONTACT_REASONS = [
  "Informazioni generali",
  "Richiesta demo",
  "Prezzi e piani",
  "Supporto tecnico",
  "Partnership",
  "Altro",
];

export default function ContactPage() {
  usePageMeta({ title: "Contatti", description: "Contatta il team FolderOrganizer AI. Domande, demo, supporto — rispondiamo entro 24 ore." });
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    reason: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fallback: apre mailto con i dati compilati
    const subject = encodeURIComponent(`[${form.reason || "Contatto"}] da ${form.name}`);
    const body = encodeURIComponent(
      `Nome: ${form.name}\nEmail: ${form.email}\nAzienda: ${form.company || "—"}\nMotivo: ${form.reason || "—"}\n\n${form.message}`
    );
    window.open(`mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`, "_self");
    setSubmitted(true);
  };

  return (
    <>
      <section className="section shell pricing-hero">
        <h1>Contatti</h1>
        <p className="lead">
          Hai domande, vuoi una demo o semplicemente vuoi saperne di più?
          Compila il form e ti rispondiamo entro 24 ore lavorative.
        </p>
      </section>

      <section className="section shell">
        <div className="grid two contact-grid">
          <article className="card">
            <h2>Scrivici</h2>
            {submitted ? (
              <div className="contact-success">
                <h3>Messaggio inviato</h3>
                <p>
                  Si è aperto il tuo client email con i dati compilati.
                  Se non si è aperto, puoi scriverci direttamente a{" "}
                  <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
                </p>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", company: "", reason: "", message: "" });
                  }}
                >
                  Invia un altro messaggio
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
                    <span className="form-label">Motivo del contatto</span>
                    <select name="reason" value={form.reason} onChange={handleChange}>
                      <option value="">Seleziona...</option>
                      {CONTACT_REASONS.map((reason) => (
                        <option key={reason} value={reason}>{reason}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="form-field">
                  <span className="form-label">Messaggio *</span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Descrivi la tua richiesta..."
                  />
                </label>

                <button type="submit" className="btn btn-solid">Invia messaggio</button>
              </form>
            )}
          </article>

          <div className="contact-info-stack">
            <article className="card">
              <h2>Contatto diretto</h2>
              <ul className="clean-list contact-details">
                <li>
                  <strong>Email</strong>
                  <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
                </li>
              </ul>
            </article>

            <article className="card">
              <h2>Tempi di risposta</h2>
              <p>
                Rispondiamo di solito entro 24 ore lavorative.
                Per richieste urgenti di supporto tecnico, specifica "urgente" nell'oggetto.
              </p>
            </article>

            <article className="card">
              <h2>Preferisci una call?</h2>
              <p>
                Se vuoi vedere il prodotto in azione, puoi richiedere una demo
                guidata con il nostro team.
              </p>
              <Link className="btn btn-outline" to="/demo">Richiedi demo</Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
