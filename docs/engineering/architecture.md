# Sahihfolio Engineering Architecture

## Monorepo Overview

Sahihfolio is organized as a pnpm workspace and Turborepo monorepo:

```
sahihfolio/
├─ apps/
│  └─ web/                     # Next.js public app + admin
├─ packages/
│  ├─ database/                # Drizzle schema, migrations, seed data
│  ├─ shared/                  # Zod schemas, types, constants, utilities
│  ├─ ui/                      # Shared React components and design tokens
│  └─ config/                  # ESLint, TypeScript, Tailwind, Prettier configs
├─ .github/
│  └─ workflows/
│     ├─ ci.yml
│     └─ deploy-preview.yml
├─ docs/
│  ├─ product/
│  ├─ engineering/
│  └─ content/
├─ .editorconfig
├─ .gitignore
├─ package.json
├─ pnpm-workspace.yaml
├─ turbo.json
└─ README.md
```

## Package Responsibilities

### 1. `apps/web`

- Primary Next.js 16 App Router application.
- Contains public routes:
  - `/`: Home landing page introducing the free tools.
  - `/finder`: Global Halal Investing Options Finder (country-specific broker and robo comparison).
  - `/screening-report`: Shariah Screening Reports for stocks and ETFs.
- Protected internal routes:
  - `/admin`: Dashboard overview and audit logs.
  - `/admin/providers`: Provider catalog management.
  - `/admin/screening`: Editorial review queue for Shariah screening reports.

### 2. `packages/database`

- PostgreSQL integration using Drizzle ORM.
- Tables:
  - `countries`: Country profiles, regulatory notices, supported providers, currency.
  - `providers`: Catalog of brokers, robo-advisors, and ETF providers with fee breakdowns and Shariah oversight.
  - `screeningReports`: Shariah compliance reports, business-activity ratios, financial metrics, and citations.
  - `users`: Administrative and editorial staff accounts.
- Pre-packaged seed data for immediate local development.

### 3. `packages/shared`

- Pure TypeScript domain layer shared between apps and packages.
- Zod validation schemas for forms and APIs.
- Domain enums, constants, and formatting utilities (currency, percentage, dates).

### 4. `packages/ui`

- Shared React component library built on Sahihfolio brand design tokens.
- Accessible components: `Button`, `Badge`, `Card`, `Input`, `Select`, `DisclaimerBanner`.

### 5. `packages/config`

- Centralized configurations for TypeScript, ESLint, Tailwind CSS, and Prettier.

## CI/CD Pipeline

- GitHub Actions runs quality checks on all pull requests and pushes to `main`.
- PostgreSQL container service ensures database migrations and schema checks are verified in CI.
