CREATE TYPE "public"."product_interest" AS ENUM('all', 'unsure', 'unset', 'stocks', 'etfs', 'sukuk', 'real_estate', 'gold', 'mutual_funds', 'crypto');--> statement-breakpoint
CREATE TYPE "public"."source" AS ENUM('finder', 'screening_report', 'footer', 'other');--> statement-breakpoint
CREATE TABLE "email_captures" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"result_snapshot_id" uuid,
	"country_code" text,
	"product_interest" "product_interest" DEFAULT 'unset' NOT NULL,
	"consent" boolean DEFAULT false NOT NULL,
	"source" "source" DEFAULT 'finder' NOT NULL,
	"unsubscribe_token" text NOT NULL,
	"unsubscribed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "email_captures_unsubscribe_token_unique" UNIQUE("unsubscribe_token")
);
--> statement-breakpoint
ALTER TABLE "email_captures" ADD CONSTRAINT "email_captures_result_snapshot_id_result_snapshots_id_fk" FOREIGN KEY ("result_snapshot_id") REFERENCES "public"."result_snapshots"("id") ON DELETE no action ON UPDATE no action;