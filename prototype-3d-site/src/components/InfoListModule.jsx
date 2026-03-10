export function InfoListModule({ eyebrow, title, summary, items }) {
  return (
    <div className="module-stack">
      <div className="module-heading">
        <span className="module-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{summary}</p>
      </div>

      <div className="mini-grid">
        {items.map((item) => (
          <article className="mini-card" key={item}>
            <p>{item}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
