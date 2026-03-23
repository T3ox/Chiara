/**
 * Accordion — componente accordion generico.
 *
 * Riceve un array di { title, content } e mostra una lista di voci
 * espandibili. Una sola voce aperta alla volta (click sulla stessa la chiude).
 */
import { useState } from "react";

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.title}>
            <button
              className="accordion-trigger"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              {item.title}
            </button>
            <div className="accordion-panel" style={{ maxHeight: isOpen ? "240px" : "0px" }}>
              <p>{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
