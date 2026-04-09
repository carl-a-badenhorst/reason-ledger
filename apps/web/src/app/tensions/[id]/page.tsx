import { PageStub } from "@/components/page-stub";

export default async function TensionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PageStub
      title={`Tension ${id}`}
      description="Linked claims, severity, and resolution workflow — Phase 5."
    />
  );
}
