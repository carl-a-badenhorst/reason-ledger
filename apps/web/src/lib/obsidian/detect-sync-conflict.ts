export type SyncConflictKind = "none" | "pending";

export function detectSyncConflictStub(): SyncConflictKind {
  return "none";
}
