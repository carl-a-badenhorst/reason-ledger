# Cursor execution brief

Build **Reason Ledger** as a Next.js + TypeScript application with a structured backend and an Obsidian vault sync layer.

## Immediate implementation goal

Create the production-leaning MVP foundation for the Obsidian hybrid version.

## Required stack

Use:

- Next.js with App Router
- TypeScript
- Prisma
- PostgreSQL
- Tailwind CSS
- shadcn/ui
- Zod

## Initial scope

Build:

- single-workspace MVP
- source import scaffold
- source list page
- source detail page
- evidence model scaffold
- claim model scaffold
- tension model scaffold
- decision model scaffold
- output model scaffold
- review-event model scaffold
- sync-record model scaffold
- dashboard page
- claims page
- tensions page
- decisions page
- outputs page
- review page
- changes page
- vault sync settings page
- initial docs
- Obsidian export scaffold
- bounded import scaffold

## Obsidian rules

- database is canonical for structure
- Obsidian is a synced markdown working surface
- only approved editable blocks sync back
- do not allow frontmatter drift to silently overwrite backend state
- support deterministic vault folder structure

## Naming rules

- lowercase-hyphen file naming where applicable
- semantic names only
- no "brain" naming
- no vague "ai engine" naming

## Output style for implementation

Work in small reviewable steps.

For each step:

1. explain what is being created
2. create or update files
3. explain how to run or test it
4. note assumptions and next steps

## First milestone

Produce:

1. concise technical product brief
2. proposed stack summary
3. route map
4. folder structure
5. Prisma schema
6. Obsidian sync design summary
7. first implementation file list

Then implement:

- app scaffold
- layout and navigation
- schema
- initial pages
- docs
- source import scaffold

## Route requirements

Implement these routes:

- `/`
- `/sources`
- `/sources/[id]`
- `/claims`
- `/claims/[id]`
- `/tensions`
- `/tensions/[id]`
- `/decisions`
- `/decisions/[id]`
- `/outputs`
- `/outputs/[id]`
- `/review`
- `/changes`
- `/settings/vault-sync`

## Engineering constraints

- preserve raw and derived data separately
- use explicit relational modelling
- avoid premature abstraction
- do not build chat first
- do not build graph-first UX
- keep model use bounded and auditable
- document architecture decisions from the start

## What to avoid

Do not:

- build a generic markdown note app
- use Obsidian as the only source of truth
- collapse all objects into one table
- skip provenance
- skip status logic
- skip docs
- optimise for visual demo over workflow utility
