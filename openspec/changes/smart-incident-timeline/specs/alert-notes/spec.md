## MODIFIED Requirements

### Requirement: Add a note to an alert
The system SHALL allow an engineer to attach a new typed note to a specific alert. The note SHALL include an author, message, and a type selected from: Observation, Hypothesis, Action.

#### Scenario: Successful note submission with type
- **WHEN** an engineer enters a non-empty author name, message, and selects a type, then submits the add-note form
- **THEN** the system SHALL create a new note with a unique ID, the current timestamp, the selected type, persist it to localStorage, and display it in the correct type group immediately

#### Scenario: Submission with empty message
- **WHEN** an engineer attempts to submit the add-note form with an empty message field
- **THEN** the system SHALL prevent submission and display a validation error indicating the message is required

#### Scenario: Submission with empty author
- **WHEN** an engineer attempts to submit the add-note form with an empty author field
- **THEN** the system SHALL prevent submission and display a validation error indicating the author is required
