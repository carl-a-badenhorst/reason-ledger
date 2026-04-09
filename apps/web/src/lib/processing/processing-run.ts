/** Track processing runs over sources (later phases). */
export type ProcessingRunStatus = "pending" | "running" | "done" | "failed";

export function processingRunStub(): ProcessingRunStatus {
  return "pending";
}
