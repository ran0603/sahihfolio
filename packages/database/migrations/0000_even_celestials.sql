CREATE TABLE "countries" (
	"code" varchar(2) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"currency" varchar(3) NOT NULL,
	"region" varchar(50) NOT NULL,
	"regulatory_notes" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"supported_providers" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"restrictions" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"source_urls" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"last_reviewed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "providers" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"name" varchar(150) NOT NULL,
	"slug" varchar(150) NOT NULL,
	"type" varchar(50) NOT NULL,
	"countries" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"markets" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"asset_types" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"halal_screening" jsonb NOT NULL,
	"fees" jsonb NOT NULL,
	"minimum_investment" varchar(100),
	"account_requirements" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"pros" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"cons" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"website_url" text NOT NULL,
	"disclosure_url" text NOT NULL,
	"affiliate_url" text,
	"status" varchar(20) DEFAULT 'published' NOT NULL,
	"last_reviewed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "providers_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "screening_reports" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"ticker" varchar(15) NOT NULL,
	"company_name" varchar(200) NOT NULL,
	"exchange" varchar(50) NOT NULL,
	"asset_type" varchar(20) DEFAULT 'stock' NOT NULL,
	"country" varchar(50) NOT NULL,
	"sector" varchar(100) NOT NULL,
	"screening_result" varchar(50) NOT NULL,
	"methodology" varchar(50) NOT NULL,
	"status" varchar(20) DEFAULT 'draft' NOT NULL,
	"summary_explanation" text NOT NULL,
	"business_activity" jsonb NOT NULL,
	"financial_ratios" jsonb NOT NULL,
	"sources" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"reviewed_by" varchar(100),
	"reviewed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"disclaimer" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(150),
	"role" varchar(50) DEFAULT 'admin' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
