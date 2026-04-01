-- Drop legacy single avatar column now that the app uses `profilePhotos` everywhere.
ALTER TABLE "auth"."User"
DROP COLUMN IF EXISTS "profilePhoto";

