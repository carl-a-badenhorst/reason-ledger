import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    // Monorepo root (parent of `apps/`) so Turbopack resolves `next` correctly and avoids picking a stray lockfile outside the repo.
    root: path.join(__dirname, "../.."),
  },
};

export default nextConfig;
