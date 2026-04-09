# Architecture

Three layers:

1. **Canonical backend** — PostgreSQL + Prisma; typed objects, relations, `ReviewEvent`, `SyncRecord`.
2. **Next.js app** — App Router; ingestion, review workflows, output generation, stale detection, sync orchestration.
3. **Obsidian vault projection** — Export typed notes + dashboard summaries; import only approved `<!-- editable:start:... -->` blocks.

Cross-cutting rules: preserve raw vs derived data, deterministic parsing where possible, explicit join tables over implicit inference.
