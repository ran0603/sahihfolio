Below are ready-to-create GitHub issues for the **Sahihfolio MVP**, organized as a web-first monorepo. Copy each into GitHub Issues; assign labels, milestone `MVP`, and add them to the **Sahihfolio Product Roadmap** project.

## Epic 1: Repository and platform

### Issue 1 — Initialize pnpm + Turborepo monorepo

**Labels:** `type:chore`, `area:web`, `priority:p0`

**Description**

Set up the Sahihfolio monorepo with pnpm workspaces and Turborepo.

**Tasks**

- [ ] Initialize Git repository and push to GitHub.
- [ ] Add `pnpm-workspace.yaml` with `apps/*` and `packages/*`.
- [ ] Add Turborepo and root task scripts.
- [ ] Create `apps/web`, `packages/database`, and `packages/shared`.
- [ ] Add `.gitignore`, `.editorconfig`, and `.env.example`.
- [ ] Ensure `pnpm install`, `pnpm dev`, `pnpm lint`, `pnpm typecheck`, and `pnpm build` work.

**Acceptance criteria**

- A fresh clone can install dependencies and run the web app locally.
- Workspace packages can import shared code.
- Root commands run through Turborepo.

***

### Issue 2 — Configure Next.js web application

**Labels:** `type:chore`, `area:web`, `priority:p0`

**Description**

Create the primary Next.js application for the public product and internal admin.

**Tasks**

- [ ] Create `apps/web` using Next.js App Router, TypeScript, Tailwind CSS, ESLint, and `src/`.
- [ ] Set package name to `@sahihfolio/web`.
- [ ] Configure base layout, metadata, favicon, and global styles.
- [ ] Add route groups for public pages and `/admin`.
- [ ] Add basic 404 and error pages.
- [ ] Configure environment-variable loading.

**Acceptance criteria**

- `/` renders a placeholder landing page.
- `/admin` renders a protected placeholder layout.
- Build passes locally and in CI.

***

### Issue 3 — Set up CI pipeline and branch protection

**Labels:** `type:chore`, `area:web`, `priority:p0`

**Description**

Add GitHub Actions CI and protect the `main` branch.

**Tasks**

- [ ] Add `.github/workflows/ci.yml`.
- [ ] Run install, lint, typecheck, test, and build on pull requests.
- [ ] Add PostgreSQL service container for future integration tests.
- [ ] Protect `main`: require passing CI and pull-request workflow.
- [ ] Add branch naming convention to `CONTRIBUTING.md`.

**Acceptance criteria**

- CI runs on every PR.
- Direct pushes to `main` are blocked.
- Failing lint, typecheck, test, or build blocks merge.

***

### Issue 4 — Create shared package for types and validation

**Labels:** `type:feature`, `area:web`, `priority:p0`

**Description**

Create `@sahihfolio/shared` for domain types, Zod schemas, constants, and utilities shared across apps and packages.

**Tasks**

- [ ] Add package `@sahihfolio/shared`.
- [ ] Add Zod.
- [ ] Define shared enums for provider type, asset type, screening result, and report status.
- [ ] Add input schemas for finder and screening-report forms.
- [ ] Add shared formatting helpers for currency, percentages, and dates.
- [ ] Add analytics event-name constants.

**Acceptance criteria**

- Web app imports types and schemas from `@sahihfolio/shared`.
- Shared schemas have unit tests.
- No duplicated domain enums exist in `apps/web`.

***

## Epic 2: Database and data foundation

### Issue 5 — Set up PostgreSQL database package

**Labels:** `type:feature`, `area:data`, `priority:p0`

**Description**

Create `@sahihfolio/database` with PostgreSQL, Drizzle ORM, migrations, and seed workflow.

**Tasks**

- [ ] Add `drizzle-orm`, `postgres`, `drizzle-kit`, `tsx`, and `dotenv`.
- [ ] Configure `DATABASE_URL`.
- [ ] Add migration, push, generate, and seed scripts.
- [ ] Connect to a development Postgres instance.
- [ ] Document local database setup in `docs/engineering/database.md`.

**Acceptance criteria**

- `pnpm db:migrate` runs successfully.
- Schema changes can be generated and applied.
- Database connection is not hardcoded.

***

### Issue 6 — Implement country and provider schema

**Labels:** `type:feature`, `area:data`, `priority:p0`

**Description**

Implement the initial data model for countries and investing providers.

**Tasks**

- [ ] Create `countries` table.
- [ ] Create `providers` table.
- [ ] Store regulatory notes, restrictions, fees, markets, asset types, and account requirements as structured JSONB.
- [ ] Add source URLs and `last_reviewed_at`.
- [ ] Add draft, published, and archived statuses.
- [ ] Add indexes for country availability and provider type.
- [ ] Create seed data for 3–5 countries and 10–20 providers.

**Acceptance criteria**

- A provider can be linked to multiple countries.
- Published providers can be filtered by country and product type.
- Every provider has at least one source and review date.

***

### Issue 7 — Implement source and review metadata

**Labels:** `type:feature`, `area:data`, `area:compliance`, `priority:p0`

**Description**

Ensure every material data claim is traceable to a source and review event.

**Tasks**

- [ ] Define a reusable source structure: label, URL, source type, retrieved date.
- [ ] Add reviewer and reviewed-at fields.
- [ ] Add confidence field: high, medium, low.
- [ ] Add stale-data detection based on a configurable review window.
- [ ] Add audit logging for admin edits.

**Acceptance criteria**

- A provider cannot be published without a source and review date.
- Stale records display a “needs review” state in admin.
- Admin edits are recorded with actor, timestamp, and changed fields.

***

### Issue 8 — Seed initial provider research dataset

**Labels:** `type:chore`, `area:data`, `area:content`, `priority:p0`

**Description**

Research and enter the first provider dataset manually. Do not scrape or auto-generate provider data in v1.

**Tasks**

- [ ] Select 3–5 launch countries.
- [ ] Research 10–20 providers.
- [ ] Record availability, product coverage, fees, account requirements, and Shariah-screening information.
- [ ] Add primary source URLs and retrieved dates.
- [ ] Mark each provider as draft until reviewed.
- [ ] Review and publish only verified entries.

**Acceptance criteria**

- Every published provider has at least one primary source.
- No provider is published with unsupported claims.
- Seed data covers all launch countries.

***

## Epic 3: Halal options finder

### Issue 9 — Build options-finder landing page

**Labels:** `type:feature`, `area:web`, `area:growth`, `priority:p0`

**Description**

Create the landing page for the Global Halal Investing Options Finder.

**Tasks**

- [ ] Add headline: “Find halal-investing options available in your country.”
- [ ] Add supporting copy about comparing brokers, ETFs, and managed services.
- [ ] Add primary CTA: “Find my options.”
- [ ] Add brief explanation of what the tool does and does not do.
- [ ] Link to methodology and disclosures pages.
- [ ] Add SEO metadata and Open Graph tags.

**Acceptance criteria**

- Landing page communicates the tool’s purpose in under five seconds.
- CTA routes to `/find`.
- Mobile layout is usable.

***

### Issue 10 — Build guided intake form

**Labels:** `type:feature`, `area:web`, `priority:p0`

**Description**

Build the multi-step intake flow that collects the user’s country and preferences.

**Tasks**

- [ ] Create `/find` route.
- [ ] Add country selector.
- [ ] Add investor type selector.
- [ ] Add product-interest selector: stocks, ETFs, managed portfolio, unsure.
- [ ] Add optional starting amount and recurring contribution.
- [ ] Add optional preferences: Shariah methodology, Islamic account, local currency.
- [ ] Validate inputs using shared Zod schemas.
- [ ] Preserve form state during navigation.

**Acceptance criteria**

- User can complete the form in under two minutes.
- Invalid or missing required fields show clear errors.
- Form works on mobile and with keyboard navigation.

***

### Issue 11 — Implement deterministic matching engine

**Labels:** `type:feature`, `area:web`, `area:data`, `priority:p0`

**Description**

Build a transparent matching service that returns eligible provider options.

**Tasks**

- [ ] Create `matchProviders()` in a dedicated module.
- [ ] Exclude unavailable providers by country.
- [ ] Filter by selected product type.
- [ ] Apply optional preference filters.
- [ ] Score remaining providers using documented criteria.
- [ ] Return human-readable inclusion reasons.
- [ ] Add unit tests for eligibility, filtering, scoring, and edge cases.

**Acceptance criteria**

- Results are deterministic for identical inputs and data version.
- Every result explains why it appeared.
- No provider unavailable in the user’s country is returned.

***

### Issue 12 — Build results page

**Labels:** `type:feature`, `area:web`, `priority:p0`

**Description**

Create the results experience for the options finder.

**Tasks**

- [ ] Create `/results/[publicId]`.
- [ ] Show summary: number of options, country, and product interest.
- [ ] Show selected inputs and allow minor changes.
- [ ] Display provider cards with fees, coverage, account requirements, and screening information.
- [ ] Add mobile-friendly comparison table.
- [ ] Add “verify before opening an account” checklist.
- [ ] Show source links and last-reviewed dates.
- [ ] Add persistent disclaimer.

**Acceptance criteria**

- User can understand why each option was included.
- All financial values show units and currency.
- Every material claim links to a source.
- Page is responsive and accessible.

***

### Issue 13 — Add save, share, and email capture

**Labels:** `type:feature`, `area:web`, `priority:p1`

**Description**

Allow users to save and share results after receiving value.

**Tasks**

- [ ] Create result snapshot with public ID.
- [ ] Add save-by-email action after results are shown.
- [ ] Send transactional email with result link.
- [ ] Add copy-link and social-share actions.
- [ ] Add consent and unsubscribe handling.
- [ ] Rate-limit email submissions.

**Acceptance criteria**

- Email is requested only after results are generated.
- Shared links do not expose sensitive financial data.
- User can unsubscribe from future emails.

***

### Issue 14 — Add options-finder analytics

**Labels:** `type:chore`, `area:growth`, `priority:p1`

**Description**

Instrument the finder to measure demand, completion, and value delivery.

**Tasks**

- [ ] Add PostHog or Plausible.
- [ ] Track `finder_started`, `finder_country_selected`, and `finder_completed`.
- [ ] Track `result_viewed`, `result_saved`, `result_shared`, and `result_source_clicked`.
- [ ] Track `provider_outbound_clicked`.
- [ ] Create a dashboard or saved report for core funnel metrics.

**Acceptance criteria**

- Core events fire correctly in development.
- No personally identifiable financial data is sent to analytics.
- Team can see completion and save rates.

***

## Epic 4: Admin and trust layer

### Issue 15 — Build admin authentication and layout

**Labels:** `type:feature`, `area:web`, `priority:p0`

**Description**

Protect the admin area with authentication and role-based access.

**Tasks**

- [ ] Add authentication for admin users.
- [ ] Add role checks: admin, editor, viewer.
- [ ] Create admin layout and navigation.
- [ ] Protect all `/admin` routes.
- [ ] Add logout and session handling.
- [ ] Add audit logging for sensitive actions.

**Acceptance criteria**

- Unauthenticated users cannot access admin pages.
- Only authorized roles can publish or archive records.
- Admin actions are logged.

***

### Issue 16 — Build country and provider admin CRUD

**Labels:** `type:feature`, `area:web`, `area:data`, `priority:p0`

**Description**

Create internal tools to manage countries and providers.

**Tasks**

- [ ] Build country list, create, edit, and archive views.
- [ ] Build provider list, create, edit, and archive views.
- [ ] Add validation for required fields and source URLs.
- [ ] Add draft, published, and archived workflow.
- [ ] Add preview for how a provider appears in results.
- [ ] Add JSON/CSV export.

**Acceptance criteria**

- Admin can create and publish a provider with sources.
- Invalid records cannot be published.
- Admin can preview the public result presentation.

***

### Issue 17 — Create methodology page

**Labels:** `type:feature`, `area:content`, `area:compliance`, `priority:p0`

**Description**

Explain how Sahihfolio researches, sources, reviews, and presents information.

**Tasks**

- [ ] Explain the difference between screening information, editorial research, and religious rulings.
- [ ] Describe source, review, and update process.
- [ ] Explain how provider availability and fees are verified.
- [ ] Explain limitations of screening methodologies.
- [ ] Add last-updated date.
- [ ] Link from finder and screening-report pages.

**Acceptance criteria**

- A new user can understand Sahihfolio’s evidence standards.
- Page uses accurate, non-overclaiming language.
- Page is discoverable from product surfaces.

***

### Issue 18 — Create disclosures page

**Labels:** `type:feature`, `area:compliance`, `priority:p0`

**Description**

Create a clear disclosures page for affiliate relationships, editorial policy, and limitations.

**Tasks**

- [ ] Add affiliate disclosure policy.
- [ ] Add editorial independence statement.
- [ ] Add data-accuracy and update policy.
- [ ] Add “not financial, tax, legal, accounting, or Shariah advice” disclaimer.
- [ ] Add contact or correction-request path.
- [ ] Link disclosures from relevant result and report pages.

**Acceptance criteria**

- Any referral relationship is disclosed near the relevant result.
- Legal and religious-advice limitations are clearly stated.
- Page is linked in the site footer and product flows.

***

## Epic 5: Shariah Screening Report

### Issue 19 — Implement screening-report data model

**Labels:** `type:feature`, `area:data`, `priority:p1`

**Description**

Create the database model for securities, methodologies, and Shariah-screening reports.

**Tasks**

- [ ] Create `securities` table.
- [ ] Create `screening_methodologies` table.
- [ ] Create `screening_reports` table.
- [ ] Store business activity, ratios, sources, limitations, and review metadata.
- [ ] Add immutable report versioning.
- [ ] Add indexes for ticker, slug, security, methodology, and status.

**Acceptance criteria**

- A report belongs to one security and one methodology.
- Published reports are versioned rather than overwritten.
- A report cannot be published without reviewer and review date.

***

### Issue 20 — Build screening-ratio calculation module

**Labels:** `type:feature`, `area:data`, `priority:p1`

**Description**

Implement explicit, testable calculations for Shariah-screening ratios.

**Tasks**

- [ ] Add calculation module in `packages/shared` or a dedicated `packages/screening` package.
- [ ] Implement non-permissible-income ratio.
- [ ] Implement interest-bearing debt ratio.
- [ ] Implement interest-bearing securities ratio.
- [ ] Store formula, inputs, threshold, and result for each ratio.
- [ ] Handle missing, zero, or invalid inputs.
- [ ] Add unit tests for pass, fail, boundary, and insufficient-data cases.

**Acceptance criteria**

- Calculations are deterministic.
- Each displayed ratio includes its formula and inputs.
- Invalid input does not produce a misleading pass/fail result.

***

### Issue 21 — Build screening-report admin workflow

**Labels:** `type:feature`, `area:web`, `priority:p1`

**Description**

Create the internal workflow for creating, reviewing, and publishing screening reports.

**Tasks**

- [ ] Add security catalog CRUD.
- [ ] Add methodology library CRUD.
- [ ] Build report creation flow: security, methodology, data period, business activity, ratios, sources.
- [ ] Show calculated ratios before publishing.
- [ ] Require source URL, retrieved date, reviewer, and review date.
- [ ] Add preview mode.
- [ ] Add publish, archive, duplicate, and version actions.
- [ ] Add audit events.

**Acceptance criteria**

- Admin cannot publish an incomplete report.
- Publishing creates a new immutable version.
- Admin can preview the exact public report.

***

### Issue 22 — Build public screening-report search

**Labels:** `type:feature`, `area:web`, `priority:p1`

**Description**

Let users find a security and open its screening report.

**Tasks**

- [ ] Create `/screening-report`.
- [ ] Add search by ticker, company name, ETF name, or ISIN.
- [ ] Show security name, ticker, exchange, asset type, report status, methodology, and review date.
- [ ] Handle no-results and unavailable-report states.
- [ ] Add SEO metadata.
- [ ] Track search and selection events.

**Acceptance criteria**

- Draft reports are not publicly accessible.
- Search returns relevant securities quickly.
- User can distinguish published, under-review, and unavailable reports.

***

### Issue 23 — Build public screening-report page

**Labels:** `type:feature`, `area:web`, `priority:p1`

**Description**

Create the public, read-only Shariah Screening Report page.

**Tasks**

- [ ] Create `/screening-report/[publicId]`.
- [ ] Display security header, result badge, methodology, and data period.
- [ ] Display business-activity assessment.
- [ ] Display financial-ratio table with values, thresholds, formulas, and pass/fail state.
- [ ] Display source cards with URL, retrieved date, reviewer, and confidence.
- [ ] Display limitations and persistent disclaimer.
- [ ] Add save, copy-link, share, and update-request actions.
- [ ] Add stale-report warning after the review window.

**Acceptance criteria**

- Report clearly identifies methodology and data period.
- Every material claim has a visible source.
- Report does not use unsupported “halal” or “haram” claims.
- Page is mobile-friendly and accessible.

***

### Issue 24 — Add report save, share, and update requests

**Labels:** `type:feature`, `area:web`, `priority:p2`

**Description**

Allow users to save or share a report and request a data review.

**Tasks**

- [ ] Add save-by-email after report view.
- [ ] Add public report link and share summary.
- [ ] Add update-request form with optional user note.
- [ ] Rate-limit update requests.
- [ ] Surface update requests in admin.
- [ ] Track save, share, and update-request events.

**Acceptance criteria**

- User can save or share without creating an account.
- Update requests do not expose private user data.
- Admin can see which reports users request for review.

***

## Epic 6: Launch readiness

### Issue 25 — Add accessibility and mobile QA

**Labels:** `type:chore`, `area:web`, `priority:p0`

**Description**

Ensure the MVP meets Sahihfolio’s accessibility and mobile standards.

**Tasks**

- [ ] Test keyboard navigation across forms and admin.
- [ ] Verify visible focus states.
- [ ] Check color contrast for text, buttons, badges, and alerts.
- [ ] Test all core flows at 320px, 768px, and desktop widths.
- [ ] Add accessible form labels and error messaging.
- [ ] Run automated accessibility checks.

**Acceptance criteria**

- Core flows meet WCAG 2.2 AA.
- No critical mobile layout defects.
- Forms are usable without a mouse.

***

### Issue 26 — Write product documentation

**Labels:** `type:chore`, `area:product`, `priority:p1`

**Description**

Document how to develop, deploy, and maintain Sahihfolio.

**Tasks**

- [ ] Write repository README.
- [ ] Document local setup.
- [ ] Document environment variables.
- [ ] Document database migrations and seeding.
- [ ] Document deployment process.
- [ ] Document content-review workflow.
- [ ] Add architecture overview.

**Acceptance criteria**

- A new developer can run the project from the README.
- Deployment and content-review steps are reproducible.
- Documentation reflects the actual monorepo structure.

***

### Issue 27 — Prepare MVP launch checklist

**Labels:** `type:chore`, `area:product`, `area:compliance`, `priority:p0`

**Description**

Create and complete the launch readiness checklist.

**Tasks**

- [ ] Verify 3–5 countries have complete provider data.
- [ ] Verify 10–20 provider records are reviewed and published.
- [ ] Verify finder end-to-end flow.
- [ ] Verify email capture and transactional email.
- [ ] Verify analytics events.
- [ ] Verify methodology and disclosures pages.
- [ ] Run accessibility and mobile QA.
- [ ] Confirm no unsupported compliance claims are published.
- [ ] Add production monitoring and error tracking.

**Acceptance criteria**

- All P0 issues are closed.
- Core user flow works in production.
- Legal, editorial, and accessibility checks pass.

## Suggested milestone ordering

1. **Platform:** Issues 1–4.  
2. **Data foundation:** Issues 5–8.  
3. **Options finder:** Issues 9–14.  
4. **Admin and trust:** Issues 15–18.  
5. **Screening report:** Issues 19–24.  
6. **Launch:** Issues 25–27.

For the first release, prioritize issues 1–18 and 25–27. Treat the Shariah Screening Report epic as the first post-finder feature unless early user research shows report demand is stronger than options-finder demand.