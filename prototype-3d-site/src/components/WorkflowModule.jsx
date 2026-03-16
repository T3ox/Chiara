import { workflowCards } from "../data/content";

export function WorkflowModule() {
  return (
    <div className="module-stack">
      <div className="module-heading">
        <span className="module-eyebrow">Workflow</span>
        <h2>Dal desk di validazione all'archivio ordinato.</h2>
        <p>
          Qui il racconto si concentra sul flusso operativo. La home non lo spiega tutto: lo introduce e basta.
        </p>
      </div>

      <div className="mini-grid">
        {workflowCards.map((card) => (
          <article className="mini-card" key={card.title}>
            <h4>{card.title}</h4>
            <p>{card.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
