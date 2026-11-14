import { Globe } from "lucide-react";
import { getCountry } from "@/lib/countries/get-country";
import Link from "next/link";
import { Suspense } from "react";
import { getSources } from "@/lib/sources/get-sources";
import CountryEditLoadingPage from "./country-edit-loading-page";
import CountryEditContent from "./country-edit-content";

export default async function EditCountryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const country = await getCountry(id);
  const sources = await getSources();

  if (!country) {
    return (
      <div data-m="notfound" className="state-c">
        <div className="big">
          <Globe className="ic" width={30} height={30} />
        </div>
        <h1 tabIndex={-1}>Country not found</h1>
        <p>It may have been removed, or the link is wrong.</p>
        <div className="btn-row">
          <Link
            href="/admin/countries"
            className="btn btn-primary"
            data-act="navto"
            data-n="Countries"
          >
            Back to Countries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<CountryEditLoadingPage />}>
      <CountryEditContent country={country} sources={sources} />
    </Suspense>
  );
}
