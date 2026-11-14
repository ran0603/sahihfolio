import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

/* ------------------- Load the repo‑root .env ------------------- */
const rootEnvPath = path.resolve(process.cwd(), ".env"); // <-- repo root
if (fs.existsSync(rootEnvPath)) {
  dotenv.config({ path: rootEnvPath });
  console.log(`✅ Loaded root .env from ${rootEnvPath}`);
} else {
  console.error(`❌ Could not locate .env at ${rootEnvPath}`);
  process.exit(1);
}

/* (Optional) Load a local .env next to the source file (dev only) */
const localEnv = path.resolve(__dirname, ".env");
if (fs.existsSync(localEnv)) dotenv.config({ path: localEnv });

/* ------------------- Validate required vars ------------------- */
if (!process.env.DATABASE_URL) {
  console.error(
    "❌ DATABASE_URL is missing – set it in the root .env or expose it as a CI secret."
  );
  process.exit(1);
}

/* ------------------- Drizzle DB initialization -------------- */
const connectionString = process.env.DATABASE_URL;
const client = postgres(connectionString, { max: 10 });
export const db = drizzle(client, { schema });

export * from "./schema";
export { schema };