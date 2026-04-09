# Output Generation

## Purpose

Outputs turn reviewed material into usable artifacts.

## Output design principle

Outputs must be generated from scoped, inspectable inputs.

The system should later support generation constraints such as:

- verified claims only
- verified plus provisional claims
- selected decisions only
- exclusion of contested claims
- inclusion of unresolved tensions section

## Initial output types

### Briefing memo

Suggested structure:

- purpose
- current position
- supporting evidence
- tensions and uncertainties
- implications
- suggested next step

### Decision rationale

Suggested structure:

- decision
- rationale
- supporting claims
- counter-considerations
- dependencies
- review note

### Literature synthesis

Suggested structure:

- topic
- major claims
- convergences
- divergences
- unresolved issues
- working synthesis

### Stakeholder summary

Suggested structure:

- key point
- why it matters
- what supports it
- what is uncertain
- recommended action

## Output freshness

Outputs can become stale when underlying claims or decisions change.
The MVP should scaffold stale status and stale reason fields even if the first implementation is basic.
