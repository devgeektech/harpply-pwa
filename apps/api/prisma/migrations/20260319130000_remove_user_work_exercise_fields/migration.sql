-- Remove unused profile columns (not used in this project).
ALTER TABLE "auth"."User" DROP COLUMN IF EXISTS "jobTitle";
ALTER TABLE "auth"."User" DROP COLUMN IF EXISTS "company";
ALTER TABLE "auth"."User" DROP COLUMN IF EXISTS "school";
ALTER TABLE "auth"."User" DROP COLUMN IF EXISTS "exercise";
