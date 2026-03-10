import { InfoListModule } from "../components/InfoListModule";
import { RouteFrame } from "../components/RouteFrame";
import { privacyPoints } from "../data/content";

export function PrivacyPage() {
  return (
    <RouteFrame
      eyebrow="Percorso derivato"
      title="Privacy"
      summary="Informazioni di governance e controllo, separate dalla homepage per non appesantire la scena."
    >
      <InfoListModule
        eyebrow="Privacy-first"
        items={privacyPoints}
        summary="Questa area raccoglie il messaggio di controllo in modo compatto e professionale."
        title="Governance e responsabilita operativa"
      />
    </RouteFrame>
  );
}
