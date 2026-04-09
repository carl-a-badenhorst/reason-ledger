# Reason Ledger — User Guide

## Contents

1. [What Reason Ledger is — and is not](#1-what-reason-ledger-is--and-is-not)
2. [Setup](#2-setup)
3. [The reasoning pipeline — a mental model](#3-the-reasoning-pipeline--a-mental-model)
4. [The dashboard](#4-the-dashboard)
5. [Working with sources](#5-working-with-sources)
6. [Evidence](#6-evidence)
7. [Claims inbox and detail](#7-claims-inbox-and-detail)
8. [Tensions](#8-tensions)
9. [Decisions](#9-decisions)
10. [Outputs](#10-outputs)
11. [Review queue](#11-review-queue)
12. [Change log](#12-change-log)
13. [The Obsidian vault — setup and working rules](#13-the-obsidian-vault--setup-and-working-rules)
14. [Obsidian sync — export, import, and conflicts](#14-obsidian-sync--export-import-and-conflicts)
15. [Settings — vault sync](#15-settings--vault-sync)
16. [Status reference](#16-status-reference)
17. [Frequently asked questions](#17-frequently-asked-questions)

---

## 1. What Reason Ledger is — and is not

Reason Ledger is an **evidence-first reasoning workbench**. It helps you move from raw source material to grounded, reviewable positions — not by accumulating notes, but by maintaining an explicit chain from imported sources through evidence, claims, tensions, and decisions to publishable outputs.

The core workflow is:

```
raw sources → evidence → claims → tensions → decisions → outputs
```

Every step in that chain is a typed, structured object. Every status change is logged. Every output is traceable back to the claims and decisions it was built from.

### What it is not

**Not a note-taking app.** You can keep freeform notes in the Obsidian vault, but they do not feed into the structured reasoning chain unless you explicitly promote them.

**Not a second-brain or wiki.** The database — not markdown — is the record of truth. Obsidian is a working surface layered on top of a PostgreSQL backend.

**Not a chat interface.** There is no "ask your documents" as the primary mode. The primary mode is human review: you read extracted material, decide what counts as evidence, promote claims through a review lifecycle, and make explicit decisions.

**Not a graph toy.** Relationships exist, but the primary views are inboxes, detail pages, logs, and outputs — not graph visualisations.

### Who it is for

Reason Ledger is designed for knowledge work where trust, provenance, and judgment matter more than passive accumulation:

- researchers synthesising literature
- policy analysts building defensible positions
- curriculum designers grounding learning outcomes in evidence
- strategists tracking what changed after new information arrived
- compliance teams maintaining audit trails of decisions
- product teams doing evidence-based decision work

---

## 2. Setup

### Prerequisites

- **Node.js 20+** — check with `node -v`
- **pnpm 9** — install via `corepack enable pnpm` or `npx pnpm@9 --version` to verify
- **PostgreSQL 14+** — a local instance or a remote connection string

### Step 1 — Clone the repository

```bash
git clone https://github.com/your-org/reason-ledger.git
cd reason-ledger
```

### Step 2 — Set environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in the required values:

```env
# Required: your PostgreSQL connection string
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/reason_ledger?schema=public"

# Optional: absolute path to your Obsidian vault root
REASON_LEDGER_VAULT_PATH="/absolute/path/to/your/vault"
```

`REASON_LEDGER_VAULT_PATH` is only needed when you start using vault export (Phase 7). You can leave it blank for now.

### Step 3 — Install dependencies

Run this from the **repository root**, not from inside `apps/web`:

```bash
pnpm install
```

This installs dependencies for all workspaces, including Prisma tooling.

### Step 4 — Generate the Prisma Client and apply migrations

```bash
pnpm db:generate
pnpm db:migrate
```

`db:generate` creates the Prisma Client from the schema. `db:migrate` applies all pending migrations to your PostgreSQL database. On first run, this creates all tables from scratch.

### Step 5 — Seed the default workspace

```bash
pnpm db:seed
```

This creates one `Workspace` row with slug `default`. The MVP is single-workspace, so this is the workspace all your objects live in.

### Step 6 — Start the development server

```bash
pnpm dev
```

Open `http://localhost:3000` in your browser. You should see the app shell with a left sidebar linking to all main routes.

### Verifying the setup

- The sidebar shows links to: Dashboard, Sources, Claims, Tensions, Decisions, Outputs, Review, Changes.
- Under Settings: Vault sync.
- No database errors appear in the terminal.

### Available scripts (from the repo root)

| Script | What it does |
|--------|--------------|
| `pnpm dev` | Start the Next.js dev server with Turbopack |
| `pnpm build` | Generate Prisma Client, then create a production build |
| `pnpm lint` | Run ESLint across `apps/web` |
| `pnpm db:generate` | Regenerate the Prisma Client from the schema |
| `pnpm db:migrate` | Create and apply a new migration (use when schema changes) |
| `pnpm db:push` | Push schema changes without a migration file (prototyping only) |
| `pnpm db:seed` | Seed the default workspace |
| `pnpm db:studio` | Open Prisma Studio to inspect the database |

---

## 3. The reasoning pipeline — a mental model

The diagram below shows how objects in Reason Ledger relate to each other:

```
Sources → Evidence → Claims → Tensions
                          ↓         ↓
                       Decisions ←──┘
                          ↓
                       Outputs
```

Each step exists as a distinct object type because collapsing them loses critical information about where ideas came from and what confidence to place in them.

### Sources

A source is **immutable imported material** — a paper, a report, a transcript, a policy document. Once imported, the extracted text is never overwritten. Everything derived from a source traces back to it.

### Evidence

Evidence is a **bounded, source-grounded support unit**. It is not the full source text. It is a specific passage or segment identified as relevant to a claim. Evidence records which part of which source they came from. This is what makes claims traceable.

### Claims

A claim is a **discrete proposition** — a statement of something believed to be true, supported by one or more evidence items. Claims go through a review lifecycle (extracted → needs-review → verified, contested, or provisional). They are the atomic unit of reasoning in the system.

### Tensions

A tension is a **named conflict, ambiguity, or tradeoff** between claims. Surfacing tensions is not a failure — it is the system doing its job. A claim that contradicts another claim, a tradeoff with no clear resolution, an ambiguity about scope: all of these belong here.

### Decisions

A decision is a **selected interpretation, recommendation, or action** that resolves or acknowledges one or more tensions. Decisions must be grounded in reviewed claims. They are not guesses — they are explicit positions with traceable rationale.

### Outputs

An output is a **generated artifact** — a briefing memo, a decision rationale, a literature synthesis — built from a scoped selection of verified claims and accepted decisions. Outputs can become stale when the claims or decisions beneath them change.

---

## 4. The dashboard

**Route:** `/`

The dashboard is your starting point for each work session. In its current Phase 1 form, it shows a welcome stub. Future iterations will add:

- count of open tensions needing attention
- count of stale outputs requiring review
- recent review events (who did what, and when)
- vault sync status (last exported, last imported, any conflicts)
- claims in `needs-review` status

**How to use it now:** Treat it as your orientation point. Bookmark it. Each time you return to the app, start here and navigate to the area that needs attention using the sidebar.

---

## 5. Working with sources

**Routes:** `/sources` (list), `/sources/[id]` (detail)

### What a source is

A source is any imported material you want to reason from: a research paper, a policy document, a transcript, meeting notes, a dataset summary. Once imported, the original extracted text is stored as-is and never modified. This is the **raw vs. derived rule** — you work with what the source says, you do not edit it to suit a preferred reading.

Sources have a `contentHash` — a fingerprint of the original text. If you reimport the same file, the system can detect it is unchanged. If you import a new version, it is treated as a new source and the prior one remains intact.

### Supported file types (MVP)

- Markdown (`.md`)
- Plain text (`.txt`)
- PDF (scaffolded — parsing available in later phases)
- Word documents (`.docx`) — planned for later phases

### Importing a source

From the Sources list page (`/sources`), click the import action (available in Phase 2). You will:

1. Select a file from your local filesystem.
2. The app stores the file metadata and extracted text.
3. The source appears in the list with status information and a link to the detail page.

### Source detail page

The source detail page shows:

- **Title and metadata**: source type, import date, original file path or URL.
- **Extracted text** (read-only): the full text as imported. You cannot edit this.
- **Segments**: the source broken into structural units — headings, paragraphs, page sections, speakers in transcripts. Segments are the anchor points for evidence.
- **Linked evidence**: evidence records created from this source.

### The raw vs. derived rule

Never try to edit extracted source text to make it easier to work with. If the source says something you disagree with or that is poorly phrased, that disagreement belongs in a **claim** or a **tension**, not in an edit to the source. The source record is your audit baseline.

---

## 6. Evidence

**Accessed via:** Source detail page (`/sources/[id]`) → evidence panel

### What evidence is

Evidence is a **specific, bounded excerpt** from a source segment that supports a claim. It is not a copy of the whole source. It is the precise part you are pointing to.

For example: if a source is a 40-page policy document, evidence might be one paragraph on page 12 that directly supports a particular claim about funding allocation.

### How evidence differs from source text

| | Source | Evidence |
|---|--------|---------|
| Scope | Full imported document | A bounded passage or segment |
| Editability | Never edited | Not edited, but selected and annotated |
| Purpose | Preserved record | Traceable support for a claim |

### Evidence fields

- **Text**: the specific passage or segment extracted.
- **Evidence type**: categories such as direct quotation, paraphrase, statistical finding, expert testimony, or observation.
- **Confidence**: an optional 0–1 score indicating how strongly the evidence supports the linked claim.
- **Source segment**: the specific structural segment of the source this evidence comes from.

### Why this matters

Claims linked to evidence are trustworthy in a way that asserted claims are not. When a reviewer asks "where does this come from?", the answer is one click away.

---

## 7. Claims inbox and detail

**Routes:** `/claims` (inbox/list), `/claims/[id]` (detail)

### What a claim is

A claim is a **discrete, reviewable proposition** — a statement of something held to be true, supported by one or more evidence items. Claims are the primary objects you review, promote, contest, and build decisions from.

Claims are not the same as evidence. Evidence points at something a source says. A claim asserts that something is true, based on that evidence.

### The claims inbox

The claims inbox shows claims filtered and sorted by their review status. In later phases it will prioritise `needs-review` claims at the top. This is where most of your daily review work happens.

### Claim status lifecycle

Claims move through the following statuses:

```
extracted → needs-review → verified
                        → contested
                        → provisional
                        → rejected
                        → superseded
```

| Status | Meaning |
|--------|---------|
| `extracted` | Candidate claim produced by the system or manually created; not yet reviewed |
| `needs-review` | Flagged for human review — the default entry point |
| `verified` | A human reviewer has confirmed this claim is well-supported by evidence |
| `contested` | Two or more reviewers or sources disagree; active disagreement noted |
| `provisional` | Accepted with reservations — good enough to act on, but not fully confirmed |
| `rejected` | Reviewed and dismissed; evidence insufficient or claim is wrong |
| `superseded` | A newer, better-supported claim has replaced this one |

### How to review a claim

1. Open the claim detail page (`/claims/[id]`).
2. Read the claim text and the linked evidence.
3. Check: does the evidence actually support the proposition? Is it from a credible segment?
4. Choose a status transition: verify, contest, mark provisional, or reject.
5. Add a review note explaining your reasoning. This is stored as a `ReviewEvent`.

### Rules for claim promotion

- Do not mark a claim `verified` without at least one linked evidence item.
- If you have doubts but the claim is useful, use `provisional`.
- If two claims contradict each other, open a **tension** (see section 8).
- Never delete a claim — use `rejected` or `superseded` instead. The history must be preserved.

### ReviewEvent logging

Every status change generates a `ReviewEvent` record with: the object type and ID, the action taken, an optional note, and the actor (user or system). This means the full review history of any claim is always recoverable.

---

## 8. Tensions

**Routes:** `/tensions` (list), `/tensions/[id]` (detail)

### What a tension is

A tension is a **named conflict or unresolved issue** across two or more claims. It may be:

- a direct contradiction (two verified claims assert opposing things)
- an ambiguity (a claim is unclear about scope or conditions)
- a tradeoff (two good claims imply incompatible actions)
- a scope mismatch (claims drawn from different contexts being compared)
- an unresolved exception (a claim is usually true, but a case undermines it)

### Why tensions are valuable

Surfacing a tension is not a sign of failure. It is the system doing its job. A knowledge base with no tensions either has too little material or has hidden contradictions. Tensions are the honest record of what the evidence actually shows.

### Tension status lifecycle

```
open → under-review → resolved
                   → deferred
```

| Status | Meaning |
|--------|---------|
| `open` | Tension identified; not yet being actively worked |
| `under-review` | Someone is actively examining this conflict |
| `resolved` | A decision has been made that settles the conflict |
| `deferred` | Acknowledged but not resolved; will revisit later |

### How to open a tension

1. From a claim detail page, use the "Open tension" action.
2. Give the tension a descriptive title — name the conflict explicitly (e.g. "Study A and Study B contradict each other on causal direction").
3. Link the relevant claims.
4. Optionally set a severity level and tension type.

### How to resolve a tension

A tension is resolved when a **decision** is made that explicitly addresses it. From the tension detail page, you can link a decision and mark the tension `resolved`. The decision becomes the record of how the conflict was handled.

---

## 9. Decisions

**Routes:** `/decisions` (list), `/decisions/[id]` (detail)

### What a decision is

A decision is a **selected interpretation, recommendation, or action** grounded in reviewed material. It is not a guess. It is an explicit position with a rationale, linked to the claims and tensions that informed it.

Examples:

- "We will use Method A over Method B, based on the weight of verified claims in the literature."
- "The evidence is insufficient to support a strong recommendation; we defer to expert consensus."
- "Claim C is contested, so our position is provisional pending further review."

### Decision status lifecycle

```
proposed → accepted
         → rejected
         → provisional
         → superseded
```

| Status | Meaning |
|--------|---------|
| `proposed` | Decision drafted; not yet accepted |
| `accepted` | Decision ratified and in effect |
| `rejected` | Proposal reviewed and dismissed |
| `provisional` | Accepted with conditions or time-bound; needs revisiting |
| `superseded` | A newer decision has replaced this one |

### Decision chaining with supersededById

When a position changes — because new evidence arrived or a tension was resolved differently — you do not delete the old decision. You create a new one and link it to the old one via `supersededById`. This creates an explicit chain showing how the position evolved.

For example: Decision 2 ("Revised position in light of new study") supersedes Decision 1 ("Original position"). The link remains visible in the decision log.

### Linking decisions to tensions

A decision that resolves a tension should be linked to it. On the decision detail page you can associate the tension, and on the tension detail page you can mark it `resolved` with that decision as the resolution record.

### The decision log

The decisions list (`/decisions`) is your audit trail of positions held over time. Filter by status to see what is currently `accepted`, what is `provisional`, and what has been `superseded`. This is especially important when generating outputs or briefing new stakeholders.

---

## 10. Outputs

**Routes:** `/outputs` (list), `/outputs/[id]` (detail)

### What an output is

An output is a **generated artifact** — a document, memo, or report — built from a scoped selection of reviewed claims and accepted decisions. Outputs are not built from all your notes. They are built from the evidence chain you have explicitly verified.

### Output types

| Type | Purpose |
|------|---------|
| Briefing memo | Current position, evidence summary, uncertainties, suggested next step |
| Decision rationale | Single decision, supporting claims, counter-considerations, dependencies |
| Literature synthesis | Major claims across sources, convergences, divergences, working synthesis |
| Stakeholder summary | Key point, why it matters, what is uncertain, recommended action |

### Output status lifecycle

```
draft → reviewed → published → stale
```

| Status | Meaning |
|--------|---------|
| `draft` | Output created; not yet reviewed |
| `reviewed` | A human has checked the output against the claims and decisions it references |
| `published` | Output approved for sharing or delivery |
| `stale` | One or more underlying claims or decisions have changed since this output was generated |

### Stale outputs

When a claim that an output depends on is updated — its status changes, new evidence is added, or it is superseded — the output's `staleStatus` is flagged. The `staleReason` field records what changed.

This is the system's way of telling you: "this document may no longer accurately reflect the current state of your reasoning." Do not ignore stale flags. Review the output, check what changed, and either update it or mark it reviewed again.

### Output generation discipline

Outputs must be generated from **inspectable, scoped inputs**. In later phases the generation interface will let you:

- include only `verified` claims
- include `verified` and `provisional` claims
- exclude `contested` claims
- include a section explicitly listing unresolved tensions

This prevents an output from silently including weak or disputed material.

---

## 11. Review queue

**Route:** `/review`

### Purpose

The review queue is a consolidated log of human and system review actions across all object types. It is not a to-do list — it is an **activity log** that shows what has happened.

### ReviewEvent structure

Each entry records:

| Field | Description |
|-------|-------------|
| `objectType` | The type of object acted on (`claim`, `tension`, `decision`, `output`, etc.) |
| `objectId` | The ID of the specific object |
| `action` | What was done (e.g. `status-changed`, `reviewed`, `note-added`) |
| `note` | Optional human-readable explanation of the action |
| `actor` | Who performed the action (user identifier or `system`) |
| `createdAt` | When the action happened |

### How to use it

- Use the review queue to understand **what changed and when**, especially before generating a new output.
- Check it after adding new sources — system-generated claims and evidence will appear here.
- Use it to verify that a specific claim was reviewed (and by whom) before accepting a decision.

---

## 12. Change log

**Route:** `/changes`

### Purpose

The change log surfaces **consequences of changes** — not just that something changed, but what it might affect. It is the interface where stale signals, new tensions, and decision dependencies become visible.

### Current state (Phase 1)

The change log is a stub in Phase 1. It will be fully implemented in Phase 9.

### What it will show

- Outputs that became stale after a claim or decision update.
- Claims whose status changed (e.g. from `verified` to `contested`) and what outputs reference them.
- New tensions opened since a given date.
- Decisions that may need review because their supporting claims changed.

### Using staleStatus and staleReason now

Even before the change log is fully built, you can inspect stale state directly on individual outputs (`/outputs/[id]`). The `staleStatus` field and `staleReason` text will tell you what flagged the output as needing review.

---

## 13. The Obsidian vault — setup and working rules

### What the vault is for

The Obsidian vault is a **markdown-based working surface**. It gives you a local, navigable view of your structured data as readable notes. You can annotate notes, write review commentary, draft freeform thoughts, and navigate the reasoning chain — all in Obsidian's familiar interface.

The vault is **not** the system of record. The database is. If the vault says one thing and the database says another, the database wins.

### Setting up the vault connection

1. Open `.env` and set:

   ```env
   REASON_LEDGER_VAULT_PATH="/absolute/path/to/your/vault"
   ```

   Use the absolute path to the root of your Obsidian vault folder.

2. Open Settings → Vault sync in the app (`/settings/vault-sync`).

3. Once vault export is implemented (Phase 7), run an export from that settings page. The app will write notes into your vault.

4. Open your vault in Obsidian. You will find a folder structure as described below.

### Vault folder layout

```
your-vault/
  00-dashboard/       ← regenerated projections (read-only)
  01-sources/         ← one note per imported source
  02-evidence/        ← one note per evidence record
  03-claims/          ← one note per claim
  04-tensions/        ← one note per tension
  05-decisions/       ← one note per decision
  06-outputs/         ← one note per output
  07-notes/           ← your freeform personal notes (not canonical)
  08-templates/       ← reference templates for each object type
  99-system/          ← sync metadata and manifest
```

### What each zone means

**System-managed notes** (all numbered folders except 07-notes): These are written and overwritten by the app. They contain:
- frontmatter with canonical IDs, types, statuses, and timestamps
- read-only sections (generated summaries, extracted text, structured links)
- editable blocks where you can write commentary

**Editable blocks**: The only parts of a system-managed note you should write in. They look like this:

```markdown
<!-- editable:start:human-review-notes -->
Write your review commentary here.
<!-- editable:end:human-review-notes -->
```

When you trigger a vault import from the app, only the content inside these markers is read back into the database. Everything else in the note is ignored.

**Freeform notes** (`07-notes/`): Entirely yours. Write whatever you want here — working notes, half-formed ideas, drafts. These are not synced back to the database unless you explicitly promote content through the app.

**Dashboard notes** (`00-dashboard/`): Generated by the app. Do not write in these — your changes will be overwritten the next time the app regenerates them.

### Editable block keys by object type

| Object | Available editable blocks |
|--------|--------------------------|
| Source | `human-review-notes` |
| Evidence | `human-review-notes` |
| Claim | `claim-summary`, `human-review-notes` |
| Tension | `resolution-notes` |
| Decision | `rationale`, `human-review-notes` |
| Output | `publish-notes` |

### What you must not edit in the vault

Do not manually edit these fields in any system-managed note:

- `id` in frontmatter
- `status` in frontmatter
- `reason_ledger_object` in frontmatter
- Any timestamp fields
- Extracted text blocks (marked read-only)
- Canonical link references

If you change these fields in Obsidian, the import process will ignore them. The database value stands. If a status is wrong, change it in the app, then re-export.

---

## 14. Obsidian sync — export, import, and conflicts

### Export (Phase 7)

Export writes your database objects as markdown notes into the vault.

What happens during export:

1. The app reads each canonical object from the database.
2. It renders a markdown note with read-only frontmatter, system sections, and blank editable blocks.
3. It writes the note to its deterministic path in the vault (e.g. `03-claims/clm_abc123.md`).
4. It records a hash of the exported content in `SyncRecord.exportHash` for that object.

Export is **non-destructive**: if you have written content into editable blocks, export does not overwrite those blocks. It only writes system-managed zones.

### Import (Phase 8)

Import reads editable block content from vault notes back into the database.

What happens during import:

1. The app scans the vault for notes with `reason_ledger_object` frontmatter.
2. For each note, it parses only the content between `<!-- editable:start:... -->` and `<!-- editable:end:... -->` markers.
3. It maps each block key to the correct database field (e.g. `human-review-notes` → the `note` field on the review record).
4. It writes only those fields to the database.
5. It records a hash in `SyncRecord.importHash`.

Import does **not** read frontmatter to update structured fields. Status changes, ID updates, link changes — none of that comes through import. Only your written commentary in editable blocks is synced.

### Conflicts

A conflict occurs when:

- The app detects that a vault note changed after the last export (file hash differs from `exportHash`), but
- A new import has not been recorded, so the app cannot tell whether your changes were intentional edits or stale content.

When a conflict is detected:

1. The `SyncRecord.syncState` is set to a conflict state.
2. The conflict appears in `/settings/vault-sync` with a note explaining what drifted.
3. **Do not force-overwrite the vault note** until you have decided which version is correct.

To resolve a conflict:

- If you want to keep your vault edits: trigger an import first (Phase 8), then re-export.
- If you want to discard your vault edits: trigger an export, which will rewrite the system-managed zones.
- Check `conflictNote` on the `SyncRecord` for details about what specifically drifted.

### Rule to remember

The vault is where you work. The database is what is true. When in doubt, open the app and check the database record. Fix things in the app, then re-export to sync the vault.

---

## 15. Settings — vault sync

**Route:** `/settings/vault-sync`

This page is where you configure and control the vault sync workflow.

### Configuration

- **Vault path**: displays the value of `REASON_LEDGER_VAULT_PATH` from your environment. Change it by updating `.env` and restarting the dev server.

### Actions

- **Run export**: writes all canonical objects as markdown notes into the vault. Deterministic paths mean this is safe to run repeatedly.
- **Run import**: reads editable block content from vault notes and writes it to the database. Only editable block content is affected.

### Sync record table

The page shows a table of `SyncRecord` rows, one per object that has been exported or imported. Columns include:

| Column | Meaning |
|--------|---------|
| Object type | `claim`, `source`, `tension`, etc. |
| Object ID | The database ID of the object |
| Note path | Where the note lives in the vault |
| Sync state | `synced`, `conflict`, `pending`, `never-exported` |
| Last exported | Timestamp of the most recent export for this object |
| Last imported | Timestamp of the most recent import |
| Conflict note | If in conflict state, a description of what drifted |

### Resolving conflicts

Click the conflict row to open the detail view. The detail shows which fields drifted and gives you options to accept the vault version, accept the database version, or open the relevant object in the app to reconcile manually.

---

## 16. Status reference

### Claim statuses

| Status | Plain meaning | When to use it |
|--------|---------------|----------------|
| `extracted` | Candidate claim, not yet reviewed | System assigns this on creation; do not leave claims here permanently |
| `needs-review` | Waiting for human review | Promote extracted claims here to queue them for review |
| `verified` | Confirmed well-supported | Evidence is sufficient and credible; claim can inform decisions |
| `contested` | Active disagreement | Two or more reviewers or sources conflict on this claim |
| `provisional` | Accepted with reservations | Useful but not fully confirmed; treat with caution in outputs |
| `rejected` | Dismissed | Evidence insufficient, claim is wrong, or it duplicates a better claim |
| `superseded` | Replaced by a newer claim | A better-supported version of this claim exists; keep for history |

### Tension statuses

| Status | Plain meaning | When to use it |
|--------|---------------|----------------|
| `open` | Conflict identified | Newly created tension; no one is working on it yet |
| `under-review` | Being examined | Someone is actively investigating this conflict |
| `resolved` | Settled by a decision | A decision has been made that addresses this tension |
| `deferred` | Acknowledged but not resolved | Too early to resolve, or low priority for now |

### Decision statuses

| Status | Plain meaning | When to use it |
|--------|---------------|----------------|
| `proposed` | Draft decision | Not yet accepted; needs review |
| `accepted` | In effect | Ratified and currently the operative position |
| `rejected` | Dismissed | Proposal was reviewed and not adopted |
| `provisional` | Conditionally accepted | In effect but time-bound or dependent on further evidence |
| `superseded` | Replaced | A newer decision has taken this one's place; keep for history |

### Output statuses

| Status | Plain meaning | When to use it |
|--------|---------------|----------------|
| `draft` | Being prepared | Not yet reviewed for accuracy or completeness |
| `reviewed` | Checked against sources | A human has verified it reflects the current state of claims and decisions |
| `published` | Approved for sharing | Ready to send to stakeholders |
| `stale` | No longer current | Underlying claims or decisions changed after this output was generated |

---

## 17. Frequently asked questions

### Why can't I edit the claim text directly in Obsidian?

Claim text is a backend-owned field. The database is the record of truth, not the vault note. If you edit claim text in Obsidian, the import process will ignore it — only editable block content (inside `<!-- editable:start:... -->` markers) syncs back.

To change the claim text itself, use the claim detail page in the app. If a claim is wrong enough to need rewriting, consider whether it should be `rejected` and replaced with a new claim that captures the corrected proposition. This preserves the review history.

### What does "stale" mean for an output?

An output becomes stale when one or more of the claims or decisions it was built from have changed. For example: a claim the output referenced was moved from `verified` to `contested`, or a decision it cited was `superseded`.

Stale does not mean the output is wrong — it means the output may no longer reflect the current state of your reasoning. Open the output, check the `staleReason`, review what changed, and either update the output or re-review and re-publish it.

### How do I resolve a tension?

1. Create a decision that explicitly addresses the conflict the tension represents.
2. On the decision detail page, link it to the tension.
3. On the tension detail page, mark it `resolved`.
4. The tension remains in the record as a resolved issue — you do not delete it.

### What happens to a decision when it's superseded?

The old decision is not deleted. Its status is set to `superseded` and it is linked to the new decision via `supersededById`. This creates a chain showing how the position evolved over time.

Both decisions remain visible in the decision log. Anyone reading the log can see that the position changed, what the old position was, and what replaced it.

### Can I keep personal notes in the vault?

Yes. The `07-notes` folder in the vault is entirely yours. Write freely there. These notes are not synced to the database and will not affect any canonical objects.

The only limit: if you want to turn a personal note into a proper claim or evidence, you need to do that explicitly through the app. Freeform notes do not automatically become structured objects.

### What should I put in an editable block?

Editable blocks are for **your written commentary on a specific object**. Use them for:

- Your reasons for verifying or contesting a claim (`human-review-notes`)
- A plain-language summary of a complex claim (`claim-summary`)
- Your rationale for a decision, in your own words (`rationale`)
- Notes on how a tension was resolved or why it was deferred (`resolution-notes`)
- Instructions or caveats for a published output (`publish-notes`)

Do not put structured data (IDs, status labels, timestamps) in editable blocks. That information belongs in the database and is managed by the app.

### Where do I look to understand what changed after a new source was added?

In Phase 9, the change log (`/changes`) will show this directly. In the interim:

1. Check the **review queue** (`/review`) — new `ReviewEvent` entries will show what the system created or modified after the import.
2. Check the **claims inbox** (`/claims`) — new extracted claims from the source will appear with status `needs-review`.
3. Check the **outputs list** (`/outputs`) — any outputs that reference claims affected by the new source may be marked `stale`.
4. Check the **tensions list** (`/tensions`) — if the new source introduced contradictions with existing claims, new tensions may have been opened.

Start at the claims inbox after every new source import. That is where the consequences of new material first appear.

---

*This guide reflects the Phase 1 scaffold. Sections describing import, export, and generation workflows describe intended behaviour that is implemented across Phases 2–9. As each phase ships, this document will be updated.*
