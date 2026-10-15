import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { providers } from "./providers";
import { sources, confidenceEnum } from "./sources";

export const providerSources = pgTable(
  "provider_sources",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    providerId: uuid("provider_id")
      .notNull()
      .references(() => providers.id, { onDelete: "cascade" }),
    sourceId: uuid("source_id")
      .notNull()
      .references(() => sources.id, { onDelete: "restrict" }),
    fieldPath: text("field_path"), // e.g. "fees", "availability", "accountRequirements"
    confidence: confidenceEnum("confidence").notNull().default("medium"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("provider_sources_provider_idx").on(table.providerId),
    index("provider_sources_source_idx").on(table.sourceId),
  ],
);