-- Add role enum and role column for auth users.
DO $$
BEGIN
  CREATE TYPE "auth"."UserRole" AS ENUM ('admin', 'user');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE "auth"."User"
ADD COLUMN IF NOT EXISTS "role" "auth"."UserRole";

UPDATE "auth"."User"
SET "role" = 'user'
WHERE "role" IS NULL;

ALTER TABLE "auth"."User"
ALTER COLUMN "role" SET DEFAULT 'user',
ALTER COLUMN "role" SET NOT NULL;
