-- Remove unused columns; smoking/alcohol use string preferences only.
ALTER TABLE "auth"."User" DROP COLUMN IF EXISTS "lifestyleSmoking";
ALTER TABLE "auth"."User" DROP COLUMN IF EXISTS "lifestyleDrinking";
ALTER TABLE "auth"."User" DROP COLUMN IF EXISTS "lifestylePartying";
