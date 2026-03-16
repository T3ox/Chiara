/**
 * App.jsx — radice dell'applicazione React.
 *
 * Responsabilità:
 *  1. Definisce il router con tutte le pagine del sito
 *  2. Attiva il sistema di animazioni scroll-reveal globale (useRevealOnScroll)
 *
 * Struttura delle route:
 *  /            → HomePage      (landing page principale)
 *  /prezzi      → PricingPage   (piani e prezzi)
 *  /demo        → DemoPage      (richiesta demo)
 *  /privacy     → PrivacyPage   (informativa privacy)
 *  /accedi      → LoginPage     (placeholder login)
 *  /termini     → TermsPage     (termini di servizio)
 *  /account/*   → LoginPage     (reindirizza all'accesso)
 *  *            → /             (redirect per URL sconosciuti)
 *
 * Tutte le route sono avvolte da SiteLayout che fornisce header e footer.
 */
import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import HomePage from "./pages/HomePage";
import PricingPage from "./pages/PricingPage";
import DemoPage from "./pages/DemoPage";
import PrivacyPage from "./pages/PrivacyPage";
import LoginPage from "./pages/LoginPage";
import TermsPage from "./pages/TermsPage";

/**
 * Hook che attiva le animazioni di "reveal" quando gli elementi entrano nel viewport.
 *
 * Funzionamento:
 *  - Osserva tutti gli elementi con classe .reveal o .reveal-on-scroll
 *  - Aggiunge la classe reveal--in quando entrano nello schermo
 *  - Aggiunge reveal--out-up o reveal--out-down quando escono (per animazione bidirezionale)
 *  - Rispetta la preferenza di sistema "prefers-reduced-motion"
 *  - Gli elementi in contenitori [data-reveal-seq] ricevono un ritardo progressivo
 *    (ogni elemento scatta 80ms dopo il precedente, max 320ms)
 *
 * Si re-esegue ad ogni cambio di pagina (location.pathname) per animare
 * gli elementi della nuova pagina.
 */
function useRevealOnScroll() {
  const location = useLocation();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = Array.from(document.querySelectorAll(".reveal, .reveal-on-scroll"));
    if (!revealItems.length) return;

    // Assegna ritardi progressivi agli elementi in sequenza
    document.querySelectorAll("[data-reveal-seq]").forEach((container) => {
      const items = Array.from(container.querySelectorAll(".reveal, .reveal-on-scroll"));
      items.forEach((item, index) => {
        item.style.transitionDelay = `${Math.min(index * 80, 320)}ms`;
      });
    });

    // Se animazioni ridotte o IntersectionObserver non disponibile, mostra tutto subito
    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("reveal--in"));
      return;
    }

    // Observer: aggiunge/rimuove classi CSS quando un elemento entra/esce dal viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target;
          if (entry.isIntersecting) {
            target.classList.add("reveal--in");
            target.classList.remove("reveal--out-up", "reveal--out-down");
            return;
          }

          // Determina la direzione di uscita per animare correttamente
          target.classList.remove("reveal--in");
          if (entry.boundingClientRect.top < 0) {
            target.classList.add("reveal--out-up");    // uscito verso l'alto
            target.classList.remove("reveal--out-down");
          } else {
            target.classList.add("reveal--out-down");   // non ancora entrato (sotto)
            target.classList.remove("reveal--out-up");
          }
        });
      },
      {
        threshold: 0.16,           // attiva quando il 16% dell'elemento è visibile
        rootMargin: "0px 0px -8% 0px",  // margine inferiore per attivare un po' prima del bordo
      },
    );

    // Rimuove le classi vecchie e inizia ad osservare ogni elemento
    revealItems.forEach((item) => {
      item.classList.remove("reveal--in", "reveal--out-up", "reveal--out-down");
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [location.pathname]);
}

export default function App() {
  useRevealOnScroll();

  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/prezzi" element={<PricingPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/accedi" element={<LoginPage />} />
        <Route path="/termini" element={<TermsPage />} />
        <Route path="/account/*" element={<LoginPage fromAccountPath />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
