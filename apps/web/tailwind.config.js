/** @type {import('tailwindcss').Config} */
const shared = require("@sahihfolio/config").tailwind;

module.exports = {
  ...shared,
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};
