# Change Detection

## Purpose

The system should help users understand what changed when new evidence or sources are added.

## Why this matters

A knowledge system is more useful when it can identify not just new material, but the consequences of that material.

## Change targets

The system should eventually detect:

- new claims
- changed claims
- added supporting evidence
- contradictions introduced
- decisions affected
- outputs that may be stale

## MVP expectation

The first version may implement simple stale scaffolding rather than full comparison logic.

At minimum, the system should support fields such as:

- staleStatus
- staleReason

And it should make room for processing-run comparisons later.

## Future direction

A stronger change detection system may later compare:

- source content hashes
- source reprocessing runs
- claim lineage
- changed claim statuses
- new tensions opened
- decision dependency updates
