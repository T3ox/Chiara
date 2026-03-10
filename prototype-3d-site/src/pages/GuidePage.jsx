import { InfoListModule } from "../components/InfoListModule";
import { RouteFrame } from "../components/RouteFrame";
import { guidePoints } from "../data/content";

export function GuidePage() {
  return (
    <RouteFrame
      eyebrow="Percorso derivato"
      title="Guide"
      summary="L'assistente IA e raccontato qui come presenza di orientamento, non come box fisso in home."
    >
      <InfoListModule
        eyebrow="AI guide"
        items={guidePoints}
        summary="Una vista dedicata alla funzione della guida dentro il prototipo."
        title="Come l'assistente accompagna la navigazione"
      />
    </RouteFrame>
  );
}
