/**
 * PillarIcon — icone SVG per i tre pilastri principali del prodotto:
 *   "see"  → VEDI   (occhio)
 *   "ask"  → CHIEDI (fumetto)
 *   "act"  → AGISCI (cartella con freccia)
 *
 * Props:
 *   type — "see" | "ask" | "act"
 */
export default function PillarIcon({ type }) {
  // Icona "occhio" per il pilastro VEDI
  if (type === "see") {
    return (
      <svg viewBox="0 0 64 64" role="img" aria-hidden="true" className="pillar-icon">
        <path d="M6 32c6.5-10.5 15.5-16 26-16s19.5 5.5 26 16c-6.5 10.5-15.5 16-26 16S12.5 42.5 6 32z" />
        <circle cx="32" cy="32" r="8" />
        <circle cx="32" cy="32" r="3" className="icon-fill" />
      </svg>
    );
  }

  // Icona "fumetto" per il pilastro CHIEDI
  if (type === "ask") {
    return (
      <svg viewBox="0 0 64 64" role="img" aria-hidden="true" className="pillar-icon">
        <path d="M14 18h30a8 8 0 0 1 8 8v12a8 8 0 0 1-8 8H28l-10 8v-8H14a8 8 0 0 1-8-8V26a8 8 0 0 1 8-8z" />
        <circle cx="24" cy="32" r="2" className="icon-fill" />
        <circle cx="32" cy="32" r="2" className="icon-fill" />
        <circle cx="40" cy="32" r="2" className="icon-fill" />
      </svg>
    );
  }

  // Icona "cartella con freccia" per il pilastro AGISCI
  if (type === "act") {
    return (
      <svg viewBox="0 0 64 64" role="img" aria-hidden="true" className="pillar-icon">
        <path d="M8 22a6 6 0 0 1 6-6h12l4 4h20a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6H14a6 6 0 0 1-6-6V22z" />
        <path d="M26 30h14l6 6v12a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4V34a4 4 0 0 1 4-4z" />
        <path d="M40 30v8h8" />
      </svg>
    );
  }

  return null;
}
