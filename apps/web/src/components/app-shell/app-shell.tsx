import Link from "next/link";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { mainNavItems, settingsNavItems } from "./nav-items";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-1">
      <aside className="border-border bg-card/30 flex w-56 shrink-0 flex-col border-r">
        <div className="px-4 py-5">
          <Link href="/" className="font-semibold tracking-tight">
            Reason Ledger
          </Link>
          <p className="text-muted-foreground mt-1 text-xs leading-snug">
            Evidence-first reasoning workbench
          </p>
        </div>
        <Separator />
        <ScrollArea className="flex-1">
          <nav className="flex flex-col gap-0.5 p-3" aria-label="Main">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:bg-accent rounded-md px-3 py-2 text-sm transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Separator className="my-2" />
          <nav className="flex flex-col gap-0.5 p-3 pt-0" aria-label="Settings">
            <p className="text-muted-foreground px-3 pb-1 text-xs font-medium uppercase">
              Settings
            </p>
            {settingsNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:bg-accent rounded-md px-3 py-2 text-sm transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1 px-6 py-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
