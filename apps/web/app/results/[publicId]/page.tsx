import { getResultSnapshot } from "@/lib/results/get-result-snapshot";
import { ResultsView } from "./results-view";
import { notFound } from "next/navigation";

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ publicId: string }>;
}) {
  const { publicId } = await params;

  const snapshot = await getResultSnapshot(publicId);

  if (!snapshot) notFound();

  return <ResultsView snapshot={snapshot} />;
}