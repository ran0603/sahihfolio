CREATE TYPE "public"."review_status" AS ENUM('draft', 'needs_review', 'reviewed');--> statement-breakpoint
CREATE TYPE "public"."confidence" AS ENUM('high', 'medium', 'low');--> statement-breakpoint
CREATE TYPE "public"."source_type" AS ENUM('official', 'regulator', 'provider_document', 'news', 'research', 'other');--> statement-breakpoint
CREATE TABLE "sources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"label" text NOT NULL,
	"url" text NOT NULL,
	"source_type" "source_type" DEFAULT 'official' NOT NULL,
	"retrieved_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor_id" uuid,
	"action" text NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" uuid NOT NULL,
	"changed_fields" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "provider_sources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider_id" uuid NOT NULL,
	"source_id" uuid NOT NULL,
	"field_path" text,
	"confidence" "confidence" DEFAULT 'medium' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "result_snapshots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"public_id" text NOT NULL,
	"input" jsonb NOT NULL,
	"output" jsonb NOT NULL,
	"data_version" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "result_snapshots_public_id_unique" UNIQUE("public_id")
);
--> statement-breakpoint
ALTER TABLE "providers" ALTER COLUMN "countries" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "providers" ALTER COLUMN "countries" SET DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "providers" ADD COLUMN "review_status" "review_status" DEFAULT 'draft' NOT NULL;--> statement-breakpoint
ALTER TABLE "providers" ADD COLUMN "reviewed_by" uuid;--> statement-breakpoint
ALTER TABLE "providers" ADD COLUMN "reviewed_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "providers" ADD COLUMN "review_window_days" integer DEFAULT 180 NOT NULL;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actor_id_users_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider_sources" ADD CONSTRAINT "provider_sources_provider_id_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider_sources" ADD CONSTRAINT "provider_sources_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "provider_sources_provider_idx" ON "provider_sources" USING btree ("provider_id");--> statement-breakpoint
CREATE INDEX "provider_sources_source_idx" ON "provider_sources" USING btree ("source_id");--> statement-breakpoint
ALTER TABLE "providers" ADD CONSTRAINT "providers_reviewed_by_users_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;