import { PageStub } from "@/components/page-stub";

export default async function OutputDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PageStub
      title={`Output ${id}`}
      description="Output body, provenance of included claims/decisions, publish/stale state — Phase 6."
    />
  );
}
