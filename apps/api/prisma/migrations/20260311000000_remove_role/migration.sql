-- Remove role column and auth.Role enum (no longer used)
ALTER TABLE "auth"."User" DROP COLUMN IF EXISTS "role";
DROP TYPE IF EXISTS "auth"."Role";
