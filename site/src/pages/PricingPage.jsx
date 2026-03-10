import { Link } from "react-router-dom";
import Accordion from "../components/Accordion";

const faqItems = [
  {
    title: "Perché non vedo un prezzo fisso?",
    content: "Il valore dipende da perimetro operativo, volume e livello di standardizzazione richiesto.",
  },
  {
    title: "È possibile partire con un progetto pilota?",
    content: "Sì, l'avvio consigliato è su un caso concreto con estensione progressiva.",
  },
  {
    title: "Sono previsti costi nascosti?",
    content: "No, la proposta definisce chiaramente perimetro, milestone e responsabilità.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="section shell pricing-hero">
        <h1>Prezzi</h1>
        <p className="lead">
          Proposta su richiesta, costruita sui tuoi processi reali. Niente listini standard che ignorano complessità operative.
        </p>
      </section>

      <section className="section shell pricing-plans">
        <div className="grid two pricing-grid">
          <article className="card price-card">
            <span className="badge">Per team in crescita</span>
            <h2>Piano Operativo</h2>
            <p className="price">Su richiesta<span> / perimetro iniziale</span></p>
            <ul className="clean-list">
              <li>Mappatura flussi documentali prioritari</li>
              <li>Standard iniziale di classificazione e revisione</li>
              <li>Setup guidato su casi d'uso concreti</li>
              <li>Supporto onboarding per il team</li>
            </ul>
            <Link className="btn btn-solid" to="/accedi">Richiedi contatto</Link>
          </article>

          <article className="card price-card">
            <span className="badge">Per strutture multi-team</span>
            <h2>Piano Enterprise</h2>
            <p className="price">Su richiesta<span> / rollout esteso</span></p>
            <ul className="clean-list">
              <li>Governance cross-funzione e standard condivisi</li>
              <li>Linee guida qualità e controllo compliance interno</li>
              <li>Roadmap per adozione progressiva su più unità</li>
              <li>Allineamento stakeholder operativi e manageriali</li>
            </ul>
            <Link className="btn btn-outline" to="/privacy">Verifica requisiti privacy</Link>
          </article>
        </div>
      </section>

      <section className="section shell">
        <h2>FAQ prezzi</h2>
        <Accordion items={faqItems} />
      </section>

      <section className="section shell">
        <div className="callout">
          <div>
            <h2>Hai già un obiettivo di rollout?</h2>
            <p>Condividi priorità e vincoli, prepariamo un percorso operativo sostenibile.</p>
          </div>
          <div className="hero-actions">
            <Link className="btn btn-solid" to="/accedi">Parla con noi</Link>
            <Link className="btn btn-outline" to="/">Torna alla Home</Link>
          </div>
        </div>
      </section>
    </>
  );
}
