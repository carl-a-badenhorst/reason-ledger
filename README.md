# Reason Ledger

Evidence-first reasoning workbench: **sources → evidence → claims → tensions → decisions → outputs**, with PostgreSQL as the system of record and an Obsidian vault as a bounded markdown projection.

## Requirements

- Node.js 20+
- [pnpm](https://pnpm.io/) 9 (`corepack enable pnpm` or use `npx pnpm@9`)
- PostgreSQL 14+

## Setup

1. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

   Set `DATABASE_URL` and optional `REASON_LEDGER_VAULT_PATH`.

2. Install dependencies from the repository root:

   ```bash
   pnpm install
   ```

3. Generate Prisma Client and apply migrations:

   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

4. Seed the default workspace:

   ```bash
   pnpm db:seed
   ```

5. Run the web app:

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Monorepo layout

- `apps/web` — Next.js App Router application
- `prisma` — Schema, migrations, seed
- `docs` — Architecture and product notes
- `vault-templates` — Reference markdown for Obsidian export

## Scripts (root)

| Script | Description |
|--------|-------------|
| `pnpm dev` | Next.js dev server (Turbopack) |
| `pnpm build` | `prisma generate` + production build |
| `pnpm lint` | ESLint in `apps/web` |
| `pnpm db:generate` | Prisma Client |
| `pnpm db:migrate` | Create/apply dev migrations |
| `pnpm db:push` | Push schema (prototyping only) |
| `pnpm db:seed` | Seed default workspace |
| `pnpm db:studio` | Prisma Studio |

## Documentation

See the [`docs/`](docs/) directory for product overview, data model, Obsidian sync contract, and phase roadmap.

For step-by-step usage, see [`docs/user-guide.md`](docs/user-guide.md).

## Cursor rules

Agent-facing conventions and boundaries are in [`.cursor/rules/`](.cursor/rules/) (`.mdc` files: core, data persistence, Obsidian vault, Next.js UI). Root [`AGENT.md`](AGENT.md), [`system-prompt.md`](system-prompt.md), and [`cursor-execution-brief.md`](cursor-execution-brief.md) summarize the same product for humans and tools.
