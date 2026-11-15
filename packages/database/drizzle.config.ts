import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
import * as fs from "fs";
import path from "path";

const rootEnv = path.resolve(__dirname, "../../.env");
if (fs.existsSync(rootEnv)) {
  dotenv.config({ path: rootEnv });
  console.log(`✅ Loaded root .env from ${rootEnv}`);
} else {
  console.error(`❌ .env not found at ${rootEnv}`);
  process.exit(1);
}

export default defineConfig({
  schema: "./src/schema/index.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/sahihfolio" },
  verbose: true,
});