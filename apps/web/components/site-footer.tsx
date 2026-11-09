"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname === "/find" || pathname?.startsWith("/find/")) {
    return (
      <footer className="pfoot">
        <div className="wrap">
          <p>
            Sahihfolio provides general educational information. It does not
            provide personalized investment, tax, legal, accounting, or Shariah
            advice. Verify details directly with each provider before making a
            decision.
          </p>
          <nav>
            <Link href="/methodology">Methodology</Link>
            <Link href="/disclosures">Disclosures</Link>
          </nav>
        </div>
      </footer>
    );
  }

  if (
    pathname === "/results" ||
    pathname?.startsWith("/results/") ||
    pathname === "/methodology" ||
    pathname?.startsWith("/methodology/")
  ) {
    return (
      <footer className="pfoot">
        <div className="wrap">
          <p>
            Informational only. Not investment, tax, legal or Shariah advice.
          </p>
          <nav>
            <Link href="/methodology">Methodology</Link>
            <Link href="/disclosures">Disclosures</Link>
          </nav>
        </div>
      </footer>
    );
  }

  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link className="logo" href="/">
              <span className="mono">Sf</span>Sahihfolio
            </Link>
            <p>
              Halal-investing research with sources, dates and limitations in
              plain view.
            </p>
          </div>
          <div>
            <h5>Tools</h5>
            <Link href="/find">Options finder</Link>
            <Link href="/screening-report">Screening report</Link>
          </div>
          <div>
            <h5>Trust</h5>
            <Link href="/methodology">Methodology</Link>
            <Link href="/disclosures">Disclosures</Link>
            <Link href="#">Data review log</Link>
          </div>
          <div>
            <h5>Company</h5>
            <Link href="#">Privacy</Link>
            <Link href="#">Contact</Link>
          </div>
        </div>
        <div className="disc">
          <b>Disclaimer.</b> Sahihfolio provides general educational
          information. It does not provide personalised investment, tax, legal,
          accounting, or Shariah advice. Verify details directly with each
          provider before making a decision. Data last reviewed 1 October 2026.
        </div>
      </div>
    </footer>
  );
}
