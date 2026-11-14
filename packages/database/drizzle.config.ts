import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
import * as fs from "fs";
import path from "path";

// Load .env only when it exists (helps locally)
const rootEnv = path.resolve(__dirname, "../../.env");
if (fs.existsSync(rootEnv)) dotenv.config({ path: rootEnv });

const localEnv = path.resolve(__dirname, ".env");
if (fs.existsSync(localEnv)) dotenv.config({ path: localEnv });

if (!process.env.DATABASE_URL) {
  console.error(
    "❌ DATABASE_URL is missing – set it in the CI env or a .env file."
  );
  process.exit(1);
}

export default defineConfig({
  schema: "./src/schema/index.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL, // no non‑null assertion
  },
  verbose: true,
});