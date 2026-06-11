import { useRef, useState } from 'react'
import type { NoteType } from '../hooks/useAlertNotes'

const NOTE_TYPES: NoteType[] = ['Observation', 'Hypothesis', 'Action']

interface AddNoteFormProps {
  onSubmit: (author: string, message: string, type: NoteType) => string | null
}

export function AddNoteForm({ onSubmit }: AddNoteFormProps) {
  const [author, setAuthor] = useState('')
  const [message, setMessage] = useState('')
  const [type, setType] = useState<NoteType>('Observation')
  const [error, setError] = useState<string | null>(null)
  const authorRef = useRef<HTMLInputElement>(null)

  const isDisabled = author.trim() === '' || message.trim() === ''

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const err = onSubmit(author, message, type)
    if (err) {
      setError(err)
    } else {
      setAuthor('')
      setMessage('')
      setType('Observation')
      setError(null)
      authorRef.current?.focus()
    }
  }

  return (
    <form className="add-note-form" onSubmit={handleSubmit} noValidate>
      {error && (
        <p className="note-error" role="alert">
          {error}
        </p>
      )}
      <div className="form-top-row">
        <input
          ref={authorRef}
          id="note-author"
          type="text"
          value={author}
          onChange={e => { setError(null); setAuthor(e.target.value) }}
          placeholder="Your name"
          aria-label="Author"
        />
        <select
          id="note-type"
          value={type}
          onChange={e => setType(e.target.value as NoteType)}
          aria-label="Note type"
          className="note-type-select"
        >
          {NOTE_TYPES.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <button type="submit" className="note-submit" disabled={isDisabled}>
          Add Note
        </button>
      </div>
      <div className="form-bottom-row">
        <textarea
          id="note-message"
          value={message}
          onChange={e => { setError(null); setMessage(e.target.value) }}
          placeholder="Add investigation note..."
          rows={3}
          aria-label="Note message"
        />
      </div>
    </form>
  )
}
