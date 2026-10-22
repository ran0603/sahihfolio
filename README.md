# Sahihfolio

> Evidence-led research, Shariah screening methodologies, and sourced comparison of global halal investing routes.

---

## Architecture & Structure

Sahihfolio is built as a web-first monorepo using **pnpm workspaces** and **Turborepo**:

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

---

## Workspace Packages & Apps

| Package / App                              | Description                                                                                      | Technologies                          |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------- |
| [`apps/web`](./apps/web)                   | Next.js App Router public portal (`/`, `/find`, `/screening-report`) + `/admin` review console | Next.js 16, React 19, TypeScript      |
| [`packages/database`](./packages/database) | PostgreSQL models, migrations, and seed scripts                                                  | Drizzle ORM, Postgres.js, Drizzle Kit |
| [`packages/shared`](./packages/shared)     | Shared domain types, Zod validation schemas, constants, and formatting utilities                 | TypeScript, Zod                       |
| [`packages/ui`](./packages/ui)             | Reusable React UI component library based on Sahihfolio brand tokens                             | React 19, TypeScript, Brand Tokens    |
| [`packages/config`](./packages/config)     | Shared tooling configs (TypeScript, ESLint, Tailwind CSS, Prettier)                              | TypeScript, ESLint 9/10, Tailwind CSS |

---

## Getting Started

### Prerequisites

- **Node.js**: `>= 24.21.0` (or `22.x` / LTS)
- **pnpm**: `12.4.2` (`corepack enable pnpm`)
- **PostgreSQL**: `16+`

### Installation

```bash
# Clone the repository
git clone https://github.com/ran0603/sahihfolio.git
cd sahihfolio

# Install workspace dependencies
pnpm install
```

### Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Ensure your `DATABASE_URL` is configured:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/sahihfolio"
```

### Database Setup & Seeding

```bash
# Run migrations or push schema
pnpm --filter @sahihfolio/database db:push

# Seed initial countries, providers, and sample reports
pnpm --filter @sahihfolio/database db:seed
```

### Local Development

Start all workspace applications and watchers concurrently with Turborepo:

```bash
pnpm dev
```

The web application will be running at [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

| Command                  | Purpose                                        |
| ------------------------ | ---------------------------------------------- |
| `pnpm dev`               | Run all apps and packages in dev mode          |
| `pnpm build`             | Build all apps and packages for production     |
| `pnpm lint`              | Lint workspace source code with ESLint         |
| `pnpm typecheck`         | Run TypeScript type checks across the monorepo |
| `pnpm test`              | Run automated test suites                      |
| `pnpm db:migrate`        | Apply pending database migrations              |
| `pnpm db:seed`           | Seed initial countries, and screening reports  |
| `pnpm db:seed:providers` | Seed initial providers                         |

---

## Documentation

Detailed specifications and guidelines are located in the [`docs/`](./docs) directory:

- [Product Documentation](./docs/product/README.md)
  - [Options Finder Specification](./docs/product/options-finder-spec.md)
  - [MVP GitHub Issues Roadmap](./docs/product/github-issues.md)
- [Engineering Documentation](./docs/engineering/README.md)
  - [Monorepo Architecture](./docs/engineering/architecture.md)
  - [Shariah Screening Report Dev Plan](./docs/engineering/dev-plan.md)
- [Content & Brand Documentation](./docs/content/README.md)
  - [Brand Book v2.0 (Design tokens, Voice & Tone)](./docs/content/brand-book.md)

---

## Contributing

We welcome contributions! Please review our [Contributing Guide](./CONTRIBUTING.md) for branch naming conventions, development setup, code standards, and the pull request workflow.

---

## License

Private & Proprietary © Sahihfolio.
