## 1. Data Model & Storage Hook

- [x] 1.1 Define `AlertNote` TypeScript interface (`id`, `alertId`, `author`, `message`, `createdAt`)
- [x] 1.2 Implement `useAlertNotes(alertId)` custom hook with `addNote`, `deleteNote`, and `notes` state
- [x] 1.3 Implement localStorage read on mount (keyed by `alert-notes:<alertId>`)
- [x] 1.4 Implement localStorage write on every state change

## 2. UI Components

- [x] 2.1 Create `NoteList` component that renders notes in chronological order with author, timestamp, and message
- [x] 2.2 Add empty-state message to `NoteList` when no notes exist
- [x] 2.3 Create `NoteItem` component with a delete button that calls `deleteNote`
- [x] 2.4 Create `AddNoteForm` component with author and message fields and a submit button
- [x] 2.5 Add client-side validation to `AddNoteForm` (required author, required message) with inline error messages

## 3. Integration

- [x] 3.1 Create `AlertNotes` container component that composes `useAlertNotes`, `NoteList`, and `AddNoteForm`
- [x] 3.2 Integrate `AlertNotes` into the alert detail view in `App.tsx` (or relevant page component), passing `alertId`
- [x] 3.3 Wire `AddNoteForm` submit to call `addNote` and clear the form on success

## 4. Verification

- [x] 4.1 Verify adding a note persists after page refresh (localStorage)
- [x] 4.2 Verify deleting a note removes it from the list and localStorage
- [x] 4.3 Verify empty author or empty message blocks form submission and shows errors
- [x] 4.4 Verify multiple notes appear in chronological order

## 5. UI/UX Improvements

- [x] 5.1 Create `AlertNotes.css` with card container, spacing system, and typography tokens
- [x] 5.2 Improve `AlertNotes` container styling (centered, max-width, card layout)
- [x] 5.3 Refactor `AddNoteForm` layout to horizontal row (author + button) with full-width textarea below
- [x] 5.4 Disable submit button when author or message is empty (trim-aware)
- [x] 5.5 Auto-focus author input after successful submit
- [x] 5.6 Enhance `NoteItem` visual hierarchy (author bold/primary, timestamp muted, delete right-aligned)
- [x] 5.7 Improve empty state UI (centered, muted styling)
