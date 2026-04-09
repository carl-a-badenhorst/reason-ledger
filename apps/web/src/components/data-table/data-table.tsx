export function DataTablePlaceholder({
  message = "Table placeholder — wire to server data in later phases.",
}: {
  message?: string;
}) {
  return (
    <div className="border-border bg-card/40 text-muted-foreground rounded-lg border border-dashed p-8 text-center text-sm">
      {message}
    </div>
  );
}
