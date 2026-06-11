# Project Name: OpenSpec SDD POC

## Table of Contents
1. [About the Project](#about-the-project)
2. [OpenSpec SDD Workflow](#openspec-sdd-workflow)
3. [Features Implemented](#features-implemented)
4. [Technologies Used](#technologies-used)
5. [Getting Started](#getting-started)
6. [Project Structure](#project-structure)
7. [Changes & Design Decisions](#changes--design-decisions)
8. [Usage](#usage)
9. [License](#license)

---

## About the Project

This project is a **Proof of Concept (POC)** that demonstrates the **OpenSpec SDD (Spec-Driven Development)** workflow using a real React 19 + TypeScript application as the implementation target.

The application models a **monitoring dashboard** where engineers can attach structured investigation notes to alerts — evolving from a simple free-text note system into a typed, grouped incident timeline. Every feature was designed, specified, and implemented end-to-end using the OpenSpec process.

- Engineers can attach investigation notes directly to a monitoring alert, reducing context-switching during incident response.
- Notes are persisted across page refreshes using **localStorage** — no backend required.
- Notes support a **type** classification: `Observation`, `Hypothesis`, or `Action`, providing structured reasoning during incidents.
- The timeline groups notes by type (Observations → Hypotheses → Actions) while preserving chronological order within each group.
- Legacy notes without a `type` field are **automatically migrated** to `Observation` on load.

---

## OpenSpec SDD Workflow

OpenSpec is a **spec-driven development** methodology where every feature change is documented through a structured set of artifacts before and during implementation. This POC validates that workflow end-to-end.

### Workflow Stages

```
Propose → Design → Spec → Tasks → Implement → Archive
```

| Stage        | Artifact         | Purpose                                                                 |
|--------------|------------------|-------------------------------------------------------------------------|
| **Propose**  | `proposal.md`    | Captures *why* the change is needed, *what* changes, and its impact     |
| **Design**   | `design.md`      | Records architectural decisions, trade-offs, and UI/UX layout details   |
| **Spec**     | `specs/<cap>/spec.md` | Formal requirements and acceptance scenarios (Given/When/Then)    |
| **Tasks**    | `tasks.md`       | Checklist of concrete implementation tasks, checked off as completed    |
| **Implement**| Source code      | Actual code changes guided by the tasks checklist                       |
| **Archive**  | `archive/`       | Completed changes moved here once implementation is verified            |

### OpenSpec CLI Commands Used

```bash
# List all active changes
openspec list --json

# Check change status and schema
openspec status --change "<name>" --json

# Get implementation instructions for a change
openspec instructions apply --change "<name>" --json
```

The project uses the **`spec-driven`** schema (configured in `openspec/config.yaml`), where every change must have a proposal, design document, specs, and tasks before implementation begins.

### Change Lifecycle (as practiced in this POC)

```
openspec/
  changes/
    <change-name>/
      proposal.md      ← Why & what
      design.md        ← How & trade-offs
      tasks.md         ← Implementation checklist
      specs/
        <capability>/
          spec.md      ← Formal acceptance criteria
  archive/             ← Completed changes land here
```

---

## Features Implemented

### Change 1 — `alert-notes`
**Goal**: Allow engineers to attach, view, and delete investigation notes on a specific alert.

- `AlertNote` data model: `{ id, alertId, author, message, createdAt, type }`
- `useAlertNotes(alertId)` custom hook encapsulates all CRUD logic and localStorage persistence
- Notes are keyed in localStorage as `alert-notes:<alertId>`
- Form validation: required author, required message, max 200 characters, no duplicate consecutive notes
- Input is trimmed before saving
- Auto-focus on author field after successful submit to speed up consecutive note entry
- Empty state with a helpful prompt: *"No notes yet. Add one to start tracking investigation."*
- Fully styled using CSS custom properties — no external UI libraries

### Change 2 — `smart-incident-timeline`
**Goal**: Evolve flat notes into a structured, typed incident timeline.

- **BREAKING** data model addition: `type: "Observation" | "Hypothesis" | "Action"` on `AlertNote`
- **Transparent migration**: legacy notes in localStorage without a `type` are silently upgraded to `"Observation"` on load — no user action required
- Type selector (`<select>`) added to `AddNoteForm`, defaulting to `"Observation"`
- `NoteList` groups notes by type in fixed investigation order: **Observations → Hypotheses → Actions**
- Empty groups are hidden (no orphan section headers rendered)
- Chronological order preserved within each group
- Type **badge** rendered on each `NoteItem` with distinct accent colours per type (`badge-observation`, `badge-hypothesis`, `badge-action`)
- `useAlertNotes` hook updated: `addNote(author, message, type)` signature extended

---

## Technologies Used

- **React 19**: Frontend library for building user interfaces.
- **TypeScript ~6.0**: Static typing for safety and maintainability.
- **Vite 8**: Build tool and development server with HMR.
- **ESLint 10**: Linting with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`.
- **localStorage**: Client-side persistence — no backend required for this POC.
- **CSS Custom Properties**: Token-based theming (`--bg`, `--border`, `--shadow`, `--text-h`) — no external CSS framework.
- **OpenSpec CLI**: Spec-driven development workflow tooling (`spec-driven` schema).

---

## Getting Started

### Prerequisites
- Node.js (latest LTS version)
- npm or yarn package manager
- OpenSpec CLI (for contributing new changes)

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/openspec-sdd-poc.git
    ```
2. Navigate to the project directory:
    ```bash
    cd openspec-sdd-poc
    ```
3. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Project
1. Start the development server:
    ```bash
    npm run dev
    ```
2. Open your browser and navigate to `http://localhost:5173`.

### Other Scripts
```bash
npm run build    # Production build (tsc + vite build)
npm run preview  # Preview production build locally
npm run lint     # Run ESLint across the project
```

---

## Project Structure

```
openspec-sdd-poc/
├── openspec/                        # OpenSpec SDD workflow artifacts
│   ├── config.yaml                  # Schema config (spec-driven)
│   ├── changes/
│   │   ├── alert-notes/             # Change 1: Alert Notes feature
│   │   │   ├── proposal.md          # Why & what
│   │   │   ├── design.md            # Architecture & UI decisions
│   │   │   ├── tasks.md             # Implementation checklist (all ✅)
│   │   │   └── specs/
│   │   │       └── alert-notes/
│   │   │           └── spec.md      # Formal acceptance scenarios
│   │   └── smart-incident-timeline/ # Change 2: Typed incident timeline
│   │       ├── proposal.md
│   │       ├── design.md
│   │       ├── tasks.md             # Implementation checklist (all ✅)
│   │       └── specs/
│   │           ├── alert-notes/
│   │           │   └── spec.md      # Modified requirements
│   │           └── incident-timeline/
│   │               └── spec.md      # New requirements (type, grouping, migration)
│   └── archive/                     # Completed & archived changes
│
├── src/
│   ├── components/
│   │   ├── AlertNotes.tsx           # Container: composes hook + NoteList + AddNoteForm
│   │   ├── AlertNotes.css           # All component styles (CSS custom properties)
│   │   ├── NoteList.tsx             # Grouped timeline display
│   │   ├── NoteItem.tsx             # Single note card with type badge + delete
│   │   └── AddNoteForm.tsx          # Add-note form with validation & type selector
│   ├── hooks/
│   │   └── useAlertNotes.ts         # Data layer: AlertNote model, CRUD, localStorage, migration
│   ├── assets/
│   ├── App.tsx                      # Mounts <AlertNotes alertId="alert-api-latency-001" />
│   ├── App.css
│   ├── index.css                    # Global CSS tokens (--bg, --border, --text-h, --shadow)
│   └── main.tsx                     # Entry point
│
├── public/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.js
└── package.json
```

---

## Changes & Design Decisions

### Data Model

```typescript
type NoteType = 'Observation' | 'Hypothesis' | 'Action'

interface AlertNote {
  id: string          // crypto.randomUUID()
  alertId: string     // scopes note to an alert
  author: string      // free-text (trimmed)
  message: string     // free-text, max 200 chars (trimmed)
  createdAt: string   // ISO 8601 timestamp
  type: NoteType      // added in smart-incident-timeline change
}
```

### Key Design Decisions

| Decision | Rationale |
|---|---|
| **localStorage for persistence** | No backend in scope; survives page refresh with zero infrastructure |
| **Single `useAlertNotes` hook as data layer** | Keeps components storage-agnostic; swap localStorage → API without touching UI |
| **`NoteType` as string union, not enum** | Serializes cleanly to/from JSON; no display-name mapping needed |
| **Migration inside `useState` initializer** | Zero-cost, happens once on mount, transparent to the rest of the app |
| **Grouping in `NoteList`, not in the hook** | Grouping is a presentation concern; hook stays a pure data layer |
| **`<select>` for type selector** | Minimal markup, zero dependencies, accessible by default |
| **No external UI libraries** | All styles via CSS custom properties from `index.css`; keeps bundle lean |
| **Group render order: Observation → Hypothesis → Action** | Matches natural investigation flow; predictable for engineers |

### Validation Rules (enforced in `useAlertNotes.addNote`)
- Author is required (after trim)
- Message is required (after trim)
- Message max length: **200 characters**
- Duplicate consecutive note (same message as most recent) is rejected

---

## Usage

- **Add a note**: Enter your name, select a note type (Observation / Hypothesis / Action), type your message, and click **Add Note**.
- **View notes**: Notes are grouped by type in fixed order — Observations, then Hypotheses, then Actions. Within each group, notes appear chronologically (oldest first).
- **Delete a note**: Click the **Delete** button on any note card. Any note can be deleted regardless of author (simplified ownership model for this POC).
- **Persistence**: Notes survive page refreshes automatically via localStorage. Closing and reopening the tab will restore all notes.
- **Legacy data**: If notes were saved before the `type` field was introduced, they will automatically appear as **Observations** on next load.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this README further based on your project's specific requirements.
