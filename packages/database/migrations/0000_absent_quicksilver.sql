CREATE TABLE "countries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"currency" text NOT NULL,
	"regulatory_notes" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"restrictions" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"last_reviewed_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "countries_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "providers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"countries" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"markets" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"asset_types" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"fees" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"account_requirements" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"halal_screening" jsonb NOT NULL,
	"minimum_investment" text,
	"pros" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"cons" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"disclosure_url" text NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"last_reviewed_at" timestamp with time zone NOT NULL,
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
--> statement-breakpoint
CREATE INDEX "countries_code_idx" ON "countries" USING btree ("code");--> statement-breakpoint
CREATE INDEX "providers_countries_idx" ON "providers" USING btree ("countries");--> statement-breakpoint
CREATE INDEX "providers_type_idx" ON "providers" USING btree ("type");--> statement-breakpoint
CREATE INDEX "providers_status_idx" ON "providers" USING btree ("status");