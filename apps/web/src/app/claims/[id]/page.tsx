import { PageStub } from "@/components/page-stub";

export default async function ClaimDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PageStub
      title={`Claim ${id}`}
      description="Claim text, evidence links, status transitions, and review events — Phase 4."
    />
  );
}
