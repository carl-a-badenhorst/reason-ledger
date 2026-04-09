# Obsidian Sync

## Purpose

Obsidian is used as a markdown-based working surface, not as the canonical structured store.

## Sync principle

The backend owns structure.
The vault supports navigation, writing, and bounded note editing.

## Vault structure

Projected notes should be written into deterministic folders such as:

- 00-dashboard
- 01-sources
- 02-evidence
- 03-claims
- 04-tensions
- 05-decisions
- 06-outputs
- 07-notes
- 08-templates
- 99-system

## Two note zones

### System-managed zone

Includes:

- object metadata
- canonical links
- provenance references
- status fields
- generated summaries
- stale flags

### Editable zone

Includes user-authored sections enclosed by markers like:

<!-- editable:start:human-review-notes -->
Text
<!-- editable:end:human-review-notes -->

Only approved editable blocks sync back to the backend.

## Backend-owned fields

The backend is authoritative for:

- id
- type
- timestamps
- structured links
- provenance references
- statuses
- sync metadata

User edits to these in the vault must not silently overwrite backend state.

## Freeform notes

A separate notes folder may hold user-authored markdown notes.
These are useful for working and thinking, but they are not canonical structured objects.

## Sync conflict handling

When export and editable-block import drift from one another, conflicts should be explicit.
A sync record should track hashes and conflict state.

## Dashboard notes

Dashboard notes are regenerated projections and should be treated as read-only.
