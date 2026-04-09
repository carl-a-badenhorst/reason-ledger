import { PageStub } from "@/components/page-stub";

export default async function SourceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PageStub
      title={`Source ${id}`}
      description="Source detail, segments, and linked evidence will load here in Phase 2–3."
    />
  );
}
