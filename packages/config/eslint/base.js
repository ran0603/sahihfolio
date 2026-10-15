module.exports = [
  {
    ignores: ["**/node_modules/**", "**/.next/**", "**/dist/**", "**/.turbo/**"],
  },
  {
    rules: {
      "no-unused-vars": "off",
      "prefer-const": "warn",
    },
  },
];
