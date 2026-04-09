# Data model

Core entities: `Workspace`, `Source`, `SourceSegment`, `Evidence`, `Claim`, `Tension`, `Decision`, `Output`, `ReviewEvent`, `SyncRecord`.

See [prisma/schema.prisma](../prisma/schema.prisma) for fields and relations. Status literals are validated in application code (`apps/web/src/lib/status/transition-rules.ts`) and documented here as implementation progresses.
