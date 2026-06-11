# Feature: Alert Notes

## Requirements
R1: User can add a note
R2: Note cannot be empty or whitespace only
R3: Input should be trimmed before saving
R4: Notes should display in a list
R5: Show validation error for invalid input

## Acceptance Criteria
AC1: "   " → show error
AC2: "hello" → saved and shown
AC3: Input is trimmed before save

## UI
- Input field
- Add button
- Notes list
- Error message

## Tech
- React 19
- TypeScript
- Hooks only