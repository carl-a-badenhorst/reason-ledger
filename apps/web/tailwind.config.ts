import type { Config } from "tailwindcss";

/** Tailwind v4 uses CSS-first config in `src/app/globals.css`; this file satisfies tooling that expects a config path. */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
} satisfies Config;

export default config;
