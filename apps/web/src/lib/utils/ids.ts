/** Placeholder for client-safe id display helpers. */
export function shortId(id: string, len = 8): string {
  return id.slice(0, len);
}
