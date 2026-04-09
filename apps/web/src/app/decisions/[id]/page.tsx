import { PageStub } from "@/components/page-stub";

export default async function DecisionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PageStub
      title={`Decision ${id}`}
      description="Decision text, linked claims and tensions, supersession — Phase 5."
    />
  );
}
