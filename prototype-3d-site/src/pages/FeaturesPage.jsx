import { InsightCarouselModule } from "../components/InsightCarouselModule";
import { RouteFrame } from "../components/RouteFrame";

export function FeaturesPage() {
  return (
    <RouteFrame
      eyebrow="Percorso derivato"
      title="Features"
      summary="Il carosello informativo resta disponibile, ma fuori dalla home principale."
    >
      <InsightCarouselModule />
    </RouteFrame>
  );
}
