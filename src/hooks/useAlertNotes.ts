import { useState, useEffect } from 'react'

export type NoteType = 'Observation' | 'Hypothesis' | 'Action'

export interface AlertNote {
  id: string
  alertId: string
  author: string
  message: string
  createdAt: string // ISO 8601 timestamp
  type: NoteType
}

const MAX_MESSAGE_LENGTH = 200

function storageKey(alertId: string): string {
  return `alert-notes:${alertId}`
}

function migrateNotes(raw: unknown[]): AlertNote[] {
  return raw.map(n => ({
    ...(n as AlertNote),
    type: (n as Partial<AlertNote>).type ?? 'Observation',
  }))
}

export function useAlertNotes(alertId: string) {
  const [notes, setNotes] = useState<AlertNote[]>(() => {
    try {
      const raw = localStorage.getItem(storageKey(alertId))
      return raw ? migrateNotes(JSON.parse(raw) as unknown[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(storageKey(alertId), JSON.stringify(notes))
  }, [alertId, notes])

  function addNote(author: string, message: string, type: NoteType): string | null {
    const trimmedAuthor = author.trim()
    const trimmedMessage = message.trim()

    if (!trimmedAuthor) return 'Author is required.'
    if (!trimmedMessage) return 'Message is required.'
    if (trimmedMessage.length > MAX_MESSAGE_LENGTH)
      return `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`
    if (notes.length > 0 && notes[notes.length - 1].message === trimmedMessage)
      return 'Duplicate: this is the same as the most recent note.'

    const note: AlertNote = {
      id: crypto.randomUUID(),
      alertId,
      author: trimmedAuthor,
      message: trimmedMessage,
      createdAt: new Date().toISOString(),
      type,
    }
    setNotes(prev => [...prev, note])
    return null
  }

  function deleteNote(id: string): void {
    setNotes(prev => prev.filter(n => n.id !== id))
  }

  return { notes, addNote, deleteNote }
}
