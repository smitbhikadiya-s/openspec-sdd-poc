import type { AlertNote } from '../hooks/useAlertNotes'

interface NoteItemProps {
  note: AlertNote
  onDelete: (id: string) => void
}

export function NoteItem({ note, onDelete }: NoteItemProps) {
  return (
    <div className="note-item">
      <div className="note-header">
        <span className="note-author">{note.author}</span>
        <span className="note-time">{new Date(note.createdAt).toLocaleString()}</span>
        <span className={`note-badge badge-${note.type.toLowerCase()}`}>{note.type}</span>
        <button
          type="button"
          className="note-delete"
          onClick={() => onDelete(note.id)}
          aria-label={`Delete note by ${note.author}`}
        >
          Delete
        </button>
      </div>
      <p className="note-message">{note.message}</p>
    </div>
  )
}
