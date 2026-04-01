-- AlterTable
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "relationshipHistory" JSONB;
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "haveChildren" JSONB;
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "wantChildren" JSONB;
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "openToPartnerWithChildren" JSONB;
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "freeTime" JSONB;
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "musicTaste" JSONB;
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "sportsPlayOrFollow" JSONB;
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "fitnessLifestyle" JSONB;
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "recharge" JSONB;
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "communicationStyle" JSONB;
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "favoriteFood" JSONB;
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "travelerType" JSONB;
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "travelStyle" JSONB;
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "perfectNightIn" JSONB;
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "showsOrMovies" JSONB;
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "dayToDay" JSONB;
