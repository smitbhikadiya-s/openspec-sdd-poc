## Context

The existing alert-notes feature stores flat `AlertNote` records `{ id, alertId, author, message, createdAt }` in localStorage and displays them in a single chronological list. There is no distinction between different kinds of notes — an engineer's raw observation looks identical to a confirmed hypothesis or a remediation action taken.

This change evolves that flat list into a structured incident timeline by adding a `type` discriminator to each note and rendering notes grouped by type. All data remains client-side (localStorage); no backend is introduced.

## Goals / Non-Goals

**Goals:**
- Add a `type` field (`"Observation" | "Hypothesis" | "Action"`) to `AlertNote`
- Migrate existing localStorage notes (no `type`) to `"Observation"` on read
- Allow the user to select the type when adding a note
- Display notes grouped by type, maintaining chronological order within each group
- Show a type badge on each note item

**Non-Goals:**
- Changing the type of an existing note after creation
- Filtering notes by type (hide/show groups)
- Multi-alert / cross-alert timelines
- Backend persistence (deferred)
- Drag-and-drop reordering

## Decisions

### `type` as a string union, not an enum
**Decision**: Define `NoteType = "Observation" | "Hypothesis" | "Action"` as a TypeScript string union.

**Rationale**: Serializes cleanly to/from JSON in localStorage with no extra mapping step. Easy to extend later.

**Alternatives considered**:
- Numeric enum: harder to read in localStorage and requires a display-name map.
- Object with label/value: over-engineered for three values.

### Migration on read inside `useState` initializer
**Decision**: When loading notes from localStorage, any note missing a `type` field is assigned `"Observation"` in the same `useState` initializer call before first render.

**Rationale**: Zero-cost migration — happens once on mount, transparent to the rest of the app. No separate migration script or version flag needed for a localStorage-only MVP.

**Risk**: If the schema ever grows more complex, this inline migration pattern won't scale. At that point, introduce an explicit version key in localStorage.

### Grouping in `NoteList`, not in the hook
**Decision**: The `useAlertNotes` hook returns notes in flat chronological order (as before). `NoteList` is responsible for grouping them by type for display.

**Rationale**: Keeps the hook a pure data layer. Grouping is a presentation concern and may change (e.g., switch to a flat view) without touching storage logic.

### Group render order: Observation → Hypothesis → Action
**Decision**: Fixed display order of groups matches the natural investigation flow.

**Alternatives considered**: Alphabetical (confusing), dynamic (order of first occurrence — unpredictable).

### Type selector as a `<select>` element
**Decision**: A native `<select>` dropdown for choosing the note type, defaulting to `"Observation"`.

**Rationale**: Minimal markup, zero dependencies, accessible by default. A segmented button control would require custom CSS and keyboard handling.

## Risks / Trade-offs

- **BREAKING data model change** → Mitigation: migration on read makes it backwards-compatible for existing localStorage data; no user action required.
- **Group ordering hides time across groups** → Mitigation: within each group, chronological order is preserved. The trade-off is accepted per requirements.
- **`type` cannot be changed after creation** → Mitigation: user can delete and re-add the note with the correct type (non-goal to support editing).

## Migration Plan

1. Deploy updated `useAlertNotes` hook — existing notes in localStorage are silently upgraded to `type: "Observation"` on next page load.
2. No rollback concern — if the feature is reverted, the `type` field is ignored by older code; localStorage data is not corrupted.
