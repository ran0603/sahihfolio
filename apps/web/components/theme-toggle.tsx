"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

function setThemeCookie(theme: "light" | "dark") {
  document.cookie = `theme=${theme}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="h-10 w-10 rounded-lg border"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => {
        const next = isDark ? "light" : "dark";
        setTheme(next);
        setThemeCookie(next);
      }}
      className={isDark ? "icon-btn on-dark" : "icon-btn on-light"}
      data-act="theme"
    >
      {isDark ? <Sun /> : <Moon />}
    </button>
  );
}
