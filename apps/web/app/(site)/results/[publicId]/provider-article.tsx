import Link from "next/link";
import { MatchResult } from "@sahihfolio/shared";
import {
  CircleCheck,
  Clock,
  ExternalLink,
  Flag,
  Info,
  ShieldCheck,
} from "lucide-react";
import { getDateString } from "@/lib/date-utils";
import { getProductInterestLabel } from "@/lib/results/label-utils";
import { track } from "@/lib/analytics";
import { ResultSnapshot } from "@/lib/results/get-result-snapshot";

export function ProviderArticle({
  snapshot,
  match,
}: {
  snapshot: ResultSnapshot;
  match: MatchResult;
}) {
  return (
    <article
      key={`broker_${match.provider.slug}`}
      className="optc"
      data-pid={match.provider.id}
      aria-labelledby={`r9-n-${match.provider.slug}`}
    >
      <header className="opt-h">
        <div className="opt-t">
          <h4 id={`r9-n-${match.provider.slug}`}>{match.provider.name}</h4>
          <span className="badge b-info">Broker</span>
          {match.provider.isAffiliated && (
            <span className="badge b-neutral">Referral link</span>
          )}
        </div>
        <span className="opt-rev">
          <Clock className="ic" width="14" height="14" /> Reviewed{" "}
          {getDateString(match.provider.lastReviewedAt)}
        </span>
      </header>
      <p className="why">
        <CircleCheck className="ic" width="16" height="16" />
        <span>Included because it is {match.reasons.join(", ")}</span>
      </p>

      <dl className="facts">
        <div>
          <dt>Trading fee</dt>
          <dd>
            {match.provider.fees.find((f: any) => f.kind === "trading")
              ?.value || "N/A"}
          </dd>
        </div>
        <div>
          <dt>FX fee</dt>
          <dd>
            {match.provider.fees.find((f: any) => f.kind === "fx")?.value ||
              "N/A"}
          </dd>
        </div>
        <div>
          <dt>Management fee</dt>
          <dd>
            {match.provider.fees.find((f: any) => f.kind === "management")
              ?.value || "N/A"}
          </dd>
        </div>
        <div>
          <dt>Custody fee</dt>
          <dd>
            {match.provider.fees.find((f: any) => f.kind === "custody")
              ?.value || "N/A"}
          </dd>
        </div>
        <div>
          <dt>Minimum investment</dt>
          <dd>{match.provider.minimumInvestment || "None"}</dd>
        </div>
        <div>
          <dt>Asset types</dt>
          <dd>
            {match.provider.assetTypes
              .map((a) => getProductInterestLabel(a))
              .join(", ") || "N/A"}
          </dd>
        </div>
        <div style={{ gridColumn: "1/-1" }}>
          <dt>Markets</dt>
          <dd>
            {match.provider.markets.map((m) => m.name).join(", ") || "N/A"}
          </dd>
        </div>
      </dl>
      {match.provider.halalScreening.supported && (
        <div className="screen">
          <div className="screen-h">
            <ShieldCheck className="ic" width="16" height="16" />
            <b>Shariah-screening information</b>
            <span className="badge b-info">Provider-stated methodology</span>
          </div>
          <p>
            Methodology: {match.provider.halalScreening.methodology || "N/A"}
          </p>
          <p className="fine">
            Informational, not a personal religious ruling. Source:{" "}
            <Link
              href={match.provider.halalScreening.source?.url || "#"}
              data-act="source"
              data-n="Provider screening page"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track("result_source_clicked", {
                  public_id: snapshot.publicId,
                  country_code: snapshot.input.countryCode,
                  product_interest: snapshot.input.productInterest,
                  result_count: snapshot.output.matches.length,
                  data_version: snapshot.dataVersion,
                  provider_id: match.provider.id,
                  provider_slug: match.provider.slug,
                  source_type: "Provider screening page",
                  source_url_host: new URL(
                    match.provider.halalScreening.source?.url || "#",
                  ).hostname,
                  link_location: "provider_screening_page",
                })
              }
            >
              Provider screening page{" "}
              <ExternalLink className="ic" width="12" height="12" />
            </Link>
            , reviewed {getDateString(match.provider.lastReviewedAt)}.
          </p>
        </div>
      )}
      {match.provider.minimumInvestment && (
        <p className="fit ok">
          <CircleCheck className="ic" width="16" height="16" />
          <span>{match.provider.minimumInvestment}</span>
        </p>
      )}
      <details className="pc" data-pc="a">
        <summary>Pros and cons</summary>
        <div className="pc-g">
          <div>
            <b>Pros</b>
            <ul>
              {match.provider.pros.map((pro, i) => (
                <li key={`${match.provider.slug}_pro_${i}`}>{pro}</li>
              ))}
            </ul>
          </div>
          <div>
            <b>Cons</b>
            <ul>
              {match.provider.cons.map((con, i) => (
                <li key={`${match.provider.slug}_con_${i}`}>{con}</li>
              ))}
            </ul>
          </div>
        </div>
      </details>
      <div className="reqs">
        <b>Account requirements</b>
        <ul>
          {match.provider.accountRequirements.map((areq, i) => (
            <li key={`${match.provider.slug}_areq_${i}`}>{areq.requirement}</li>
          ))}
        </ul>
      </div>
      <footer className="opt-f">
        <div className="srcs">
          <span>Sources:</span>
          <Link
            href={match.provider.disclosureUrl}
            data-act="source"
            data-n="Provider pricing page"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              track("result_source_clicked", {
                public_id: snapshot.publicId,
                country_code: snapshot.input.countryCode,
                product_interest: snapshot.input.productInterest,
                result_count: snapshot.output.matches.length,
                data_version: snapshot.dataVersion,
                provider_id: match.provider.id,
                provider_slug: match.provider.slug,
                source_type: "Provider pricing page",
                source_url_host: new URL(match.provider.disclosureUrl).hostname,
                link_location: "provider_pricing_page",
              })
            }
          >
            Provider pricing page{" "}
            <ExternalLink className="ic" width="12" height="12" />
          </Link>
          <Link
            href={match.provider.halalScreening.source?.url || "#"}
            data-act="source"
            data-n="Provider screening page"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              track("result_source_clicked", {
                public_id: snapshot.publicId,
                country_code: snapshot.input.countryCode,
                product_interest: snapshot.input.productInterest,
                result_count: snapshot.output.matches.length,
                data_version: snapshot.dataVersion,
                provider_id: match.provider.id,
                provider_slug: match.provider.slug,
                source_type: "Provider screening page",
                source_url_host: new URL(
                  match.provider.halalScreening.source?.url || "#",
                ).hostname,
                link_location: "provider_screening_page",
              })
            }
          >
            Provider screening page{" "}
            <ExternalLink className="ic" width="12" height="12" />
          </Link>
        </div>
        <div className="opt-a">
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            data-act="report"
            data-n={match.provider.slug}
          >
            <Flag className="ic" width="16" height="16" /> Report a problem
          </button>
          <Link
            className="btn btn-secondary btn-sm"
            href={match.provider.websiteUrl || match.provider.disclosureUrl}
            data-act="visit"
            data-pid="a"
            target="_blank"
            rel={
              match.provider.isAffiliated
                ? "sponsored noopener noreferrer"
                : "noopener noreferrer"
            }
            onClick={() =>
              track("provider_outbound_clicked", {
                public_id: snapshot.publicId,
                country_code: snapshot.input.countryCode,
                product_interest: snapshot.input.productInterest,
                result_count: snapshot.output.matches.length,
                data_version: snapshot.dataVersion,
                provider_id: match.provider.id,
                provider_slug: match.provider.slug,
                provider_type: match.provider.type,
                is_affiliated: match.provider.isAffiliated,
                cta_location: "provider_article",
                cta_label: "Visit provider",
              })
            }
          >
            Visit provider{" "}
            <ExternalLink className="ic" width="16" height="16" />
          </Link>
        </div>
      </footer>
      {match.provider.isAffiliated && (
        <p className="aff">
          <Info className="ic" width="14" height="14" />
          <span>
            This is a referral link. Sahihfolio may earn a commission if you
            open an account through it. It doesn’t change which options appear
            or their order.{" "}
            <Link href="/disclosures">Read our disclosures</Link>.
          </span>
        </p>
      )}
    </article>
  );
}
