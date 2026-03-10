import { useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { FeaturesPage } from "./pages/FeaturesPage";
import { GuidePage } from "./pages/GuidePage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TransformationPage } from "./pages/TransformationPage";
import { WorkflowPage } from "./pages/WorkflowPage";

function AppRouter() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeHotspot, setActiveHotspot] = useState("assistant");

  const handleSelectHotspot = (hotspot) => {
    setActiveHotspot(hotspot.id);
    navigate(hotspot.route);
  };

  return (
    <div className={location.pathname === "/" ? "app-shell is-home" : "app-shell"}>
      <Routes>
        <Route path="/" element={<HomePage activeHotspot={activeHotspot} onSelectHotspot={handleSelectHotspot} />} />
        <Route path="/prima-dopo" element={<TransformationPage />} />
        <Route path="/workflow" element={<WorkflowPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return <AppRouter />;
}
