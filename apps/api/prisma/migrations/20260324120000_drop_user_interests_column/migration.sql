-- Remove deprecated onboarding interests field from User.
ALTER TABLE "auth"."User"
DROP COLUMN IF EXISTS "interests";

