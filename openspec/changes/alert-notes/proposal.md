## Why

In a monitoring system, when alerts fire (e.g., API latency, service downtime), engineers have no structured way to record investigation findings or coordinate responses on the alert itself. Adding notes directly to alerts reduces context-switching, speeds up resolution, and provides a clear audit trail of what was investigated and done.

## What Changes

- Introduce an **Alert Notes** capability: the ability to attach, view, and manage text notes on a specific alert.
- Each note captures the author, timestamp, and message body.
- Notes are displayed chronologically on the alert detail view.
- Any engineer can add a note; notes are persistent across sessions.

## Capabilities

### New Capabilities
- `alert-notes`: Allows users to add, list, and delete notes attached to a specific alert. Supports multi-user collaboration and investigation tracking.

### Modified Capabilities

## Impact

- New React components: alert note list, add-note form
- New data model: `AlertNote` (id, alertId, author, message, createdAt)
- API surface: CRUD endpoints for notes scoped to an alert (or client-side state if no backend)
- No breaking changes to existing alert display or routing
