## ADDED Requirements

### Requirement: Note type selection
The system SHALL allow a user to assign a type to a note when creating it. Valid types are: **Observation**, **Hypothesis**, **Action**.

#### Scenario: Default type on form open
- **WHEN** the add-note form is rendered
- **THEN** the type selector SHALL default to "Observation"

#### Scenario: User selects a different type
- **WHEN** a user selects "Hypothesis" or "Action" from the type selector and submits
- **THEN** the created note SHALL have the selected type stored in its record

#### Scenario: Type included in persisted note
- **WHEN** a note is successfully created
- **THEN** the `type` field SHALL be present in the localStorage record for that note

---

### Requirement: Timeline grouped by type
The system SHALL display notes grouped by their type, with fixed group order: Observations first, Hypotheses second, Actions third.

#### Scenario: Notes of mixed types
- **WHEN** notes of different types exist for an alert
- **THEN** the system SHALL render three sections in order: Observations, Hypotheses, Actions — each containing only notes of that type

#### Scenario: Empty group is hidden
- **WHEN** no notes exist for a given type
- **THEN** the system SHALL not render a section header or empty area for that type

#### Scenario: Chronological order within group
- **WHEN** a group contains multiple notes
- **THEN** the system SHALL display them in ascending chronological order (oldest first)

---

### Requirement: Type badge on note item
The system SHALL display the note type visually on each note card.

#### Scenario: Badge visible on rendered note
- **WHEN** a note is displayed in the timeline
- **THEN** the system SHALL show a badge or label indicating its type (e.g., "Observation", "Hypothesis", "Action")

---

### Requirement: Migration of legacy notes
The system SHALL migrate existing notes that have no `type` field to type "Observation" transparently.

#### Scenario: Legacy notes loaded from localStorage
- **WHEN** notes are loaded from localStorage and one or more notes have no `type` field
- **THEN** the system SHALL assign `type: "Observation"` to those notes before rendering, without requiring user action
