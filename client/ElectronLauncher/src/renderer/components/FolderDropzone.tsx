import type { DragEvent } from 'react';
import { FolderIcon } from './icons';

type FolderDropzoneProps = {
  isAuthenticated: boolean;
  isDragOver: boolean;
  selectedPathLabel: string;
  onClick: () => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
};

export function FolderDropzone({
  isAuthenticated,
  isDragOver,
  selectedPathLabel,
  onClick,
  onDrop,
  onDragOver,
  onDragLeave
}: FolderDropzoneProps) {
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div
      className={`dropzone${isDragOver ? ' dragover' : ''}`}
      onClick={onClick}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick();
        }
      }}
    >
      <div>
        <div className="icon">
          <FolderIcon />
        </div>
        <div className="hint">Trascinare qui la cartella o cliccare per selezionare</div>
        <div className="selectedPath">{selectedPathLabel}</div>
      </div>
    </div>
  );
}
