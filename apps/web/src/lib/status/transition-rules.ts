import { z } from "zod";

export const claimStatuses = [
  "extracted",
  "needs-review",
  "verified",
  "contested",
  "provisional",
  "rejected",
  "superseded",
] as const;

export const tensionStatuses = [
  "open",
  "under-review",
  "resolved",
  "deferred",
] as const;

export const decisionStatuses = [
  "proposed",
  "accepted",
  "rejected",
  "provisional",
  "superseded",
] as const;

export const outputStatuses = ["draft", "reviewed", "published", "stale"] as const;

export const claimStatusSchema = z.enum(claimStatuses);
export const tensionStatusSchema = z.enum(tensionStatuses);
export const decisionStatusSchema = z.enum(decisionStatuses);
export const outputStatusSchema = z.enum(outputStatuses);
