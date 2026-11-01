"use client";

import { useState } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import Link from "node_modules/next/link";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { label: "Options Finder", href: "/find" },
  { label: "Screening Reports", href: "/screening-report" },
  { label: "Methodology", href: "/methodology" },
  { label: "Disclosures", href: "/disclosures" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="nav">
        <div className="wrap nav-in">
          <Link className="logo" href="/">
            <span className="mono">Sf</span>Sahihfolio
          </Link>
          <nav className="links" aria-label="Primary">
            {navItems.map((item) => (
              <Link href={item.href} key={item.label}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="nav-r">
            <ThemeToggle />
            <Link
              className="btn btn-primary btn-sm nav-cta"
              href="/find"
              data-act="open-finder"
            >
              Find my options
            </Link>
            <button
              type="button"
              className="icon-btn on-dark burger"
              data-act="menu"
              aria-label="Open menu"
              aria-expanded="false"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="ic h-[22px] w-[22px]" />
            </button>
          </div>
        </div>
      </header>

      <div
        className="scrim"
        style={isMenuOpen ? { display: "block" } : { display: "none" }}
        data-act="menu"
      ></div>
      <div
        className="mmenu"
        style={isMenuOpen ? { display: "block" } : { display: "none" }}
      >
        {navItems.map((item) => (
          <Link
            className="ml"
            key={"m" + item.label}
            href={item.href}
            aria-current="page"
          >
            {item.label}
            <ChevronRight className="ic h-[18px] w-[18px]" />
          </Link>
        ))}
        <div className="mcta">
          <Link
            className="btn btn-primary full"
            href="/find"
            data-act="open-finder"
          >
            Find my options
          </Link>
        </div>
      </div>
    </>
  );
}
