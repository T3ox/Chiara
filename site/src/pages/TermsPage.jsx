export default function TermsPage() {
  return (
    <>
      <section className="section shell">
        <h1>Termini</h1>
        <p className="lead">Versione preliminare dei termini di servizio. Il testo contrattuale definitivo sarà pubblicato in aggiornamento successivo.</p>
      </section>

      <section className="section shell">
        <div className="grid two">
          <article className="card">
            <h2>Uso del servizio</h2>
            <ul className="clean-list">
              <li>Utilizzo consentito per finalità professionali e operative.</li>
              <li>Responsabilità utente su qualità e legittimità dei dati inseriti.</li>
              <li>Uso conforme alle policy interne dell'organizzazione.</li>
            </ul>
          </article>
          <article className="card">
            <h2>Limiti e aggiornamenti</h2>
            <ul className="clean-list">
              <li>Feature e condizioni possono evolvere per iterazioni di prodotto.</li>
              <li>Eventuali personalizzazioni seguono accordi dedicati.</li>
              <li>Le revisioni significative verranno comunicate con trasparenza.</li>
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}
