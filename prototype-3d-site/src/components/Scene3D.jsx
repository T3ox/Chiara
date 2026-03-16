import { SceneCanvas } from "../scene/SceneCanvas";

export function Scene3D({ activeHotspot, onSelectHotspot, resetSignal }) {
  return (
    <div className="scene-root">
      <SceneCanvas activeHotspot={activeHotspot} onSelectHotspot={onSelectHotspot} resetSignal={resetSignal} />
    </div>
  );
}
