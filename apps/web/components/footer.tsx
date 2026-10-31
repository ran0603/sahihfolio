"use client";

import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  if (pathname === "/find" || pathname?.startsWith("/find/")) {
    return null;
  }

  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <a className="logo" href="#">
              <span className="mono">Sf</span>Sahihfolio
            </a>
            <p>
              Halal-investing research with sources, dates and limitations in
              plain view.
            </p>
          </div>
          <div>
            <h5>Tools</h5>
            <a href="#">Options finder</a>
            <a href="#">Screening report</a>
          </div>
          <div>
            <h5>Trust</h5>
            <a href="#">Methodology</a>
            <a href="#">Disclosures</a>
            <a href="#">Data review log</a>
          </div>
          <div>
            <h5>Company</h5>
            <a href="#">Privacy</a>
            <a href="#">Contact</a>
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
