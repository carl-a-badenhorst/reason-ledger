export function NotePreviewPlaceholder({
  title = "Markdown preview",
}: {
  title?: string;
}) {
  return (
    <div className="border-border rounded-lg border p-4">
      <p className="text-muted-foreground text-sm">{title}</p>
    </div>
  );
}
