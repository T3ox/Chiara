import type { ChangeEvent, RefObject } from 'react';

type FolderActionsProps = {
  isAuthenticated: boolean;
  canConfirm: boolean;
  folderPickerRef: RefObject<HTMLInputElement | null>;
  onConfirm: () => Promise<void>;
  onPickerChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function FolderActions({
  isAuthenticated,
  canConfirm,
  folderPickerRef,
  onConfirm,
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

      <label className="btn-secondary">
        Seleziona cartella…
        <input ref={folderPickerRef} type="file" hidden multiple webkitdirectory="" onChange={onPickerChange} />
      </label>
    </div>
  );
}
