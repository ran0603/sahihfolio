# @sahihfolio/database

Database schemas, migrations, and seed data for Sahihfolio using Drizzle ORM and PostgreSQL.

## Schemas

- `countries`: Country profiles, regulatory notices, restrictions, supported currencies
- `providers`: Global broker and robo-advisor catalog with fees, halal screening notes, and disclosure URLs
- `screeningReports`: Shariah screening research reports with business-activity and financial ratio breakdowns
- `users`: Administrative user and editorial reviewer accounts

## Scripts

- `pnpm --filter @sahihfolio/database db:generate`: Generate migration files
- `pnpm --filter @sahihfolio/database db:migrate`: Run pending migrations
- `pnpm --filter @sahihfolio/database db:push`: Push schema to database
- `pnpm --filter @sahihfolio/database db:seed`: Seed sample data
