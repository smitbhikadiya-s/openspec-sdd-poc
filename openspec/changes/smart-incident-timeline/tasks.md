## 1. Data Model Update

- [x] 1.1 Add `NoteType` union type (`"Observation" | "Hypothesis" | "Action"`) to `useAlertNotes.ts`
- [x] 1.2 Add `type` field to `AlertNote` interface
- [x] 1.3 Update `useState` initializer to migrate legacy notes (no `type`) to `"Observation"` on load
- [x] 1.4 Update `addNote` function signature to accept `type: NoteType` and include it in the created note

## 2. Form Update

- [x] 2.1 Add `type` state (default `"Observation"`) to `AddNoteForm`
- [x] 2.2 Add `<select>` type selector with options: Observation, Hypothesis, Action
- [x] 2.3 Pass selected `type` to `onSubmit` callback
- [x] 2.4 Reset type selector to `"Observation"` after successful submit
- [x] 2.5 Update `AddNoteFormProps.onSubmit` signature to include `type` parameter

## 3. Note Item Update

- [x] 3.1 Add `type` prop to `NoteItem` (received from `AlertNote.type`)
- [x] 3.2 Render a type badge in the note header (alongside author/timestamp)
- [x] 3.3 Add CSS classes for each badge variant (`badge-observation`, `badge-hypothesis`, `badge-action`) with distinct accent colours

## 4. Timeline Grouping

- [x] 4.1 Update `NoteList` to group notes by type in fixed order: Observations → Hypotheses → Actions
- [x] 4.2 Render a section heading per group (only when group is non-empty)
- [x] 4.3 Within each group render notes in chronological order
- [x] 4.4 Render the global empty state only when all groups are empty
- [x] 4.5 Add CSS styles for group section headings

## 5. Verification

- [x] 5.1 Verify adding an "Action" note places it in the Actions group
- [x] 5.2 Verify existing localStorage notes without `type` are shown as Observations after reload
- [x] 5.3 Verify empty groups are not rendered
- [x] 5.4 Verify chronological order is preserved within each group
- [x] 5.5 Verify type badge is visible on each note card
