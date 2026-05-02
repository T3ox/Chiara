import type { ChangeEvent, RefObject } from 'react';

type FolderActionsProps = {
  isAuthenticated: boolean;
  canConfirm: boolean;
  canUndo: boolean;
  isUndoing: boolean;
  folderPickerRef: RefObject<HTMLInputElement | null>;
  onConfirm: () => Promise<void>;
  onUndo: () => Promise<void>;
  onPickerChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function FolderActions({
  isAuthenticated,
  canConfirm,
  canUndo,
  isUndoing,
  folderPickerRef,
  onConfirm,
  onUndo,
  onPickerChange
}: FolderActionsProps) {
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="actions">
      <button className="btn" type="button" disabled={!canConfirm} onClick={onConfirm}>
        Conferma Selezione
      </button>

      <button className="btn-secondary" type="button" disabled={!canUndo || isUndoing} onClick={onUndo}>
        {isUndoing ? 'Annullamento...' : 'Annulla modifiche'}
      </button>

      <label className="btn-secondary">
        Seleziona cartella…
        <input ref={folderPickerRef} type="file" hidden multiple webkitdirectory="" onChange={onPickerChange} />
      </label>
    </div>
  );
}
