ALTER TABLE "account"
ALTER COLUMN "user_id"
SET DATA TYPE uuid USING "user_id"::uuid;

ALTER TABLE "session"
ALTER COLUMN "user_id"
SET DATA TYPE uuid USING "user_id"::uuid;
