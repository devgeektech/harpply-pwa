-- AlterTable: add profile & photos module fields
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "profilePhoto" TEXT;
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "location" TEXT;
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "spiritualJourney" TEXT;
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "myFaithValues" JSONB;
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "partnerValues" JSONB;
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "smokingPreference" TEXT;
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "alcoholPreference" TEXT;
