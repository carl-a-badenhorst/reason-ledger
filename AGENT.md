## Mission

Build **Reason Ledger** as an evidence-first reasoning workbench with:

- a structured canonical backend
- a Next.js review and workflow app
- an Obsidian vault as a synced markdown working surface

This is not a generic second-brain product.

---

## Product framing

Reason Ledger helps users move from:

raw sources -> evidence -> claims -> tensions -> decisions -> outputs

The system must preserve provenance, support review, surface uncertainty, and generate usable outputs.

---

## Product constraints

Always preserve these constraints:

- provenance required
- explicit object typing required
- explicit status model required
- human review required
- contradiction surfaced, not hidden
- outputs must be operational
- change awareness required
- Obsidian is not canonical for structure

---

## Anti-goals

Do not build:

- a note app clone
- a generic wiki
- a graph toy
- chat-first UX
- autonomous unreviewed reasoning presented as authoritative
- a single generic note type for everything
- freeform markdown as the only storage layer

---

## Canonical object types

Implement and preserve the distinction between:

- source
- source-segment
- evidence
- claim
- tension
- decision
- output
- review-event
- sync-record

Do not collapse these into one model.

---

## Status rules

### claim

- extracted
- needs-review
- verified
- contested
- provisional
- rejected
- superseded

### tension

- open
- under-review
- resolved
- deferred

### decision

- proposed
- accepted
- rejected
- provisional
- superseded

### output

- draft
- reviewed
- published
- stale

Do not invent undocumented state transitions.

---

## Architecture rules

### 1. Database is canonical

Backend owns:

- IDs
- relationships
- statuses
- provenance fields
- review history
- stale logic
- sync metadata

### 2. Obsidian is bounded

Obsidian may hold:

- projected markdown notes
- editable commentary blocks
- local synthesis notes
- navigation and dashboard projections

### 3. Editable blocks only

Only approved editable markdown sections sync back.

### 4. Preserve raw vs derived

Never overwrite imported source material with generated content.

### 5. Prefer explicitness

Use readable schemas, relation tables, and clear module boundaries.

---

## Stack rules

Default stack:

- Next.js App Router
- TypeScript
- Prisma
- PostgreSQL
- Tailwind
- shadcn/ui
- Zod

Prefer low-dependency designs.

Optional later:

- background workers
- pgvector
- auth
- URL ingestion
- multi-workspace

---

## File and naming rules

Use:

- lowercase-hyphen file naming where applicable
- clear semantic names
- no vague names like smart-core, memory-engine, or brain-layer

Prefer explicit folder names aligned to product objects.

---

## Cursor rules

Project rules for the AI agent live in [.cursor/rules/](.cursor/rules/) (layered `.mdc` files). Prefer updating those rules when conventions change, and keep `docs/` in sync.

---

## Documentation requirements

Maintain these files:

- README.md
- docs/product-overview.md
- docs/architecture.md
- docs/data-model.md
- docs/review-model.md
- docs/obsidian-sync.md
- docs/output-generation.md
- docs/change-detection.md
- docs/roadmap.md

Document major architectural decisions as the build progresses.

---

## Required UX priorities

Prioritise these flows:

1. source import
2. source review
3. claims inbox
4. claim review
5. tension handling
6. decision logging
7. output generation
8. change log
9. Obsidian sync

Do not make chat the main entry point.
Do not make graph view the primary interaction.

---

## Sync rules

### Backend-owned fields

Do not treat user edits to backend-owned structural fields as canonical.

### Allowed write-back

Only sync content from approved editable block markers.

### Conflict handling

Conflicts must be explicit and inspectable.

### Dashboards

Generated dashboard notes are read-only projections.

### Freeform notes

Useful, but not canonical.
Do not let freeform notes silently rewrite structured objects.

---

## Build order

1. scaffold app and docs
2. create schema and routes
3. implement source import and source pages
4. implement source segments and evidence scaffolds
5. implement claim workflows
6. implement tension and decision workflows
7. implement output scaffolds and stale logic
8. implement vault export
9. implement bounded vault import
10. refine change log and review UX

---

## Behaviour expectations

When working on tasks:

- make reasonable assumptions
- state assumptions clearly
- deliver in reviewable steps
- explain what changed
- keep implementation grounded in the product model
- avoid hype language
- prefer clarity over novelty
- keep code maintainable

If blocked, ask only targeted questions that materially affect implementation.
