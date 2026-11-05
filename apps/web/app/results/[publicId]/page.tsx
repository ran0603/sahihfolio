import { getResultSnapshot } from "@/lib/results/get-result-snapshot";
import { notFound } from "next/navigation";
import Link from "next/link";
import "./results.css";
import { ArrowLeft } from "lucide-react";
import { ResultSnapshot } from "@/lib/results/get-result-snapshot";
import { getCountry } from "@/lib/countries/get-country";
import { CountryProfile } from "@sahihfolio/shared";
import DataViewWrapper from "./data-view-wrapper";

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ publicId: string }>;
}) {
  const { publicId } = await params;

  const snapshot: ResultSnapshot | null = await getResultSnapshot(publicId);

  if (!snapshot) notFound();

  const country: CountryProfile = await getCountry(snapshot.input.countryCode);
  return (
    <div className="wrap">
      <Link className="crumb" href="/find" data-act="change-country">
        <ArrowLeft className="ic" width={16} height={16} /> Back to the finder
      </Link>
      <DataViewWrapper snapshot={snapshot} country={country} />
    </div>
  );
}
