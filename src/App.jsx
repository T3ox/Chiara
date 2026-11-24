import { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import LegalPage from "./pages/LegalPage";

// the journey brings its own 3D road and HUD: it loads when someone opens it
const Journey = lazy(() => import("./pages/Journey"));

// a new page starts from its top; a link to one place in a page (#...) is left to that page
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/index.html" element={<Home />} />
          <Route path="/percorso" element={<Journey />} />
          <Route path="/privacy" element={<LegalPage kind="privacy" />} />
          <Route path="/termini" element={<LegalPage kind="termini" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}
