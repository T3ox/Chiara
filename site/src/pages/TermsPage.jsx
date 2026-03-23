/**
 * TermsPage — termini di servizio.
 *
 * Sezioni: descrizione servizio, limitazioni responsabilità, backup/rinomina,
 * contenuti sensibili, rimborsi/cancellazione, obblighi utente, modifiche ai termini.
 */
import { Link } from "react-router-dom";
import { siteConfig } from "../data/siteConfig";

export default function TermsPage() {
  return (
    <>
      <section className="section shell">
        <h1>Termini di servizio</h1>
        <p className="lead">
          I presenti Termini di servizio regolano l'accesso e l'utilizzo della piattaforma {siteConfig.brandName} AI,
          incluse tutte le funzionalità di analisi, classificazione, rinomina e riorganizzazione dei file.
          Utilizzando il Servizio, l'Utente dichiara di aver letto, compreso e accettato integralmente le presenti condizioni.
        </p>
      </section>

      {/* 1. Descrizione del servizio */}
      <section className="section shell">
        <article className="card">
          <h2>1. Descrizione del Servizio</h2>
          <p>
            {siteConfig.brandName} AI è una piattaforma software che analizza il contenuto, i metadati e la struttura
            dei file presenti nelle cartelle indicate dall'Utente, e propone operazioni di rinomina,
            riclassificazione e riorganizzazione basate su intelligenza artificiale.
          </p>
          <p>
            Il Servizio opera in modalità di anteprima: nessuna modifica viene applicata ai file
            senza la conferma esplicita dell'Utente. L'elaborazione avviene localmente sulla macchina dell'Utente;
            vengono trasmessi a servizi terzi (OpenAI) esclusivamente metadati e porzioni di testo
            strettamente necessari all'analisi, mai file completi.
          </p>
        </article>
      </section>

      {/* 2-3. Limiti di responsabilità + Backup e rischio rinomina */}
      <section className="section shell">
        <div className="grid two">
          <article className="card">
            <h2>2. Limitazioni di responsabilità</h2>
            <ul className="clean-list">
              <li>
                Il Servizio è fornito «così com'è» (<em>as is</em>) e «come disponibile» (<em>as available</em>),
                senza garanzie esplicite o implicite di alcun tipo, incluse, a titolo esemplificativo,
                garanzie di idoneità per uno scopo particolare, accuratezza dei risultati o assenza di errori.
              </li>
              <li>
                {siteConfig.brandName} non sarà in alcun caso responsabile per perdite di dati, interruzioni
                dell'attività lavorativa, mancato guadagno o danni indiretti, incidentali, speciali o consequenziali
                derivanti dall'utilizzo o dall'impossibilità di utilizzo del Servizio.
              </li>
              <li>
                I suggerimenti generati dall'intelligenza artificiale (nomi file, struttura cartelle,
                classificazioni) hanno natura propositiva e non costituiscono garanzia di correttezza.
                L'Utente è tenuto a verificare ogni proposta prima di confermarne l'applicazione.
              </li>
              <li>
                In ogni caso, la responsabilità complessiva di {siteConfig.brandName} nei confronti dell'Utente
                non potrà eccedere l'importo effettivamente corrisposto dall'Utente per il Servizio
                nei dodici (12) mesi precedenti l'evento che ha dato origine alla contestazione.
              </li>
            </ul>
          </article>

          <article className="card">
            <h2>3. Backup e rischi connessi alla rinomina</h2>
            <ul className="clean-list">
              <li>
                Prima di ogni operazione di organizzazione, è fortemente raccomandato effettuare
                un backup completo dei file e delle cartelle interessate.
                {siteConfig.brandName} non è responsabile per la mancata esecuzione del backup da parte dell'Utente.
              </li>
              <li>
                Le operazioni di rinomina, una volta confermate dall'Utente, sono da considerarsi irreversibili:
                {siteConfig.brandName} non dispone della capacità di ripristinare automaticamente
                i nomi originali dei file dopo l'esecuzione.
              </li>
              <li>
                La rinomina dei file può alterare riferimenti interni, collegamenti ipertestuali,
                macro, script e dipendenze tra documenti. L'Utente è l'unico responsabile
                della valutazione dell'impatto delle operazioni di rinomina sul proprio ambiente operativo.
              </li>
              <li>
                La qualità dei risultati dipende dalla leggibilità e dalla qualità dei file di partenza:
                scansioni di bassa qualità, documenti corrotti o testi irriconoscibili possono produrre
                suggerimenti imprecisi o incompleti.
              </li>
            </ul>
          </article>
        </div>
      </section>

      {/* 4-5. Contenuti sensibili e uso corretto + Rimborsi e cancellazioni */}
      <section className="section shell">
        <div className="grid two">
          <article className="card">
            <h2>4. Contenuti sensibili e uso corretto</h2>
            <ul className="clean-list">
              <li>
                L'Utente si impegna a non utilizzare il Servizio per elaborare contenuti illegali,
                diffamatori, osceni, discriminatori o che violino i diritti di proprietà intellettuale
                o altri diritti di terzi.
              </li>
              <li>
                Qualora i file sottoposti ad analisi contengano dati personali ai sensi del Regolamento (UE) 2016/679
                (GDPR) — in particolare categorie particolari di dati (dati sanitari, giudiziari, biometrici,
                genetici) — l'Utente è il solo responsabile della conformità del trattamento alle normative
                applicabili in materia di protezione dei dati personali.
              </li>
              <li>
                {siteConfig.brandName} non effettua analisi semantica finalizzata alla moderazione
                dei contenuti: la responsabilità sulla natura, la liceità e la classificazione
                dei dati elaborati ricade interamente sull'Utente.
              </li>
              <li>
                È espressamente vietato utilizzare il Servizio per attività fraudolente,
                operazioni di reverse engineering, decompilazione o disassemblaggio del software,
                o per qualsiasi azione volta a compromettere la sicurezza, la stabilità
                o l'integrità dell'infrastruttura del Servizio.
              </li>
            </ul>
          </article>

          <article className="card">
            <h2>5. Rimborsi e cancellazione dell'account</h2>
            <ul className="clean-list">
              <li>
                L'Utente può richiedere la cancellazione del proprio account in qualsiasi momento
                contattando il supporto all'indirizzo{" "}
                <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
              </li>
              <li>
                A seguito della cancellazione, tutti i dati associati all'account dell'Utente
                saranno eliminati in modo definitivo entro trenta (30) giorni dalla richiesta,
                fatti salvi gli obblighi di conservazione previsti dalla legge applicabile.
              </li>
              <li>
                Le richieste di rimborso sono valutate singolarmente e devono essere presentate
                entro quattordici (14) giorni dalla data di acquisto. Il rimborso è subordinato
                alla verifica delle condizioni d'uso e all'effettiva fruizione del Servizio.
              </li>
              <li>
                Eventuali crediti residui sul conto dell'Utente non sono trasferibili a terzi,
                convertibili in denaro né rimborsabili, salvo diversa disposizione contrattuale.
              </li>
            </ul>
          </article>
        </div>
      </section>

      {/* 6-7. Uso del servizio + Aggiornamenti ai termini */}
      <section className="section shell">
        <div className="grid two">
          <article className="card">
            <h2>6. Obblighi dell'Utente</h2>
            <ul className="clean-list">
              <li>
                L'Utente si impegna a utilizzare il Servizio esclusivamente per finalità
                lecite, professionali e conformi alle policy interne della propria organizzazione.
              </li>
              <li>
                L'Utente è responsabile della qualità, della legittimità e dell'accuratezza
                dei dati e dei file sottoposti al Servizio.
              </li>
              <li>
                L'Utente è tenuto a mantenere riservate le credenziali di accesso al proprio account
                e a notificare tempestivamente qualsiasi utilizzo non autorizzato.
              </li>
              <li>
                L'Utente riconosce che le funzionalità del Servizio possono variare
                in base al piano sottoscritto e alle configurazioni scelte.
              </li>
            </ul>
          </article>

          <article className="card">
            <h2>7. Modifiche ai Termini di servizio</h2>
            <ul className="clean-list">
              <li>
                {siteConfig.brandName} si riserva il diritto di modificare i presenti Termini
                in qualsiasi momento per riflettere aggiornamenti del Servizio, evoluzioni normative
                o esigenze operative.
              </li>
              <li>
                Le modifiche sostanziali saranno comunicate all'Utente con un preavviso ragionevole
                tramite email o notifica all'interno del Servizio.
              </li>
              <li>
                L'utilizzo continuato del Servizio successivamente alla pubblicazione
                delle modifiche costituisce accettazione integrale dei Termini aggiornati.
              </li>
              <li>
                In caso di disaccordo con le modifiche apportate, l'Utente ha facoltà
                di cessare l'utilizzo del Servizio e richiedere la cancellazione del proprio account.
              </li>
            </ul>
          </article>
        </div>
      </section>

      {/* Link a privacy e contatti */}
      <section className="section shell">
        <div className="callout">
          <div>
            <h2>Hai domande sui Termini di servizio?</h2>
            <p>
              Per chiarimenti, segnalazioni o richieste formali scrivi a{" "}
              <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
            </p>
          </div>
          <div className="hero-actions">
            <Link className="btn btn-solid" to="/privacy">Informativa Privacy</Link>
            <Link className="btn btn-outline" to="/">Torna alla Home</Link>
          </div>
        </div>
      </section>
    </>
  );
}
