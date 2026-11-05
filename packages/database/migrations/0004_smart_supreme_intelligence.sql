ALTER TABLE "email_captures" DROP CONSTRAINT "email_captures_result_snapshot_id_result_snapshots_id_fk";
--> statement-breakpoint
ALTER TABLE "email_captures" ALTER COLUMN "result_snapshot_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "email_captures" ADD CONSTRAINT "email_captures_result_snapshot_id_result_snapshots_public_id_fk" FOREIGN KEY ("result_snapshot_id") REFERENCES "public"."result_snapshots"("public_id") ON DELETE no action ON UPDATE no action;