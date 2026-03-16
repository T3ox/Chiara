import { RouteFrame } from "../components/RouteFrame";
import { WorkflowModule } from "../components/WorkflowModule";

export function WorkflowPage() {
  return (
    <RouteFrame
      eyebrow="Percorso derivato"
      title="Workflow"
      summary="Una vista focalizzata sul percorso operativo, separata dalla home 3D."
    >
      <WorkflowModule />
    </RouteFrame>
  );
}
