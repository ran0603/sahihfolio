import { ResultSnapshot } from "@/lib/results/get-result-snapshot";
import { Copy, Mail, Printer } from "lucide-react";
import { getDateString } from "@/lib/date-utils";
import { getProductInterestLabel } from "@/lib/results/label-utils";
import { CountryProfile } from "@sahihfolio/shared";

export default function ResultOptionsHeader({
  snapshot,
  country,
  onHandleFocus,
  onHandleCopy,
}: {
  snapshot: ResultSnapshot;
  country: CountryProfile;
  onHandleFocus: () => void;
  onHandleCopy: () => void;
}) {
  return (
    <section data-m="head" className="res-head">
      <h1 tabIndex={-1}>
        We found {country.supportedProviders.length} option
        {country.supportedProviders.length !== 1 ? "s" : ""} for{" "}
        {getProductInterestLabel(snapshot.input.productInterest)} in{" "}
        {country.name}.
      </h1>
      <p className="res-sub">
        Results for {country.name} ({country.currency}). Data last reviewed{" "}
        {getDateString(country.lastReviewedAt)}
      </p>
      <div className="res-meta">
        <span>Result {snapshot.publicId}</span>
        <span>Created {getDateString(snapshot.createdAt)}</span>
        <span>Data version {snapshot.dataVersion}</span>
      </div>
      <div className="res-actions">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          data-act="goto-save"
          onClick={onHandleFocus}
        >
          <Mail className="ic" width="18" height="18" /> Save by email
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          data-act="copy"
          onClick={onHandleCopy}
        >
          <Copy className="ic" width="18" height="18" /> Copy link
        </button>
        <button type="button" className="btn btn-ghost btn-sm" data-act="print">
          <Printer className="ic" width="18" height="18" /> Print
        </button>
      </div>
    </section>
  );
}
