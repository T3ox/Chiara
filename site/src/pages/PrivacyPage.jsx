/**
 * PrivacyPage — informativa sulla privacy (GDPR).
 *
 * Sezioni: dati raccolti, dati elaborati dal servizio, terze parti,
 * conservazione, diritti dell'interessato, contatto privacy.
 */
import { Link } from "react-router-dom";
import { siteConfig } from "../data/siteConfig";

export default function PrivacyPage() {
  return (
    <>
      <section className="section shell">
        <h1>Informativa sulla Privacy</h1>
        <p className="lead">
          La presente informativa descrive quali dati raccogliamo, come li trattiamo e quali diritti
          puoi esercitare ai sensi del Regolamento (UE) 2016/679 (GDPR).
          Titolare del trattamento è {siteConfig.brandName}.
        </p>
      </section>

      {/* 1. Dati raccolti — 2. Dati elaborati e cosa NON salviamo */}
      <section className="section shell">
        <div className="grid two">
          <article className="card">
            <h2>1. Dati raccolti</h2>
            <p>Raccogliamo esclusivamente i dati necessari all'erogazione del Servizio:</p>
            <ul className="clean-list">
              <li>
                <strong>Dati di account</strong> — indirizzo email, nome e credenziali di accesso,
                forniti dall'Utente in fase di registrazione.
              </li>
              <li>
                <strong>Dati di pagamento</strong> — gestiti integralmente dal processore di pagamento terzo.
                {siteConfig.brandName} non memorizza né ha accesso a numeri di carta di credito
                o coordinate bancarie.
              </li>
              <li>
                <strong>Dati di utilizzo e analytics</strong> — pagine visitate, durata della sessione,
                tipo di dispositivo e browser. Raccolti solo con il consenso esplicito dell'Utente
                tramite il banner cookie.
              </li>
              <li>
                <strong>Dati tecnici</strong> — indirizzo IP, log di accesso e informazioni di sicurezza,
                trattati per la protezione dell'infrastruttura e la prevenzione di abusi.
              </li>
            </ul>
          </article>

          <article className="card">
            <h2>2. Dati elaborati dal Servizio</h2>
            <p>Durante l'utilizzo di {siteConfig.brandName} AI vengono elaborati:</p>
            <ul className="clean-list">
              <li>
                <strong>Metadati dei file</strong> — nome, estensione, dimensione, data di creazione
                e ultima modifica. Utilizzati per la classificazione e la proposta di rinomina.
              </li>
              <li>
                <strong>Porzioni di contenuto testuale</strong> — estratte dai file (PDF, documenti Office)
                nella misura strettamente necessaria all'analisi AI.
              </li>
              <li>
                <strong>Log delle operazioni</strong> — registro delle rinominazioni e degli spostamenti
                eseguiti, conservato localmente sulla macchina dell'Utente.
              </li>
            </ul>
            <p><strong>Cosa NON raccogliamo né salviamo:</strong></p>
            <ul className="clean-list">
              <li>Non trasferiamo né archiviamo file completi dell'Utente sui nostri server.</li>
              <li>Non conserviamo copie del contenuto testuale estratto al termine dell'analisi.</li>
              <li>Non raccogliamo dati biometrici, sanitari o giudiziari.</li>
              <li>Non effettuiamo profilazione automatizzata a fini decisionali.</li>
            </ul>
          </article>
        </div>
      </section>

      {/* 3. Terze parti — 4. Retention */}
      <section className="section shell">
        <div className="grid two">
          <article className="card">
            <h2>3. Terze parti e finalità</h2>
            <p>I dati possono essere condivisi con i seguenti soggetti terzi, esclusivamente per le finalità indicate:</p>
            <ul className="clean-list">
              <li>
                <strong>OpenAI</strong> — riceve metadati e porzioni di testo estratto per l'analisi AI.
                Il trattamento avviene tramite API, in conformità ai termini di servizio di OpenAI
                e nel rispetto delle policy sulla data retention del fornitore.
                Non vengono inviati file completi.
              </li>
              <li>
                <strong>Processore di pagamento</strong> — gestisce le transazioni economiche.
                Opera come titolare autonomo del trattamento per i dati di pagamento.
              </li>
              <li>
                <strong>Servizi di analytics</strong> — attivati solo previo consenso dell'Utente,
                raccolgono dati di navigazione aggregati e anonimizzati per migliorare il Servizio.
              </li>
            </ul>
            <p>
              <strong>Base giuridica:</strong> il trattamento si fonda sull'esecuzione del contratto (art. 6.1.b GDPR)
              per i dati necessari all'erogazione del Servizio, sul consenso esplicito (art. 6.1.a GDPR)
              per analytics e marketing, e sul legittimo interesse (art. 6.1.f GDPR) per la sicurezza
              dell'infrastruttura.
            </p>
          </article>

          <article className="card">
            <h2>4. Conservazione dei dati</h2>
            <p>I dati sono conservati per il tempo strettamente necessario alle finalità del trattamento:</p>
            <ul className="clean-list">
              <li>
                <strong>Dati di account</strong> — conservati per tutta la durata del rapporto contrattuale
                e cancellati entro 30 giorni dalla richiesta di eliminazione dell'account,
                salvo obblighi di legge.
              </li>
              <li>
                <strong>Dati di pagamento</strong> — conservati dal processore terzo secondo
                le proprie policy e gli obblighi fiscali applicabili (generalmente 10 anni).
              </li>
              <li>
                <strong>Log di utilizzo</strong> — i log delle operazioni di organizzazione file
                sono conservati localmente sulla macchina dell'Utente.
                {siteConfig.brandName} non ne detiene copie.
              </li>
              <li>
                <strong>Dati analytics</strong> — conservati in forma aggregata per un massimo di 26 mesi,
                conformemente alle best practice di settore.
              </li>
              <li>
                <strong>Log di sicurezza</strong> — conservati per un massimo di 12 mesi
                per finalità di prevenzione e indagine su eventuali incidenti di sicurezza.
              </li>
            </ul>
          </article>
        </div>
      </section>

      {/* 5. Diritti GDPR + Contatto privacy */}
      <section className="section shell">
        <article className="card">
          <h2>5. Diritti dell'interessato</h2>
          <p>
            Ai sensi degli articoli 15-22 del GDPR, l'Utente ha diritto di:
          </p>
          <ul className="clean-list">
            <li><strong>Accesso</strong> — ottenere conferma dell'esistenza di un trattamento e accedere ai propri dati personali.</li>
            <li><strong>Rettifica</strong> — richiedere la correzione di dati inesatti o l'integrazione di dati incompleti.</li>
            <li><strong>Cancellazione</strong> — richiedere la cancellazione dei propri dati nei casi previsti dall'art. 17 GDPR.</li>
            <li><strong>Limitazione</strong> — richiedere la limitazione del trattamento nei casi previsti dall'art. 18 GDPR.</li>
            <li><strong>Portabilità</strong> — ricevere i propri dati in un formato strutturato, di uso comune e leggibile da dispositivo automatico.</li>
            <li><strong>Opposizione</strong> — opporsi al trattamento basato sul legittimo interesse, inclusa l'eventuale profilazione.</li>
            <li><strong>Revoca del consenso</strong> — revocare in qualsiasi momento il consenso prestato per analytics o marketing, senza pregiudicare la liceità del trattamento precedente.</li>
          </ul>
          <p>
            L'Utente ha inoltre il diritto di proporre reclamo all'Autorità Garante per la protezione
            dei dati personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noreferrer">www.garanteprivacy.it</a>).
          </p>
        </article>
      </section>

      {/* Contatto privacy */}
      <section className="section shell">
        <div className="callout">
          <div>
            <h2>Contatto per la privacy</h2>
            <p>
              Per esercitare i tuoi diritti o per qualsiasi domanda relativa al trattamento dei dati personali,
              scrivi a{" "}
              <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
              Risponderemo entro 30 giorni dalla ricezione della richiesta, come previsto dal GDPR.
            </p>
          </div>
          <div className="hero-actions">
            <Link className="btn btn-solid" to="/termini">Termini di servizio</Link>
            <Link className="btn btn-outline" to="/">Torna alla Home</Link>
          </div>
        </div>
      </section>
    </>
  );
}
