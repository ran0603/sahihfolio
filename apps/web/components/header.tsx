"use client";

import { useState } from "react";
import { Button } from "@sahihfolio/ui";
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
      <header className="bg-[#0B1F3A] dark:bg-[#161B26] text-white border border-b border-border dark:border-[#2A3243] w-full flex items-center justify-center py-[16px] px-[24px]">
        <div className="max-w-[1200px] w-full mx-auto items-center justify-between hidden md:flex">
          <div className="flex flex-row items-center gap-4">
            <Link
              href="/"
              style={{
                fontSize: "1.25rem",
                fontWeight: "700",
                letterSpacing: "-0.5px",
                marginRight: "2rem",
              }}
            >
              <h1>
                Sahih<span style={{ color: "#10B981" }}>folio</span>
              </h1>
            </Link>
            <nav className="flex gap-4">
              {navItems.map((item, index) => (
                <Link
                  key={"menu" + index}
                  href={item.href}
                  className="text-[#E4E7EC] hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-end align-center gap-2">
            <ThemeToggle />
            <Link
              href="/find"
              className="bg-[#10B981] rounded-lg px-4 py-2 font-semibold cursor-pointer"
            >
              <span className="text-[#0B1F3A]">Find My Options</span>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full px-[20px] mx-auto md:hidden">
          <Link
            href="/"
            style={{
              fontSize: "1.25rem",
              fontWeight: "700",
              letterSpacing: "-0.5px",
              marginRight: "2rem",
            }}
          >
            Sahih<span style={{ color: "#10B981" }}>folio</span>
          </Link>
          <div className="flex items-center gap-2 ml-auto">
            <ThemeToggle />
            <Button
              variant="outline"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-colors bg-[#0B1F3A] dark:bg-[#161B26] text-white hover:bg-[#2D4B73] dark:hover:bg-[#06231A] cursor-pointer"
            >
              <span className="text-white">
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </span>
            </Button>
          </div>
        </div>
      </header>
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-[76px] left-0 w-full h-full z-5 bg-[#0b1f3a80] dark:bg-[#161b2680] backdrop-blur-sm`}
        data-act="menu"
      ></div>
      <div
        className={[
          "absolute top-[76px] left-0 w-full overflow-y-auto z-10",
          "bg-surface dark:bg-[#0B0F18] text-foreground",
          "border-b border-border dark:border-[#2A3243]",
          isMenuOpen ? "block" : "hidden",
        ].join(" ")}
        style={{ maxHeight: "calc(100vh - 73px)" }}
      >
        <div className="max-w-[1200px] mx-auto">
          <nav className="flex flex-col" aria-label="Primary">
            {navItems.map((item, index) => (
              <Link
                key={"menu" + index}
                href={item.href}
                className="text-lg font-medium hover:text-info flex items-center justify-between border-b border-border px-[20px] py-[15px]"
              >
                {item.label}
                <ChevronRight size={20} />
              </Link>
            ))}
          </nav>
          <div className="px-[20px] py-[15px]">
            <Link
              href="/find"
              className="bg-[#10B981] text-center h-[48px] flex items-center justify-center rounded-lg px-4 py-2 font-semibold cursor-pointer"
            >
              <span className="text-[#0B1F3A]">Find My Options</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
