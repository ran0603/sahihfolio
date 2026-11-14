ALTER TABLE "sources" ALTER COLUMN "source_type" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "sources" ALTER COLUMN "source_type" SET DEFAULT 'official'::text;--> statement-breakpoint
DROP TYPE "public"."source_type";--> statement-breakpoint
CREATE TYPE "public"."source_type" AS ENUM('other', 'regulator', 'provider', 'news', 'research', 'official');--> statement-breakpoint
ALTER TABLE "sources" ALTER COLUMN "source_type" SET DEFAULT 'official'::"public"."source_type";--> statement-breakpoint
ALTER TABLE "sources" ALTER COLUMN "source_type" SET DATA TYPE "public"."source_type" USING "source_type"::"public"."source_type";--> statement-breakpoint
DROP INDEX "countries_code_idx";--> statement-breakpoint
ALTER TABLE "countries" ADD COLUMN "source_urls" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "countries_code_unique" ON "countries" USING btree ("code");--> statement-breakpoint
CREATE INDEX "countries_status_idx" ON "countries" USING btree ("status");--> statement-breakpoint
CREATE INDEX "countries_name_idx" ON "countries" USING btree ("name");