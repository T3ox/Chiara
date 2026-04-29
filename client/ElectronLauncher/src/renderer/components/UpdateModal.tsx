import { ProgressBar } from './ProgressBar';

export type UpdateModalState = {
  visible: boolean;
  currentVersion: string;
  newVersion: string;
  releaseNotes: string;
  downloadUrl: string | null;
  progressVisible: boolean;
  progressPercent: number;
  progressText: string;
  updateButtonText: string;
  updateDisabled: boolean;
  ignoreDisabled: boolean;
};

type UpdateModalProps = {
  state: UpdateModalState;
  onIgnore: () => void;
  onUpdate: () => void;
};

export function UpdateModal({ state, onIgnore, onUpdate }: UpdateModalProps) {
  if (!state.visible) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Aggiornamento Disponibile</h2>
        <div className="version-info">
          <p>Versione attuale: {state.currentVersion}</p>
          <p id="updateModalNewVersion">Nuova versione disponibile: {state.newVersion}</p>
        </div>
        <textarea readOnly className="release-notes" value={state.releaseNotes} />

        {state.progressVisible && (
          <ProgressBar label={state.progressText} percentage={state.progressPercent} className="progress-container" />
        )}

        <div className="modal-actions">
          <button className="btn btn-secondary" type="button" onClick={onIgnore} disabled={state.ignoreDisabled}>
            Ignora
          </button>
          <button className="btn" type="button" onClick={onUpdate} disabled={state.updateDisabled}>
            {state.updateButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}
