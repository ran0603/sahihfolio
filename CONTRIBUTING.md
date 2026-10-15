# Contributing to Sahihfolio

Thank you for your interest in contributing to **Sahihfolio**! We are building an evidence-led platform providing Shariah screening methodologies, rigorous research, and verified comparisons of global halal investing routes.

To maintain high data integrity, code quality, and ethical alignment, please review this guide before getting started.

---

## Table of Contents

1. [Code of Conduct & Values](#code-of-conduct--values)
2. [Monorepo Architecture](#monorepo-architecture)
3. [Prerequisites & Development Setup](#prerequisites--development-setup)
4. [Git & Branch Naming Conventions](#git--branch-naming-conventions)
5. [Commit Message Guidelines](#commit-message-guidelines)
6. [Coding & Engineering Standards](#coding--engineering-standards)
7. [Available Scripts](#available-scripts)
8. [Pull Request (PR) Workflow](#pull-request-pr-workflow)
9. [Issue Reporting & Labeling](#issue-reporting--labeling)

---

## Code of Conduct & Values

Sahihfolio operates on principles of **transparency, research rigor, and Islamic ethics**. Contributors are expected to:

- **Ensure Data Accuracy**: All financial metrics, screening criteria, and provider fee models must be accurate, sourced, and traceable.
- **Maintain Shariah Integrity**: Calculations and methodologies must adhere strictly to established standards (such as AAOIFI Standard No. 21 and DJIM) as documented in our product and compliance specifications.
- **Communicate Professionally**: Foster a welcoming, respectful, and collaborative environment across issues, pull requests, and discussions.

---

## Monorepo Architecture

Sahihfolio is structured as a monorepo powered by **pnpm workspaces** and **Turborepo**:

```text
sahihfolio/
├─ apps/
│  └─ web/                 # Next.js 16 App Router (public portal & /admin console)
├─ packages/
│  ├─ database/            # Drizzle ORM schemas, migrations, PostgreSQL client & seeds
│  ├─ shared/              # Shared Zod schemas, TypeScript types, constants, formatters
│  ├─ ui/                  # Reusable React component library & brand design tokens
│  └─ config/              # Centralized ESLint, TypeScript, Tailwind, Prettier configs
├─ .github/
│  └─ workflows/           # GitHub Actions CI pipelines (quality checks & previews)
├─ docs/                   # Product specs, engineering architecture, brand guidelines
├─ package.json            # Root workspace scripts & devDependencies
├─ pnpm-workspace.yaml     # Monorepo workspace definition
├─ turbo.json              # Turborepo task pipeline configuration
└─ CONTRIBUTING.md         # Contribution guidelines
```

### Package Boundaries & Responsibilities

- **`apps/web`**: Contains the user-facing web portal (`/`, `/finder`, `/screening-report`) and editorial review dashboard (`/admin`). Depends on `@sahihfolio/database`, `@sahihfolio/shared`, and `@sahihfolio/ui`.
- **`packages/database`**: Single source of truth for PostgreSQL schemas, table definitions, and database migrations via Drizzle ORM.
- **`packages/shared`**: Pure TypeScript domain logic, Zod validation schemas, business constants, and formatting utilities. Must **not** depend on React or database drivers.
- **`packages/ui`**: Shared, accessible presentation components adhering to the Sahihfolio Brand Book tokens.
- **`packages/config`**: Reusable configurations for build and developer tooling.

---

## Prerequisites & Development Setup

### System Prerequisites

Make sure you have the following installed locally:

- **Node.js**: `>= 24.21.0` (or `22.x` LTS)
- **pnpm**: `12.4.2` (enable with `corepack enable pnpm` or `npm install -g pnpm@12.4.2`)
- **PostgreSQL**: `16+` (running locally or in Docker)
- **Git**: `2.30+`

### Step-by-Step Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ran0603/sahihfolio.git
   cd sahihfolio
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Configure environment variables:**

   ```bash
   cp .env.example .env
   ```

   Open `.env` and configure your database connection string:

   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/sahihfolio"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Initialize the database:**
   Push the schema and seed sample data:

   ```bash
   # Push schema to local database
   pnpm --filter @sahihfolio/database db:push

   # Seed initial countries, providers, and sample screening reports
   pnpm db:seed
   ```

5. **Start local development:**
   ```bash
   pnpm dev
   ```
   The web application will be accessible at [http://localhost:3000](http://localhost:3000).

---

## Git & Branch Naming Conventions

All active development is managed through Git feature branches targeting the `main` branch. Direct pushes to `main` are restricted.

### Branch Naming Patterns

Branches must follow one of these two standard conventions, written in **lowercase kebab-case**:

#### 1. Issue-Linked Branches (Recommended)

When working on an existing GitHub issue, prefix the branch with the issue number:

```text
<issue-number>-<short-description>
```

**Examples:**

- `2-configure-nextjs-web-application`
- `3-setup-ci-pipeline`
- `14-screening-report-calculator`
- `26-country-broker-filtering`

#### 2. Categorized Prefixes

Alternatively, you can include the category prefix:

```text
<category>/<issue-number>-<short-description>
# or
<category>/<short-description>
```

| Prefix      | Description                                   | Example                                 |
| ----------- | --------------------------------------------- | --------------------------------------- |
| `feat/`     | New user-facing feature or enhancement        | `feat/18-options-finder-filters`        |
| `fix/`      | Bug fix or calculation error correction       | `fix/42-dividend-purification-rounding` |
| `chore/`    | Tooling, monorepo configuration, dependencies | `chore/3-setup-ci-pipeline`             |
| `docs/`     | Documentation additions or updates            | `docs/screening-methodology-guide`      |
| `refactor/` | Code refactoring without behavior changes     | `refactor/zod-schemas-shared`           |
| `test/`     | Adding or updating automated test suites      | `test/shariah-debt-ratio-suites`        |

---

## Commit Message Guidelines

We follow the **[Conventional Commits](https://www.conventionalcommits.org/)** specification. Clear, structured commit messages enable automated changelogs and simplify code reviews.

### Format

```text
<type>(<optional scope>): <subject>

[optional body]

[optional footer(s)]
```

### Commit Types

- `feat`: A new feature or user-facing functionality.
- `fix`: A bug fix or calculation adjustment.
- `docs`: Documentation changes only (`README`, `docs/`, inline docstrings).
- `refactor`: Code changes that neither fix a bug nor add a feature.
- `perf`: Performance improvements.
- `test`: Adding or correcting tests.
- `chore`: Maintenance tasks, dependency bumps, configuration updates.
- `ci`: Changes to CI/CD workflows and scripts (`.github/workflows/`).

### Recommended Scopes

Use the monorepo package or functional area as the scope:

- `web`: Applications in `apps/web`
- `database`: Schemas and migrations in `packages/database`
- `shared`: Schemas, types, and utils in `packages/shared`
- `ui`: Shared UI components in `packages/ui`
- `config`: Tooling configs in `packages/config`
- `deps`: Dependency updates

### Examples

```text
feat(web): add global halal options finder country selector
fix(shared): correct debt-to-market-cap ratio calculation formula
feat(database): add screening_reports table and migration
docs(product): add options finder mobile UX flow
chore(ci): pin pnpm version in github action workflow
```

---

## Coding & Engineering Standards

### 1. TypeScript & Type Safety

- Strict type checking is enforced across all apps and packages (`"strict": true`).
- **Never use `any`**. Use explicit interfaces, types, `unknown`, or generic parameters.
- Shared domain types and validation models belong in `packages/shared`, not in application-specific components.

### 2. React & Next.js Best Practices

- **Server Components by default**: Use React Server Components (RSC) for data-fetching and static rendering.
- Add `"use client"` only when interactive state, browser event listeners, or client hooks (`useState`, `useEffect`) are strictly necessary.
- Ensure all interactive elements have accessible labels (`aria-label`, semantic elements, descriptive text).

### 3. Styling & Brand Consistency

- Sahihfolio uses **Tailwind CSS** configured through `@sahihfolio/config/tailwind`.
- Consult [`docs/content/brand-book.md`](./docs/content/brand-book.md) for brand colors:
  - **Sahih Navy** (`#0B1B2B`): Primary foundation and authority.
  - **Halal Emerald** (`#0D6E54`): Trust, compliance, positive indicators.
  - **Desert Gold** (`#C89B3C`): Accents, highlights, and secondary actions.
  - **Muted Slate & Warm Neutrals**: Clean background contrasts.
- Prefer shared components from `@sahihfolio/ui` over ad-hoc component recreation.

### 4. Database & Drizzle ORM

- All schema modifications must be made in `packages/database/src/schema/`.
- Generate migration files using Drizzle Kit:
  ```bash
  pnpm --filter @sahihfolio/database db:generate
  ```
- **Do not manually edit generated migration SQL files.**
- Ensure foreign keys, unique constraints, and indices are defined for query-heavy columns.

### 5. Shariah Screening & Financial Logic Rigor

- Financial formulas (e.g. debt-to-market cap ratios, non-permissible revenue percentages, dividend purification) must be backed by unit tests.
- Reference authoritative standards (AAOIFI Standard 21, DJIM, FTSE) in code comments when implementing methodology thresholds.

---

## Available Scripts

Run these scripts from the repository root:

| Command           | Description                                           |
| ----------------- | ----------------------------------------------------- |
| `pnpm dev`        | Run all applications and packages in development mode |
| `pnpm build`      | Build all workspace applications for production       |
| `pnpm lint`       | Run ESLint across the monorepo                        |
| `pnpm typecheck`  | Run TypeScript compiler checks (`tsc --noEmit`)       |
| `pnpm test`       | Run test suites across all packages                   |
| `pnpm format`     | Check and apply Prettier code formatting              |
| `pnpm db:migrate` | Apply pending database migrations                     |
| `pnpm db:seed`    | Run database seed script with sample data             |

To target a specific package or app, use the `--filter` flag:

```bash
# Run tests only in shared package
pnpm --filter @sahihfolio/shared test

# Generate database migrations
pnpm --filter @sahihfolio/database db:generate

# Push schema directly in local dev
pnpm --filter @sahihfolio/database db:push
```

---

## Pull Request (PR) Workflow

1. **Synchronize your local branch:**

   ```bash
   git checkout main
   git pull origin main
   git checkout -b <issue-number>-<short-description>
   ```

2. **Make your changes:**
   - Write clean, well-tested code adhering to repository standards.
   - Keep pull requests focused on a single responsibility.

3. **Verify locally before pushing:**
   Run the full verification suite to ensure CI will pass:

   ```bash
   pnpm lint
   pnpm typecheck
   pnpm test
   pnpm build
   ```

4. **Format your code:**

   ```bash
   pnpm format
   ```

5. **Commit and push:**

   ```bash
   git add .
   git commit -m "feat(web): add provider comparison card"
   git push origin <your-branch-name>
   ```

6. **Open a Pull Request:**
   - **Title**: Use the Conventional Commits format (e.g. `feat(web): add provider comparison card`).
   - **Description**: Provide a concise summary of the changes, rationale, and how to verify.
   - **Issue Linkage**: Link the corresponding issue using GitHub keywords (e.g., `Closes #12` or `Fixes #34`).
   - **UI Changes**: Include before/after screenshots or screen recordings for visual modifications.

7. **CI Quality Gates:**
   Every PR triggers the GitHub Actions CI workflow, running:
   - Dependency verification (`pnpm install --frozen-lockfile`)
   - ESLint checks (`pnpm lint`)
   - TypeScript verification (`pnpm typecheck`)
   - Automated tests (`pnpm test`)
   - Monorepo production build (`pnpm build`)

   All checks must pass before a pull request can be merged.

---

## Issue Reporting & Labeling

### Reporting Issues

- **Bug Reports**: Include clear steps to reproduce, expected vs. actual behavior, browser/OS version, and screenshots if applicable.
- **Feature Requests**: Outline the business context, user need, proposed solution, and alignment with Sahihfolio's product roadmap.

### GitHub Label Taxonomy

| Category     | Label             | Meaning                                        |
| ------------ | ----------------- | ---------------------------------------------- |
| **Type**     | `type:feature`    | New feature or functionality                   |
|              | `type:bug`        | Bug or calculation discrepancy                 |
|              | `type:chore`      | Monorepo maintenance, tooling, or dependencies |
|              | `type:docs`       | Documentation additions or edits               |
| **Area**     | `area:web`        | Next.js application in `apps/web`              |
|              | `area:data`       | Database schema, seeds, or ingestion           |
|              | `area:compliance` | Shariah screening rules and calculation models |
|              | `area:content`    | Editorial copy, brand assets, and guides       |
|              | `area:growth`     | Analytics, SEO, and user acquisition           |
|              | `area:product`    | Product specifications and roadmap             |
| **Priority** | `priority:p0`     | Critical path / blocker for MVP                |
|              | `priority:p1`     | High priority for current milestone            |
|              | `priority:p2`     | Nice-to-have / post-MVP enhancement            |

---

## Questions and Support

If you have questions about Shariah methodology implementations or architectural patterns, please open an issue or start a discussion on the repository. Thank you for helping build trusted, evidence-led halal investing research for the global community!
