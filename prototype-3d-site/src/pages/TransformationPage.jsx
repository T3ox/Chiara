import { RouteFrame } from "../components/RouteFrame";
import { TransformationModule } from "../components/TransformationModule";

export function TransformationPage() {
  return (
    <RouteFrame
      eyebrow="Percorso dedicato"
      title="Prima / Dopo"
      summary="Il messaggio centrale del prodotto vive qui, in una pagina separata e focalizzata."
    >
      <TransformationModule />
    </RouteFrame>
  );
}
