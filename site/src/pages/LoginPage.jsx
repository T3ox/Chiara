import { useLocation } from "react-router-dom";

export default function LoginPage({ fromAccountPath = false }) {
  const location = useLocation();
  const accountPath = fromAccountPath ? location.pathname.replace(/^\/account\/?/, "") : "";

  return (
    <>
      <section className="section shell">
        <h1>Accedi</h1>
        <p className="lead">Area riservata in preparazione. In questa fase la pagina e un placeholder informativo.</p>
      </section>

      <section className="section shell">
        <div className="card callout-card">
          <h2>Stato attuale</h2>
          <p>La componente di autenticazione non e ancora attiva in questa release.</p>
          {accountPath ? <p className="muted-note">Percorso richiesto: <code>/account/{accountPath}</code></p> : null}
        </div>
      </section>
    </>
  );
}
