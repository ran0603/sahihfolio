import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import { resultSnapshots } from "./result-snapshots";
import { ASSET_TYPES } from "@sahihfolio/shared/constants";

export const sourceEnum = pgEnum("source", [
  "finder",
  "screening_report",
  "footer",
  "other",
]);

export const productInterestEnum = pgEnum("product_interest", [
  "all",
  "unsure",
  "unset",
  ...ASSET_TYPES,
]);

export const emailCaptures = pgTable("email_captures", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull(),
  resultSnapshotId: uuid("result_snapshot_id").references(
    () => resultSnapshots.id,
  ),
  countryCode: text("country_code"),
  productInterest: productInterestEnum("product_interest").default("unset"),
  consent: boolean("consent").default(false),
  source: sourceEnum("source").default("finder"),
  unsubscribeToken: text("unsubscribe_token").unique(),
  unsubscribedAt: timestamp("unsubscribed_at", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
});
