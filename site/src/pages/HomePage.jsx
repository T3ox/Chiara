/**
 * HomePage — pagina principale del sito FolderOrganizer AI.
 *
 * Questo file è intenzionalmente snello: si limita a orchestrare le sezioni
 * della landing page e gestire lo stato condiviso (animazione del titolo,
 * classe CSS dopo l'hero). Ogni sezione è nel suo file in components/sections/.
 *
 * Struttura della pagina (dall'alto in basso):
 *  1. HeroSection       — titolo, CTA, KPI cards
 *  2. TrustStrip        — carosello formati supportati
 *  3. WhySection        — problemi e risultati attesi
 *  4. PillarsSection    — i 3 pilastri: VEDI, CHIEDI, AGISCI
 *  5. BenefitsSection   — 3 card con benefici operativi
 *  6. BeforeAfterSection — simulatore file prima/dopo
 *  7. HowItWorksSection — stepper a 5 passi
 *  8. ComparisonSection — tabella confronto con alternative
 *  9. FaqSection        — domande frequenti con ricerca
 */
import { useEffect, useState } from "react";
import { LANDING_CONTENT } from "../data/landingContent";

import HeroSection from "../components/sections/HeroSection";
import TrustStrip from "../components/sections/TrustStrip";
import WhySection from "../components/sections/WhySection";
import PillarsSection from "../components/sections/PillarsSection";
import BeforeAfterSection from "../components/sections/BeforeAfterSection";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import ComparisonSection from "../components/sections/ComparisonSection";
import FaqSection from "../components/sections/FaqSection";
import CtaSection from "../components/sections/CtaSection";

export default function HomePage() {
  // Testo del titolo hero mostrato progressivamente dall'effetto "macchina da scrivere"
  const [typedTitle, setTypedTitle] = useState(LANDING_CONTENT.hero.title);

  // Controlla quando le KPI card possono entrare con animazione
  const [heroCardsReady, setHeroCardsReady] = useState(false);

  // Effetto "macchina da scrivere" sul titolo dell'hero
  useEffect(() => {
    const title = LANDING_CONTENT.hero.title;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Se l'utente ha richiesto animazioni ridotte, mostra subito il titolo completo
    if (reducedMotion) {
      setTypedTitle(title);
      setHeroCardsReady(true);
      return undefined;
    }

    let index = 0;
    setTypedTitle("");
    setHeroCardsReady(false);

    // Aggiunge una lettera alla volta ogni 34ms
    const interval = window.setInterval(() => {
      index += 1;
      setTypedTitle(title.slice(0, index));
      if (index >= title.length) {
        window.clearInterval(interval);
        window.setTimeout(() => setHeroCardsReady(true), 120);
      }
    }, 34);

    return () => window.clearInterval(interval);
  }, []);

  // Aggiunge/rimuove la classe CSS "after-hero" al body quando l'hero scorre fuori vista
  // (usata per mostrare elementi fissi dopo l'hero, es. CTA floating)
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return undefined;

    const updatePinnedFooter = () => {
      const rect = hero.getBoundingClientRect();
      const passed = rect.bottom <= 0;
      document.body.classList.toggle("after-hero", passed);
    };

    updatePinnedFooter();
    window.addEventListener("scroll", updatePinnedFooter, { passive: true });
    window.addEventListener("resize", updatePinnedFooter);

    return () => {
      window.removeEventListener("scroll", updatePinnedFooter);
      window.removeEventListener("resize", updatePinnedFooter);
      document.body.classList.remove("after-hero");
    };
  }, []);

  return (
    <>
      <HeroSection typedTitle={typedTitle} heroCardsReady={heroCardsReady} />
      <TrustStrip />
      <WhySection />
      <PillarsSection />
      <BeforeAfterSection />
      <HowItWorksSection />
      <ComparisonSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
