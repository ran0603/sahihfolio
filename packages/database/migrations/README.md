# Database Migrations

This folder stores generated SQL migrations for Drizzle ORM.

## Commands

- Generate migrations from schema changes:

  ```bash
  pnpm --filter @sahihfolio/database db:generate
  ```

- Apply migrations to the database:

  ```bash
  pnpm --filter @sahihfolio/database db:migrate
  ```

- Push schema directly to database (development only):

  ```bash
  pnpm --filter @sahihfolio/database db:push
  ```

- Seed sample countries, providers, and screening reports:
  ```bash
  pnpm --filter @sahihfolio/database db:seed
  ```
