import type { AlertNote, NoteType } from '../hooks/useAlertNotes'
import { NoteItem } from './NoteItem'

interface NoteListProps {
  notes: AlertNote[]
  onDelete: (id: string) => void
}

const GROUP_ORDER: NoteType[] = ['Observation', 'Hypothesis', 'Action']

export function NoteList({ notes, onDelete }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <p className="note-empty">
        No notes yet. Add one to start tracking investigation.
      </p>
    )
  }

  return (
    <div className="note-list">
      {GROUP_ORDER.map(type => {
        const group = notes.filter(n => n.type === type)
        if (group.length === 0) return null
        return (
          <div key={type} className="note-group">
            <h3 className="note-group-heading">{type}s</h3>
            {group.map(note => (
              <NoteItem key={note.id} note={note} onDelete={onDelete} />
            ))}
          </div>
        )
      })}
    </div>
  )
}
