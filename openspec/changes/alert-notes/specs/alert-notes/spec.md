### Requirement: Input validation and normalization
The system SHALL validate and normalize user input before creating a note.

#### Scenario: Message contains only whitespace
- WHEN an engineer submits a message containing only whitespace
- THEN the system SHALL treat it as empty and show a validation error

#### Scenario: Input trimming
- WHEN an engineer submits a message or author with leading or trailing spaces
- THEN the system SHALL trim the input before saving

---

### Requirement: Note constraints
The system SHALL enforce limits on note content.

#### Scenario: Message exceeds maximum length
- WHEN an engineer enters a message longer than 200 characters
- THEN the system SHALL prevent submission and show an error

#### Scenario: Duplicate consecutive note
- WHEN an engineer submits the same message as the most recent note
- THEN the system SHALL prevent duplicate submission

---

### Requirement: Simplified ownership model (POC)
The system SHALL allow deletion of any note without enforcing user ownership.

#### Scenario: Delete without user identity
- WHEN an engineer clicks delete on any note
- THEN the system SHALL remove the note regardless of author

### Requirement: Empty state clarity
The system SHALL clearly guide users when no notes exist.

#### Scenario: First-time user
- WHEN no notes exist
- THEN the system SHALL display a helpful message like "No notes yet. Add one to start tracking investigation."

---

### Requirement: Improved UI layout and usability
The system SHALL present alert notes in a clean, readable layout that promotes usability.

#### Scenario: Centered container layout
- WHEN the alert notes section is rendered
- THEN the system SHALL display it in a centered, max-width card container with consistent padding

#### Scenario: Horizontal aligned form inputs
- WHEN the add-note form is rendered
- THEN the system SHALL display the author input and submit button on the same row, with the message textarea below

#### Scenario: Clear typography hierarchy
- WHEN a note is displayed
- THEN the system SHALL render the author name with primary emphasis, the timestamp in a secondary muted style, and the message body in standard body text

#### Scenario: Improved empty state message
- WHEN no notes exist
- THEN the system SHALL display the empty state message centered with muted styling distinct from note content

#### Scenario: Proper spacing and alignment
- WHEN multiple notes are displayed
- THEN the system SHALL render each note as a visually separated card with consistent vertical spacing between notes