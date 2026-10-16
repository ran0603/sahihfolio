# Shariah Screening Report — Development Plan

This plan adds a **Shariah Screening Report** to Sahihfolio as a focused, evidence-led research feature. It should not claim to issue a fatwa or personalized Shariah advice; it should explain **what a screening methodology checks, what data supports the result, when it was reviewed, and what the user should verify**.

It builds directly on the existing Sahihfolio stack: Next.js App Router, TypeScript, Tailwind, PostgreSQL, Drizzle/Prisma, protected admin routes, and a source-and-review workflow.

## Product definition

### Objective

Let a user generate a clear report for one security:

> “What does the available Shariah-screening information say about this stock or ETF, according to which methodology, based on which data, and what should I verify?”

### Core output

Each report should include:

- Security identity: name, ticker, exchange, asset type, country, sector.
- Screening result: compliant, non-compliant, under review, insufficient data, or methodology-dependent.
- Methodology used: AAOIFI-aligned, MSCI, S&P, Dow Jones, provider-specific, or other.
- Business-activity assessment.
- Financial-ratio assessment.
- Data sources and reporting period.
- Review date and reviewer.
- Plain-language explanation.
- Clear limitations and disclaimer.

### Positioning rule

Use **“Shariah-screening information”**, not “halal verdict,” unless the result comes from an explicitly cited provider or scholarly body. This matches Sahihfolio’s brand rule to separate research from religious rulings.

## Scope

### In scope for v1

- Search for a stock or ETF by ticker or name.
- Generate a report for one security.
- Support one primary methodology at launch, preferably AAOIFI-aligned.
- Store raw screening inputs, calculated ratios, result, sources, and review metadata.
- Display a shareable, read-only report page.
- Allow admin creation, review, publication, and archival of reports.
- Flag reports as stale after a configurable period.
- Track report views, source clicks, saves, and shares.

### Out of scope for v1

- Automated bulk screening of every listed security.
- Real-time intraday compliance changes.
- Personalized Shariah rulings.
- Purification calculation.
- Zakat calculation.
- Portfolio-level screening.
- Automated ingestion from paid data vendors.
- User accounts and saved portfolios.

These are sensible later extensions; the existing MVP explicitly defers stock-by-stock screening, purification, and automated ingestion.

## User flow

### 1. Search

User visits `/screening-report`.

They search by:

- Ticker, for example `AAPL`.
- Company name.
- ETF name or ISIN, if available.

The search should return only securities with a published, draft-previewable, or explicitly unavailable report state.

### 2. Select security

The user selects a result:

```text
Apple Inc. — AAPL — NASDAQ — United States
```

The UI should show:

- Security type.
- Exchange.
- Country.
- Current report status.
- Last reviewed date.
- Methodology badge.

### 3. View report

The report page shows the assessment in a calm, structured layout:

1. Summary.
2. Methodology.
3. Business activity.
4. Financial ratios.
5. Evidence and sources.
6. Limitations.
7. Save, share, and update-request actions.

### 4. Save or share

After viewing the report, the user can:

- Save the report by email.
- Copy a public report link.
- Share a non-sensitive summary.
- Request a review update.

Do not gate the report behind email capture. Show value first, then offer saving.

## Report content specification

### Report header

| Field          | Example              |
| -------------- | -------------------- |
| Security       | Apple Inc.           |
| Ticker         | AAPL                 |
| Exchange       | NASDAQ               |
| Asset type     | Common stock         |
| Country        | United States        |
| Report status  | Published            |
| Methodology    | AAOIFI-aligned       |
| Data period    | FY2025 annual report |
| Last reviewed  | 1 October 2026       |
| Report version | v3                   |

### Result states

Use only these states:

| State                    | Meaning                                                                       |
| ------------------------ | ----------------------------------------------------------------------------- |
| `screened_compliant`     | The selected methodology’s published criteria are met, based on reviewed data |
| `screened_non_compliant` | One or more criteria are not met, based on reviewed data                      |
| `methodology_dependent`  | Result differs by methodology                                                 |
| `insufficient_data`      | Required inputs are missing or unreliable                                     |
| `under_review`           | A new assessment is being prepared                                            |
| `archived`               | No longer maintained                                                          |

Avoid binary “halal / haram” labels in the UI.

### Business-activity section

Show:

- Primary business description.
- Revenue segments.
- Identified non-permissible activities, if any.
- Estimated non-permissible revenue percentage.
- Source and calculation basis.
- Editorial note, clearly separated from source data.

Example layout:

```text
Business activity
Primary business: Consumer electronics and digital services.

Non-permissible revenue exposure
Estimated: 1.8%
Basis: Company FY2025 segment disclosure.
Source: Annual report, page 42.
Reviewed: 1 October 2026.
```

### Financial-ratio section

For an AAOIFI-aligned report, display at minimum:

| Ratio                                                    | Input | Threshold | Result |
| -------------------------------------------------------- | ----- | --------: | ------ |
| Non-permissible income                                   | 1.8%  |      ≤ 5% | Pass   |
| Interest-bearing debt / market cap or total assets       | 12.4% |     ≤ 30% | Pass   |
| Interest-bearing securities / market cap or total assets | 3.1%  |     ≤ 30% | Pass   |

The exact denominator must be explicit. Different methodologies use different denominators and treatments, so the report must show the formula, not only the final percentage.

### Evidence section

Each material claim needs:

- Source name.
- Source URL.
- Source type: annual report, provider methodology, exchange filing, scholarly body, news release.
- Retrieved date.
- Reviewed date.
- Reviewer.
- Confidence: high, medium, low.

Example:

```text
Source: Apple FY2025 Form 10-K
URL: https://example.com/filing
Retrieved: 12 September 2026
Reviewed by: Razan
Confidence: High
```

### Limitations section

Always render a limitations block. Minimum content:

- Data is based on the stated reporting period.
- Screening methodologies differ.
- Corporate actions, acquisitions, and new disclosures can change results.
- A screening result is not a personal religious ruling.
- Users should verify the latest provider or scholarly guidance before acting.

## Data model

### Securities

```ts
type Security = {
  id: string;
  symbol: string;
  name: string;
  slug: string;
  assetType: "stock" | "etf" | "reit" | "sukuk";
  exchange: string;
  countryCode: string;
  sector?: string;
  industry?: string;
  isin?: string;
  status: "draft" | "published" | "archived";
};
```

### Screening methodologies

```ts
type ScreeningMethodology = {
  id: string;
  slug: string;
  name: string;
  description: string;
  businessActivityRules: string;
  financialRatioRules: string;
  sourceUrl: string;
  lastReviewedAt: Date;
  status: "draft" | "published" | "archived";
};
```

### Screening reports

```ts
type ScreeningReport = {
  id: string;
  securityId: string;
  methodologyId: string;
  publicId: string;
  version: number;

  result:
    | "screened_compliant"
    | "screened_non_compliant"
    | "methodology_dependent"
    | "insufficient_data"
    | "under_review"
    | "archived";

  dataPeriod: {
    label: string;
    startDate?: Date;
    endDate?: Date;
  };

  businessActivity: {
    summary: string;
    nonPermissibleActivities: string[];
    nonPermissibleRevenuePercent?: number;
    calculationBasis?: string;
    notes?: string;
  };

  financialRatios: {
    key: string;
    label: string;
    value?: number;
    threshold?: number;
    unit: "percent" | "ratio" | "currency";
    passes?: boolean;
    formula?: string;
    inputs?: Record<string, number | string>;
    notes?: string;
  }[];

  sources: {
    label: string;
    url: string;
    sourceType: string;
    retrievedAt: Date;
  }[];

  editorialNotes?: string;
  limitations: string[];
  reviewedBy: string;
  reviewedAt: Date;
  status: "draft" | "published" | "archived";
};
```

### Database tables

```sql
securities (
  id uuid primary key,
  symbol text not null,
  name text not null,
  slug text unique not null,
  asset_type text not null,
  exchange text not null,
  country_code text not null,
  sector text,
  industry text,
  isin text,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

screening_methodologies (
  id uuid primary key,
  slug text unique not null,
  name text not null,
  description text not null,
  business_activity_rules text not null,
  financial_ratio_rules text not null,
  source_url text not null,
  last_reviewed_at timestamptz not null,
  status text not null default 'draft'
);

screening_reports (
  id uuid primary key,
  security_id uuid not null references securities(id),
  methodology_id uuid not null references screening_methodologies(id),
  public_id text unique not null,
  version integer not null default 1,
  result text not null,
  data_period jsonb not null,
  business_activity jsonb not null,
  financial_ratios jsonb not null,
  sources jsonb not null,
  editorial_notes text,
  limitations jsonb not null,
  reviewed_by text not null,
  reviewed_at timestamptz not null,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

report_events (
  id uuid primary key,
  report_id uuid not null references screening_reports(id),
  event_type text not null,
  actor text,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);
```

### Versioning rule

Never overwrite a published report in place.

When an editor updates a published report:

1. Create a new report version.
2. Mark the prior version `superseded`.
3. Keep the same `publicId` pointing to the latest published version.
4. Preserve the old version for audit and comparison.

Add:

```sql
screening_report_versions (
  id uuid primary key,
  report_id uuid not null references screening_reports(id),
  version integer not null,
  snapshot jsonb not null,
  created_at timestamptz not null default now()
);
```

## API design

### Public endpoints

```http
GET /api/securities/search?q=aapl
```

Response:

```json
{
  "results": [
    {
      "id": "sec_123",
      "symbol": "AAPL",
      "name": "Apple Inc.",
      "exchange": "NASDAQ",
      "assetType": "stock",
      "reportStatus": "published",
      "methodology": "AAOIFI-aligned",
      "lastReviewedAt": "2026-10-01T00:00:00Z"
    }
  ]
}
```

```http
GET /api/screening-reports/[publicId]
```

Response:

```json
{
  "publicId": "aapl-aaoifi-2026-10",
  "security": {
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "exchange": "NASDAQ",
    "assetType": "stock"
  },
  "methodology": {
    "name": "AAOIFI-aligned",
    "sourceUrl": "https://example.com/methodology"
  },
  "result": "screened_compliant",
  "businessActivity": {
    "summary": "Consumer electronics and digital services.",
    "nonPermissibleRevenuePercent": 1.8
  },
  "financialRatios": [
    {
      "key": "non_permissible_income",
      "label": "Non-permissible income",
      "value": 1.8,
      "threshold": 5,
      "unit": "percent",
      "passes": true
    }
  ],
  "sources": [
    {
      "label": "FY2025 annual report",
      "url": "https://example.com/filing",
      "retrievedAt": "2026-09-12T00:00:00Z"
    }
  ],
  "reviewedAt": "2026-10-01T00:00:00Z",
  "disclaimer": "Informational Shariah-screening research. Not a religious ruling or personalized advice."
}
```

```http
POST /api/screening-reports/[publicId]/save
POST /api/screening-reports/[publicId]/update-request
```

### Admin endpoints

```http
GET    /admin/screening-reports
POST   /admin/screening-reports
GET    /admin/screening-reports/:id
PATCH  /admin/screening-reports/:id
POST   /admin/screening-reports/:id/publish
POST   /admin/screening-reports/:id/archive
POST   /admin/screening-reports/:id/duplicate
GET    /admin/securities
POST   /admin/securities
PATCH  /admin/securities/:id
GET    /admin/methodologies
PATCH  /admin/methodologies/:id
```

All admin routes require authentication, role-based authorization, and audit logging.

## Screening engine

### v1 approach

Do **not** build an autonomous screening engine that fetches filings and decides compliance by itself.

Instead, build a **structured assessment workflow**:

1. Admin selects a security and methodology.
2. Admin enters source-backed inputs.
3. System calculates ratios from those inputs.
4. System proposes a result based on explicit rules.
5. Admin reviews, edits the explanation, and publishes.

This keeps humans responsible for interpretation while automating calculation and presentation.

### Calculation module

```ts
// src/lib/screening/calculate.ts
export type RatioInput = {
  nonPermissibleRevenue: number;
  totalRevenue: number;
  interestBearingDebt: number;
  interestBearingSecurities: number;
  denominator: number;
};

export type RatioResult = {
  key: string;
  value: number;
  threshold: number;
  passes: boolean;
};
```

Rules should be methodology-specific and testable:

```ts
export function calculateAaoifiAlignedRatios(input: RatioInput): RatioResult[];
```

### Validation rules

Reject or flag a report if:

- Total revenue is zero or negative.
- A ratio input is missing without an explicit `insufficient_data` reason.
- Non-permissible revenue exceeds total revenue.
- A source URL is missing.
- A source has no retrieved date.
- A published report has no reviewer or review date.
- A ratio passes or fails without a recorded threshold.

## UI specification

### Routes

| Route                           | Purpose                             |
| ------------------------------- | ----------------------------------- |
| `/screening-report`             | Search and explanation landing page |
| `/screening-report/[publicId]`  | Public report                       |
| `/admin/securities`             | Security catalog                    |
| `/admin/methodologies`          | Methodology library                 |
| `/admin/screening-reports`      | Report workflow                     |
| `/admin/screening-reports/new`  | Create report                       |
| `/admin/screening-reports/[id]` | Edit and preview report             |

### Public report layout

1. **Header**  
   Security name, ticker, exchange, asset type, result badge, methodology, review date.

2. **Summary**  
   Two or three sentences explaining the result in plain language.

3. **Result card**  
   Clear result state, methodology, data period, and confidence.

4. **Business activity**  
   Business summary, non-permissible exposure, source, and notes.

5. **Financial ratios**  
   Table showing value, threshold, pass/fail, formula, and inputs.

6. **Evidence**  
   Source cards with URL, retrieved date, reviewer, and confidence.

7. **Limitations**  
   Fixed and report-specific limitations.

8. **Actions**  
   Save report, copy link, request update.

9. **Disclaimer**  
   Persistent, visible, and non-intrusive.

### Result badge styling

| State                    | Color              | Label                             |
| ------------------------ | ------------------ | --------------------------------- |
| `screened_compliant`     | Moss / Sahih Green | “Meets selected criteria”         |
| `screened_non_compliant` | Amber              | “Does not meet selected criteria” |
| `methodology_dependent`  | Sand               | “Varies by methodology”           |
| `insufficient_data`      | Slate              | “Insufficient verified data”      |
| `under_review`           | Mist               | “Under review”                    |
| `archived`               | Mist               | “Archived”                        |

Do not use red as the default non-compliant color. Reserve Clay for system errors, in line with the brand palette.

## Admin workflow

### Report creation steps

1. **Select security**
   - Search existing security or create a new one.
   - Require symbol, name, exchange, country, and asset type.

2. **Select methodology**
   - Choose one methodology for v1.
   - Display its rules and source.

3. **Enter data period**
   - Label, start date, end date, and source document.

4. **Enter business activity**
   - Summary.
   - Revenue segments.
   - Non-permissible activities.
   - Non-permissible revenue percentage.
   - Calculation basis.

5. **Enter financial inputs**
   - Revenue.
   - Non-permissible revenue.
   - Interest-bearing debt.
   - Interest-bearing securities.
   - Selected denominator.
   - Thresholds from methodology.

6. **Review calculated result**
   - System calculates ratios.
   - Admin confirms or overrides with a documented reason.
   - Admin writes the plain-language summary.

7. **Attach sources**
   - Minimum one source per material claim.
   - Source URL, type, and retrieved date required.

8. **Preview**
   - Render the exact public report.
   - Check mobile, accessibility, and source links.

9. **Publish**
   - Creates a new immutable version.
   - Records actor, timestamp, and diff.

### Staleness rule

Mark a report `needs_review` when:

```text
today - reviewedAt > staleAfterDays
```

Set `staleAfterDays` to 90 initially.

The public report should show:

> “This report was last reviewed on 1 October 2026. Screening inputs and methodologies can change.”

## Testing plan

### Unit tests

| Area              | Tests                                                   |
| ----------------- | ------------------------------------------------------- |
| Ratio calculation | Correct percentage, rounding, division-by-zero handling |
| Threshold rules   | Pass, fail, boundary values                             |
| Result derivation | Compliant, non-compliant, insufficient data             |
| Validation        | Missing source, missing reviewer, invalid dates         |
| Versioning        | New version creation and prior-version preservation     |
| Public report API | Published-only visibility and correct payload           |

### Integration tests

- Search finds only intended securities.
- Draft reports are not publicly accessible.
- Published report renders all required sections.
- Save endpoint records consent and report reference.
- Update-request endpoint rate-limits submissions.
- Admin publish creates an audit event and immutable version.

### Editorial QA checklist

Before publishing:

- [ ] Security identity is correct.
- [ ] Methodology is correctly identified.
- [ ] Data period is explicit.
- [ ] Every ratio has a formula and source.
- [ ] Every material claim has a source.
- [ ] Review date and reviewer are present.
- [ ] Plain-language summary matches the underlying data.
- [ ] Disclaimer is visible.
- [ ] No unsupported “halal” or “haram” claim appears.
- [ ] Report renders correctly on mobile.

## Analytics

Track:

| Event                        | Purpose                                 |
| ---------------------------- | --------------------------------------- |
| `screening_search_started`   | Measures demand                         |
| `screening_search_completed` | Measures search usability               |
| `security_selected`          | Identifies requested securities         |
| `report_viewed`              | Measures value delivery                 |
| `report_source_clicked`      | Measures trust and evidence engagement  |
| `report_saved`               | Measures capture intent                 |
| `report_shared`              | Measures organic distribution           |
| `report_update_requested`    | Identifies stale or high-demand reports |
| `admin_report_published`     | Measures content throughput             |
| `admin_report_reviewed`      | Measures review workflow usage          |

Primary early metric:

```text
report_saved / report_viewed
```

Secondary metrics:

- Search-to-report conversion.
- Source click rate.
- Update requests per published report.
- Percentage of reports older than 90 days.

## Delivery plan

### Week 1: Data foundation

- Create `securities`, `screening_methodologies`, and `screening_reports` schemas.
- Add migrations, indexes, and seed data.
- Build security search API.
- Implement source and review metadata structures.
- Write ratio-calculation utilities and unit tests.

### Week 2: Report workflow

- Build admin security catalog.
- Build methodology library.
- Build report creation form.
- Implement validation and calculated-ratio preview.
- Add draft, publish, archive, and versioning workflow.

### Week 3: Public report

- Build report search page.
- Build public report page.
- Add result badges, ratio table, evidence cards, and limitations.
- Add save, share, and update-request actions.
- Add disclaimers and SEO metadata.

### Week 4: Trust, polish, launch

- Add analytics events.
- Add staleness detection.
- Add admin audit log.
- Run accessibility and mobile QA.
- Seed 10–20 high-quality reports.
- Publish methodology and disclosures pages.
- Launch with a small set of well-researched securities rather than broad, shallow coverage.

## Definition of done

The feature is done when a user can:

1. Search for a supported stock or ETF.
2. Open a clear, sourced Shariah-screening report.
3. See the methodology, data period, business-activity assessment, and financial ratios.
4. Understand why the result was reached.
5. See every source and review date.
6. Save, share, or request an update.
7. Understand that the report is informational research, not a religious ruling or personalized advice.

The launch standard should be **depth over breadth**: 10–20 excellent, fully sourced reports are more valuable than thousands of thin, auto-generated pages. This also protects Sahihfolio’s core brand promise of clarity, evidence, and humility.
