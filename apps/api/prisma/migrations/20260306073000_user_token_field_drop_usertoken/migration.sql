-- AlterTable: add token to User
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "token" TEXT;

-- DropTable: remove UserToken table
DROP TABLE IF EXISTS "auth"."UserToken";
