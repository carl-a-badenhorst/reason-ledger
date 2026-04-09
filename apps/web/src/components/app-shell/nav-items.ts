export type NavItem = {
  href: string;
  label: string;
};

export const mainNavItems: NavItem[] = [
  { href: "/", label: "Dashboard" },
  { href: "/sources", label: "Sources" },
  { href: "/claims", label: "Claims" },
  { href: "/tensions", label: "Tensions" },
  { href: "/decisions", label: "Decisions" },
  { href: "/outputs", label: "Outputs" },
  { href: "/review", label: "Review" },
  { href: "/changes", label: "Changes" },
];

export const settingsNavItems: NavItem[] = [
  { href: "/settings/vault-sync", label: "Vault sync" },
];
