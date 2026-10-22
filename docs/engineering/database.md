# Database Setup & Workflow

The `@sahihfolio/database` package owns the PostgreSQL schema, migrations, and seed data for Sahihfolio. It uses [Drizzle ORM](https://orm.drizzle.team/) as the query builder and [drizzle-kit](https://orm.drizzle.team/kit-docs/overview) to generate and apply migrations.

---

## Prerequisites

| Requirement | Minimum version                               |
| ----------- | --------------------------------------------- |
| Node.js     | `>= 24.21.0`                                  |
| pnpm        | `12.4.2`                                      |
| PostgreSQL  | `16` (local) or a hosted provider (e.g. Neon) |

---

## Environment Variable

All database commands require a `DATABASE_URL` to be set. The config loader checks two locations in order:

1. **`/.env`** (monorepo root) — shared across all packages.
2. **`/packages/database/.env`** — local override for the database package only.

```dotenv
# .env (monorepo root)
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>?sslmode=require"
```

### Local PostgreSQL (default fallback)

If `DATABASE_URL` is not set, the package falls back to:

```
postgresql://postgres:postgres@localhost:5432/sahihfolio
```

To use this default, ensure a local PostgreSQL server is running and a database named `sahihfolio` has been created:

```bash
psql -U postgres -c "CREATE DATABASE sahihfolio;"
```

### Remote PostgreSQL (Neon)

The project is configured to use [Neon](https://neon.tech/) as the hosted PostgreSQL provider. Add the connection string from your Neon project dashboard to `/.env`:

```dotenv
DATABASE_URL="postgresql://<user>:<password>@<host>.neon.tech/<database>?sslmode=require&channel_binding=require"
```

> [!NOTE]
> Neon connections use SSL by default. The `sslmode=require` flag is mandatory. If you see a `SECURITY WARNING` about SSL mode aliasing from `pg-connection-string`, explicitly appending `sslmode=verify-full` or `uselibpqcompat=true` will suppress it — this is a cosmetic warning only and does not affect functionality.

---

## Commands

All database commands can be run from the **monorepo root** or from within `packages/database`.

### From the monorepo root

```bash
# Generate a new migration from schema changes
pnpm db:generate

# Apply all pending migrations
pnpm db:migrate

# Seed the database with development data
pnpm db:seed
```

### From within `packages/database`

```bash
cd packages/database

pnpm db:generate   # drizzle-kit generate
pnpm db:migrate    # drizzle-kit migrate
pnpm db:push       # drizzle-kit push (schema sync without migration files)
pnpm db:seed       # tsx src/seed.ts
```

> [!IMPORTANT]
> `pnpm db:generate` and `pnpm db:push` are not exposed at the monorepo root. Run them from inside `packages/database` when needed.

---

## First-Time Setup

Follow these steps to get a working local database from scratch:

```bash
# 1. Install dependencies (from monorepo root)
pnpm install

# 2. Copy and populate the environment file
cp .env.example .env  # or create .env manually
# Then set DATABASE_URL to your local or Neon connection string

# 3. Generate the initial migration (already committed — skip unless schema changed)
pnpm db:generate

# 4. Apply migrations
pnpm db:migrate

# 5. Seed development data
pnpm db:seed
```

After a successful seed you should see:

```
✅ Sahihfolio database seeded successfully!
```

---

## Schema Overview

Schemas live in `packages/database/src/schema/`. Each table is defined in its own file and re-exported from `index.ts`.

### `users`

Administrative and editorial staff accounts.

| Column       | Type           | Notes                                                |
| ------------ | -------------- | ---------------------------------------------------- |
| `id`         | `varchar(50)`  | Primary key — manually assigned (e.g. `usr_admin_1`) |
| `email`      | `varchar(255)` | Unique                                               |
| `name`       | `varchar(150)` | Display name                                         |
| `role`       | `varchar(50)`  | Defaults to `admin`                                  |
| `created_at` | `timestamptz`  | Auto-set                                             |
| `updated_at` | `timestamptz`  | Auto-set                                             |

### `countries`

Country profiles including regulatory context and supported providers.

| Column                | Type           | Notes                                         |
| --------------------- | -------------- | --------------------------------------------- |
| `code`                | `varchar(2)`   | ISO 3166-1 alpha-2 primary key (e.g. `MY`)    |
| `name`                | `varchar(100)` | Full country name                             |
| `currency`            | `varchar(3)`   | ISO 4217 currency code (e.g. `MYR`)           |
| `region`              | `varchar(50)`  | Geographical region                           |
| `regulatory_notes`    | `jsonb`        | `string[]` — regulator notes                  |
| `supported_providers` | `jsonb`        | `string[]` — provider names active in-country |
| `restrictions`        | `jsonb`        | `string[]` — known investor restrictions      |
| `source_urls`         | `jsonb`        | `string[]` — regulatory source links          |
| `last_reviewed_at`    | `timestamptz`  | Last editorial review date                    |

### `providers`

Catalog of brokers, robo-advisors, and ETF providers.

| Column            | Type           | Notes                                                           |
| ----------------- | -------------- | --------------------------------------------------------------- |
| `id`              | `varchar(50)`  | Primary key (e.g. `prov_ibkr`)                                  |
| `slug`            | `varchar(150)` | Unique URL slug                                                 |
| `type`            | `varchar(50)`  | `broker`, `robo_advisor`, `managed_portfolio`, `etf_provider`   |
| `countries`       | `jsonb`        | `string[]` — ISO country codes where available                  |
| `markets`         | `jsonb`        | `string[]` — markets accessible through the provider            |
| `asset_types`     | `jsonb`        | `string[]` — e.g. `stocks`, `etfs`, `sukuk`, `gold`             |
| `halal_screening` | `jsonb`        | `{ supported, methodology?, notes?, sourceUrl? }`               |
| `fees`            | `jsonb`        | `{ trading?, management?, fx?, custody?, withdrawal?, other? }` |
| `pros` / `cons`   | `jsonb`        | `string[]` — editorial notes                                    |
| `status`          | `varchar(20)`  | `published` or `draft` or `archived`                            |

### `screening_reports`

Shariah compliance reports for stocks and ETFs.

| Column              | Type          | Notes                                              |
| ------------------- | ------------- | -------------------------------------------------- |
| `id`                | `varchar(50)` | Primary key (e.g. `rep_aapl_aaoifi`)               |
| `ticker`            | `varchar(15)` | Stock ticker symbol                                |
| `methodology`       | `varchar(50)` | Screening standard (e.g. `AAOIFI`)                 |
| `screening_result`  | `varchar(50)` | e.g. `screened_compliant`, `non_compliant`         |
| `status`            | `varchar(20)` | Defaults to `draft`                                |
| `business_activity` | `jsonb`       | Pass/fail ratio analysis                           |
| `financial_ratios`  | `jsonb`       | Debt-to-market-cap, liquid assets, interest income |
| `sources`           | `jsonb`       | `Array<{ label, url, sourceType, retrievedAt }>`   |
| `expires_at`        | `timestamptz` | Report validity window (typically 90 days)         |

---

## Migrations

Migration files live in `packages/database/migrations/` and are tracked in version control.

| File                       | Description                              |
| -------------------------- | ---------------------------------------- |
| `0000_even_celestials.sql` | Initial schema — creates all four tables |

### Generating a new migration

After editing any schema file under `src/schema/`, run:

```bash
cd packages/database
pnpm db:generate
```

drizzle-kit compares the current schema against the last migration snapshot and produces a new `.sql` file. **Always commit generated migration files.**

### Applying migrations

```bash
pnpm db:migrate   # from the monorepo root
```

drizzle-kit applies all unapplied migration files in order using the `pg` driver.

### Push (no migration file)

During rapid schema iteration you can sync the schema directly to the database without generating a migration file:

```bash
cd packages/database
pnpm db:push
```

> [!WARNING]
> `db:push` is destructive in certain scenarios (column renames, type changes). Only use it against a local or throwaway database — never against staging or production.

---

## Seed Data

`packages/database/src/seed.ts` inserts representative development data using `ON CONFLICT DO NOTHING`, so it is safe to run multiple times.

Seeded records:

| Table               | Records                                        |
| ------------------- | ---------------------------------------------- |
| `users`             | 1 admin user (`admin@sahihfolio.com`)          |
| `countries`         | 5 countries: US, GB, CA, MY, SG                |
| `providers`         | 2 providers: Interactive Brokers, Wahed Invest |
| `screening_reports` | 1 report: Apple Inc. (AAPL) — AAOIFI           |

---

## Database Client

The shared Drizzle client is exported from `packages/database/src/index.ts` and can be imported by any package in the monorepo:

```ts
import { db } from "@sahihfolio/database";
import { providers } from "@sahihfolio/database/schema";

const allProviders = await db.select().from(providers);
```

The connection pool is configured with `max: 10` connections. For serverless environments (e.g. Vercel Edge, Neon serverless), consider switching to the `neon-http` driver.

---

## Troubleshooting

### `ECONNREFUSED` during `db:seed` or `db:migrate`

The client cannot reach the database. Check that:

1. `DATABASE_URL` is set correctly in `.env`.
2. Your local PostgreSQL server is running (if using the default fallback URL).
3. The Neon project is not in sleep mode — make a request to wake it.

### `injected env (0) from .env` in drizzle-kit output

drizzle-kit found the config file but loaded zero variables from `.env`. This usually means:

- The `.env` file doesn't exist at the expected path.
- `DATABASE_URL` is missing or commented out.

drizzle-kit reads from `../../.env` (monorepo root) first, then `./env` (package root) as a local override.

### SSL warning from `pg-connection-string`

The warning about `prefer`/`require`/`verify-ca` being aliased to `verify-full` is informational. To opt into the new libpq-compatible behavior now, append `&uselibpqcompat=true` to your connection string.
