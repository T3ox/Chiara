import { useState } from "react";
import { Scene3D } from "../components/Scene3D";
import { UIOverlayRoot } from "../components/UIOverlayRoot";

export function HomePage({ activeHotspot, onSelectHotspot }) {
  const [resetSignal, setResetSignal] = useState(0);

  return (
    <div className="home-scene-shell">
      <Scene3D activeHotspot={activeHotspot} onSelectHotspot={onSelectHotspot} resetSignal={resetSignal} />
      <UIOverlayRoot onResetView={() => setResetSignal((value) => value + 1)} />
    </div>
  );
}
