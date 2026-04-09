export function EditableBlockPreview({ children }: { children: string }) {
  return (
    <div className="border-border bg-muted/20 font-mono rounded-md border p-3 text-xs whitespace-pre-wrap">
      {children}
    </div>
  );
}
