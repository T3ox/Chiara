import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { insightCards } from "../data/content";

const panelMotion = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 40 : -40,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -40 : 40,
    transition: {
      duration: 0.32,
      ease: [0.55, 0, 0.55, 0.2],
    },
  }),
};

export function InsightCarouselModule() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % insightCards.length);
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, []);

  const goTo = (index) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex((index + insightCards.length) % insightCards.length);
  };

  const card = insightCards[activeIndex];

  return (
    <div className="module-stack">
      <div className="module-heading">
        <span className="module-eyebrow">Approfondimento derivato</span>
        <h2>Carosello informativo</h2>
        <p>
          Anche questa parte non appesantisce la home. Viene richiamata come pannello secondario a partire
          dall'ambiente 3D.
        </p>
      </div>

      <div className="carousel-module">
        <div className="carousel-rail">
          {insightCards.map((item, index) => (
            <button
              className={index === activeIndex ? "rail-dot is-active" : "rail-dot"}
              key={item.title}
              onClick={() => goTo(index)}
              type="button"
            />
          ))}
        </div>

        <div className="carousel-panel">
          <AnimatePresence custom={direction} mode="wait">
            <motion.article
              className="insight-card"
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              key={card.title}
              variants={panelMotion}
            >
              <span className="module-eyebrow">{card.eyebrow}</span>
              <h3>{card.title}</h3>
              <p>{card.summary}</p>
              <ul>
                {card.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <div className="carousel-footer">
                <span>
                  {String(activeIndex + 1).padStart(2, "0")} / {String(insightCards.length).padStart(2, "0")}
                </span>
                <div className="carousel-controls">
                  <button onClick={() => goTo(activeIndex - 1)} type="button">
                    Prev
                  </button>
                  <button onClick={() => goTo(activeIndex + 1)} type="button">
                    Next
                  </button>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
