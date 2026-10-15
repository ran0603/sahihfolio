import type { Migration } from 'drizzle-orm/migrator';

export const migration: Migration = {
  up: async (db) => {
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS providers_countries_gin_idx
      ON providers USING gin (countries);
    `);

    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS providers_type_status_idx
      ON providers (type, status);
    `);
  },
  down: async (db) => {
    await db.execute(sql`
      DROP INDEX IF EXISTS providers_type_status_idx;
    `);

    await db.execute(sql`
      DROP INDEX IF EXISTS providers_countries_gin_idx;
    `);
  },
};