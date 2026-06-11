## Context

This is a React + TypeScript + Vite application representing a monitoring dashboard. Currently, when an alert fires (e.g., "API latency > 2s"), engineers have no structured way to attach investigation notes to it. Notes must live alongside the alert to reduce context-switching and preserve investigation history.

There is no existing backend; state management is client-side for this iteration.

## Goals / Non-Goals

**Goals:**
- Allow any engineer to add a text note to a specific alert
- Display notes in chronological order on the alert detail view
- Support deleting a note
- Persist notes across page refreshes (localStorage)

**Non-Goals:**
- Real-time sync or multi-user live collaboration (no WebSocket/SSE)
- Note editing after creation
- Rich text / markdown formatting
- Authentication or author identity verification
- Backend API integration (deferred to a future change)

## Decisions

### Client-side state + localStorage for persistence
**Decision**: Store alert notes in React state with localStorage as the persistence layer.

**Rationale**: There is no backend in scope. localStorage provides zero-infrastructure persistence that survives page refreshes without requiring a server.

**Alternatives considered**:
- `sessionStorage`: rejected — notes disappear on tab close, defeating the purpose
- In-memory only: rejected — no persistence across refreshes
- Backend API: out of scope for this change; can be swapped in later by replacing the storage adapter

### Single `useAlertNotes` hook as the data layer
**Decision**: Encapsulate all CRUD logic in a custom hook (`useAlertNotes`) that abstracts storage.

**Rationale**: Keeps components free of storage concerns and makes the storage backend swappable (localStorage → API) without changing UI components.

### Flat note model: `AlertNote`
**Decision**: Notes are flat records `{ id, alertId, author, message, createdAt }`.

**Rationale**: Simple, serializable to JSON for localStorage, covers all display requirements. No thread/reply nesting needed (non-goal).

## Risks / Trade-offs

- **localStorage 5 MB limit** → Mitigation: notes are small text records; in practice this is unlikely to be hit before a backend is introduced.
- **No real author identity** → Mitigation: author is a free-text field supplied by the user; out of scope to enforce identity.
- **Data is device-local** → Mitigation: accepted for this MVP; a future backend change will address cross-device sync.

---

## UI Layout Design

### Container layout
The `AlertNotes` section is centered with a max-width of `640px` and a card appearance (border, border-radius, padding) using the existing CSS custom properties (`--border`, `--bg`, `--shadow`). This keeps it visually distinct from the page background without importing any external UI library.

### Form layout (AddNoteForm)
- **Row 1**: Author label + input + Submit button — horizontally aligned via `display: flex; gap`.
- **Row 2**: Message textarea spanning full width below.
- The submit button is **disabled** when author or message is empty (after trim), providing immediate affordance that the form is incomplete.
- On successful submit the author field receives focus to speed up consecutive note entry.

### Note item structure (NoteItem)
```
┌──────────────────────────────────────┐
│  [Author — bold]  [timestamp — muted]  [Delete →]  │
│  Message body text                   │
└──────────────────────────────────────┘
```
- Header row: `display: flex; justify-content: space-between; align-items: baseline`.
- Delete button aligned to the right of the header row.
- Message below the header with top margin.

### Typography hierarchy
| Element   | Style                          |
|-----------|-------------------------------|
| Author    | `font-weight: 600`, `--text-h` |
| Timestamp | `font-size: 0.8em`, `--text` (muted) |
| Message   | Normal body, `--text`          |
| Error     | `color: #c0392b`, small        |

### Spacing system
- Note card padding: `12px 16px`
- Gap between notes: `10px`
- Container padding: `24px`
- Form gap: `8px`

### Approach
No external UI libraries. All styles delivered via a dedicated `AlertNotes.css` file imported by `AlertNotes.tsx`, using existing CSS custom properties from `index.css` for colour and shadow tokens.
