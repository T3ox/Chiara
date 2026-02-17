import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import HomePage from "./pages/HomePage";
import PricingPage from "./pages/PricingPage";
import PrivacyPage from "./pages/PrivacyPage";
import LoginPage from "./pages/LoginPage";
import TermsPage from "./pages/TermsPage";

function useRevealOnScroll() {
  const location = useLocation();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = Array.from(document.querySelectorAll(".reveal, .reveal-on-scroll"));
    if (!revealItems.length) return;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("reveal--in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("reveal--in");
          currentObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    revealItems.forEach((item) => {
      item.classList.remove("reveal--in");
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
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/accedi" element={<LoginPage />} />
        <Route path="/termini" element={<TermsPage />} />
        <Route path="/account/*" element={<LoginPage fromAccountPath />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
