## Why

The existing alert notes feature lets engineers attach free-text notes to an alert, but all notes look identical — there is no structure to distinguish what kind of information a note carries. During an active incident, an engineer cannot tell at a glance which notes are observations, which are working hypotheses, and which are actions taken. Evolving notes into a typed, structured timeline makes incidents easier to reason about and faster to resolve.

## What Changes

- **BREAKING**: `AlertNote` data model gains a required `type` field (`"Observation" | "Hypothesis" | "Action"`).
- Existing notes stored in localStorage without a `type` are migrated on load to default `"Observation"`.
- The add-note form gains a type selector (dropdown or segmented control).
- The timeline view groups notes by type AND preserves chronological order within each group.
- The `useAlertNotes` hook is updated to handle the new field and migration logic.
- `NoteItem` renders a type badge alongside the author/timestamp header.

## Capabilities

### New Capabilities
- `incident-timeline`: Structured investigation timeline with typed notes (Observation / Hypothesis / Action), grouping by type, and chronological order within groups.

### Modified Capabilities
- `alert-notes`: The core note data model, add-note form, and display requirements change to accommodate the `type` field and grouped timeline view.

## Impact

- `src/hooks/useAlertNotes.ts` — `AlertNote` interface updated; migration logic added to `useState` initializer
- `src/components/AddNoteForm.tsx` — type selector added to form
- `src/components/NoteItem.tsx` — type badge added to note header
- `src/components/NoteList.tsx` — replaced flat list with grouped timeline sections
- `src/components/AlertNotes.css` — type badge styles, group header styles
- No new external dependencies
