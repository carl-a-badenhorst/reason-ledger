import path from "node:path";

const ENV_KEY = "REASON_LEDGER_VAULT_PATH";

export function getVaultPathFromEnv(): string | undefined {
  const raw = process.env[ENV_KEY];
  if (!raw?.trim()) return undefined;
  return path.resolve(raw.trim());
}
