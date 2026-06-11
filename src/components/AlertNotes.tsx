import { useAlertNotes } from '../hooks/useAlertNotes'
import { NoteList } from './NoteList'
import { AddNoteForm } from './AddNoteForm'
import './AlertNotes.css'

interface AlertNotesProps {
  alertId: string
}

export function AlertNotes({ alertId }: AlertNotesProps) {
  const { notes, addNote, deleteNote } = useAlertNotes(alertId)

  return (
    <section className="alert-notes">
      <h2>Alert Notes</h2>
      <NoteList notes={notes} onDelete={deleteNote} />
      <AddNoteForm onSubmit={addNote} />
    </section>
  )
}
