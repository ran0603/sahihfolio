Below is a build-ready technical specification for **Sahihfolio’s first free tool**: a **Global Halal Investing Options Finder**. It is scoped as a small, useful comparison tool that leads naturally into a future paid product—rather than trying to become a full halal screener on day one.

## Product overview

### Objective

Help a user answer:

> “Given my country and preferences, what halal-investing routes are actually available to me, and what should I compare before choosing one?”

The tool returns a transparent, sourced shortlist of eligible options—such as international brokers, local platforms, ETFs, robo-advisors, or managed portfolios—without giving personalized financial or religious advice.

### Core positioning

| Dimension | Initial scope |
|---|---|
| Primary user | Muslim retail investor researching how to start globally |
| Primary geography | Start with 3–5 countries, then expand |
| Primary output | Personalized, sourced comparison of available routes |
| Primary monetization path | Email capture, referral disclosures, and later a paid research/portfolio workflow |
| Explicit non-goal | Automated “this is halal for you” rulings or individualized investment advice |

This is intentionally narrower than competing with established screeners such as Zoya or Musaffa, which already provide stock/ETF screening, methodologies, alerts, and purification data. [zoya](https://zoya.finance/)

## User flow

### 1. Landing page

The landing page should immediately state the job:

- “Find halal-investing options available in your country.”
- “Compare brokers, ETFs, and managed services before you commit.”
- “See what to check: access, fees, markets, screening methodology, and disclosures.”

Primary CTA: **Find my options**.

### 2. Guided intake

A short multi-step form, ideally 4–6 questions:

| Question | Input type | Purpose |
|---|---|---|
| Country of residence | Select | Determines regulatory and provider eligibility |
| Investor type | Beginner / self-directed / long-term saver | Adjusts explanation depth |
| Product interest | Stocks / ETFs / managed portfolio / unsure | Controls result categories |
| Starting amount | Optional range | Enables relevant fee comparison |
| Recurring contribution | Optional range | Enables cost comparison |
| Preferences | Optional: Shariah methodology, Islamic account, local-currency support | Filters and ranks results |

Do not require an email before showing the first useful result.

### 3. Results page

The result should show:

- A short eligibility summary.
- 3–6 relevant options, grouped by route.
- For each option: availability, product coverage, fees, account requirements, Shariah-screening information, and source links.
- A “what to verify before opening an account” checklist.
- A clear disclaimer that results are informational, not investment or Shariah advice.
- A save/share/export action after the user has received value.

## Functional requirements

### FR-1: Country-based eligibility

The system must map a user’s country to:

- Available provider options.
- Regulatory notes.
- Supported currencies.
- Known restrictions or limitations.
- Last-reviewed date.

Initial data model:

```ts
type CountryProfile = {
  countryCode: string;
  name: string;
  currency: string;
  regulatoryNotes: string[];
  supportedProviders: string[];
  restrictions: string[];
  lastReviewedAt: Date;
  sourceUrls: string[];
};
```

### FR-2: Provider catalog

Each provider record must be independently reviewable and versioned.

```ts
type Provider = {
  id: string;
  name: string;
  type: "broker" | "robo_advisor" | "managed_portfolio" | "etf_provider";
  countries: string[];
  markets: string[];
  assetTypes: string[];
  halalScreening: {
    supported: boolean;
    methodology?: string;
    notes?: string;
    sourceUrl?: string;
  };
  fees: {
    trading?: string;
    management?: string;
    fx?: string;
    custody?: string;
    other?: string;
  };
  minimumInvestment?: string;
  accountRequirements: string[];
  pros: string[];
  cons: string[];
  disclosureUrl: string;
  lastReviewedAt: Date;
  status: "draft" | "published" | "archived";
};
```

### FR-3: Matching engine

The matching engine should be deterministic and explainable.

Rules:

1. Exclude providers unavailable in the user’s country.
2. Include only providers matching the selected product type.
3. Apply optional filters, such as Islamic account support or supported methodology.
4. Score remaining options using transparent criteria.
5. Return the reason each option appeared.

Example scoring factors:

| Factor | Weight |
|---|---|
| Country availability | Hard requirement |
| Product-type match | Hard requirement |
| Halal-screening support | High |
| Fee transparency | Medium |
| Market and ETF coverage | Medium |
| Local-currency support | Medium |
| Beginner suitability | Low to medium |

The UI should show **why** each result is included, for example:

> “Included because it supports Malaysia-based investors, offers ETF investing, and provides Shariah-screening information.”

### FR-4: Source and freshness tracking

Every material claim must have:

- Source URL.
- Retrieved or verified date.
- Reviewer or editor.
- Optional confidence level.

The results page must display a global “Data last reviewed” date and per-option source links.

### FR-5: Save and share result

After results are shown:

- Allow the user to save a result via email.
- Generate a shareable summary link.
- Do not expose sensitive financial details in the URL.
- Include a concise, non-sensitive summary suitable for social sharing.

Example share text:

> “I compared halal-investing options available in Malaysia using Sahihfolio’s free finder.”

### FR-6: Email capture

Email capture should occur after the result is generated, not before.

Capture:

- Email address.
- Country.
- Product interest.
- Consent status.
- Result snapshot ID.

Send a transactional email containing:

- The saved result link.
- A short “before you open an account” checklist.
- Clear unsubscribe link.

### FR-7: Admin review workflow

You need a lightweight internal admin interface to keep data trustworthy.

Minimum capabilities:

- Create and edit countries, providers, and source records.
- Mark a provider as draft, published, or archived.
- Record review date and reviewer.
- Flag stale records after a configurable period, such as 90 days.
- Preview how a provider appears for each supported country.
- Export data as JSON or CSV.

## Non-functional requirements

### NFR-1: Performance

- Initial page load: under 2 seconds on a typical mobile connection.
- Results generated synchronously where possible.
- No external API call should block the main result render.
- Static or cached content should be used for provider and country data.

### NFR-2: Accessibility

- Keyboard-navigable multi-step form.
- Visible labels and error messages.
- Color contrast compliant with WCAG 2.2 AA.
- Results readable without JavaScript where feasible.

### NFR-3: Security and privacy

- Do not collect passport, national ID, bank, or brokerage credentials.
- Store only the minimum data needed to save and improve results.
- Use HTTPS everywhere.
- Rate-limit form submissions and result-generation endpoints.
- Log admin edits with actor, timestamp, and changed fields.

### NFR-4: Maintainability

- Provider and country data must live in structured data files or database tables, not hardcoded UI logic.
- Every result must be reproducible from stored inputs and data version.
- Add automated tests for matching rules, country eligibility, and fee display.

## Recommended architecture

### Stack

Given your experience with Next.js, TypeScript, Tailwind, and backend systems:

| Layer | Recommendation |
|---|---|
| Frontend | Next.js App Router, TypeScript, Tailwind CSS |
| Forms | React Hook Form + Zod |
| Database | PostgreSQL |
| ORM | Prisma or Drizzle |
| Auth | None for anonymous users; email-based save links |
| Email | Resend or Postmark |
| Hosting | Vercel for app/UI; managed Postgres such as Neon or Supabase |
| Analytics | PostHog or Plausible |
| Admin | Protected `/admin` routes in the same Next.js app |

A monolith is correct here. Do not build microservices for the first version.

### Data storage

Start with PostgreSQL rather than a headless CMS.

Core tables:

```sql
countries (
  id uuid primary key,
  code text unique not null,
  name text not null,
  currency text not null,
  regulatory_notes jsonb not null default '[]',
  restrictions jsonb not null default '[]',
  last_reviewed_at timestamptz not null,
  source_urls jsonb not null default '[]',
  status text not null default 'draft'
);

providers (
  id uuid primary key,
  slug text unique not null,
  name text not null,
  type text not null,
  countries text[] not null,
  markets text[] not null,
  asset_types text[] not null,
  halal_screening jsonb not null,
  fees jsonb not null,
  minimum_investment text,
  account_requirements jsonb not null default '[]',
  pros jsonb not null default '[]',
  cons jsonb not null default '[]',
  disclosure_url text not null,
  last_reviewed_at timestamptz not null,
  status text not null default 'draft'
);

result_snapshots (
  id uuid primary key,
  public_id text unique not null,
  input jsonb not null,
  output jsonb not null,
  data_version text not null,
  created_at timestamptz not null default now()
);

email_captures (
  id uuid primary key,
  email text not null,
  result_snapshot_id uuid references result_snapshots(id),
  consent boolean not null,
  created_at timestamptz not null default now()
);
```

### Matching service

Keep matching logic separate from UI components:

```ts
// src/lib/matching.ts
export type MatchInput = {
  countryCode: string;
  productInterest: "stocks" | "etfs" | "managed" | "unsure";
  preferences: {
    halalScreeningRequired: boolean;
    localCurrencyPreferred: boolean;
    islamicAccountPreferred: boolean;
  };
};

export type MatchResult = {
  provider: Provider;
  score: number;
  reasons: string[];
  excludedReasons?: string[];
};
```

Rules should live in a single module and be covered by tests:

```ts
export function matchProviders(
  input: MatchInput,
  providers: Provider[],
  country: CountryProfile
): MatchResult[];
```

## API design

### Public endpoints

```http
POST /api/find-options
```

Request:

```json
{
  "countryCode": "MY",
  "productInterest": "etfs",
  "preferences": {
    "halalScreeningRequired": true,
    "localCurrencyPreferred": true,
    "islamicAccountPreferred": false
  }
}
```

Response:

```json
{
  "resultId": "abc123",
  "country": {
    "code": "MY",
    "name": "Malaysia",
    "currency": "MYR"
  },
  "matches": [
    {
      "providerId": "provider_1",
      "name": "Example Broker",
      "score": 82,
      "reasons": [
        "Available to Malaysia-based investors",
        "Supports ETF investing",
        "Provides Shariah-screening information"
      ],
      "fees": {
        "trading": "0.1%",
        "fx": "0.5%"
      },
      "sources": [
        "https://example.com/pricing"
      ],
      "lastReviewedAt": "2026-10-01T00:00:00Z"
    }
  ],
  "disclaimer": "Informational only. Not investment or Shariah advice."
}
```

```http
POST /api/save-result
```

```json
{
  "email": "user@example.com",
  "resultId": "abc123",
  "consent": true
}
```

### Admin endpoints

Protect all admin routes with authentication and role checks.

```http
GET    /admin/providers
POST   /admin/providers
PATCH  /admin/providers/:id
POST   /admin/providers/:id/publish
POST   /admin/providers/:id/archive
GET    /admin/countries
PATCH  /admin/countries/:id
GET    /admin/results/:id
```

## UI specification

### Pages

| Route | Purpose |
|---|---|
| `/` | Landing page and tool entry |
| `/find` | Guided intake flow |
| `/results/[publicId]` | Shareable saved result |
| `/methodology` | How Sahihfolio sources, reviews, and presents data |
| `/disclosures` | Affiliate, editorial, and legal disclosures |
| `/admin` | Internal content and review dashboard |

### Results-page layout

1. **Summary card**  
   “We found 4 options for ETF investing in Malaysia.”

2. **Filters and assumptions**  
   Show the user’s inputs and allow minor changes without restarting.

3. **Option cards**  
   Each card contains provider name, route type, fees, coverage, Shariah-screening notes, pros/cons, source links, and review date.

4. **Comparison table**  
   Mobile-friendly table comparing fees, markets, screening support, and minimum investment.

5. **Checklist**  
   “Before opening an account, verify: residency eligibility, account type, fees, tax reporting, withdrawal process, and current screening methodology.”

6. **Save result**  
   Email capture and shareable link.

7. **Disclaimer**  
   Clear statement that the tool is informational and does not provide personalized investment, tax, legal, or Shariah advice.

## Content and compliance requirements

### Editorial rules

- Every provider claim needs a source.
- Do not publish a provider without a review date.
- Separate factual data from editorial opinion.
- Use “provides Shariah-screening information” rather than “is halal” unless the provider explicitly makes that claim and you can cite it.
- Label affiliate relationships visibly.
- Maintain a changelog for material data updates.

### Legal copy

Include prominent wording such as:

> Sahihfolio provides general educational information about halal-investing options. It does not provide personalized investment, tax, legal, accounting, or Shariah advice. Availability, fees, and product details can change; verify directly with the provider before making a decision.

If you use referral links, disclose them near the relevant result and on a dedicated disclosures page.

## MVP scope

### Build in v1

- 3–5 countries, starting with markets you can research well.
- 10–20 provider records.
- Guided intake form.
- Deterministic matching engine.
- Results page with sources and review dates.
- Email capture and saved-result link.
- Admin CRUD for providers and countries.
- Basic analytics events.
- Methodology and disclosures pages.

### Defer to v2

- User accounts.
- Portfolio tracking.
- Stock-by-stock screening.
- Purification calculators.
- Automated data ingestion.
- MCP server.
- Affiliate dashboard.
- Programmatic country/provider pages.
- Paid research reports.

## Analytics events

Track these events from day one:

| Event | Purpose |
|---|---|
| `finder_started` | Measures interest |
| `finder_country_selected` | Reveals demand by geography |
| `finder_completed` | Measures completion rate |
| `result_viewed` | Confirms value delivery |
| `result_source_clicked` | Shows which evidence users trust |
| `result_saved` | Measures capture intent |
| `email_captured` | Measures lead conversion |
| `result_shared` | Measures organic distribution |
| `provider_outbound_clicked` | Measures referral or commercial intent |

The most important early metric is not traffic. It is:

```text
result_saved / finder_completed
```

If people complete the tool but do not save, share, or click through, the output is not valuable enough.

## Delivery plan

### Week 1: Data and rules

- Define initial country list.
- Research and document 10–20 providers.
- Build database schema and seed data.
- Implement matching engine and unit tests.

### Week 2: Product

- Build intake form.
- Build results page.
- Add source links, review dates, and disclaimers.
- Implement email capture and saved-result links.

### Week 3: Trust and launch

- Build admin review interface.
- Add analytics.
- Write methodology and disclosures pages.
- Test with 10–20 target users.
- Publish 5–10 supporting answer pages connected to the tool.

## Definition of done

The MVP is done when a user in a supported country can:

1. Complete the finder in under two minutes.
2. Receive relevant, sourced options.
3. Understand why each option appeared.
4. See fees, coverage, screening information, and review dates.
5. Save or share the result.
6. Understand that the output is informational, not advice.

The first version should prove one thing: **people will use and save a transparent, country-specific halal-investing comparison.** If that happens, you can expand into portfolio tracking, saved watchlists, deeper research, or a paid subscription with evidence rather than assumptions.