# Review model

Human and system actions are appended as `ReviewEvent` rows (`objectType`, `objectId`, `action`, optional `note`, `actor`).

Status transitions for claims, tensions, decisions, and outputs will be enforced in server code using explicit rules (see `transition-rules.ts`). This document will list allowed transitions per type.
