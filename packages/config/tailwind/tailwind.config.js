/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#0B1F3A", // Deep Navy
          700: "#2D4B73", // Slate Blue
        },
        accent: {
          primary: "#10B981", // Emerald
          secondary: "#14B8A6", // Teal
          premium: "#D4A017", // Gold
        },
        surface: {
          DEFAULT: "var(--surface)",
          elevated: "var(--surface-elevated)",
        },
        border: "var(--border)",
        text: {
          primary: "var(--text-primary)",
          muted: "var(--text-muted)",
        },
        semantic: {
          positive: "#039855",
          negative: "#D92D20",
          warning: "#DC6803",
          neutral: "#667085",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
