-- AlterTable: add reset columns and remove role (schema no longer has role)
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "resetOtp" TEXT;
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "resetOtpExpires" TIMESTAMP(3);
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "resetToken" TEXT;
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "resetTokenExpires" TIMESTAMP(3);

-- Drop role column then enum (order matters)
ALTER TABLE "auth"."User" DROP COLUMN IF EXISTS "role";
DROP TYPE IF EXISTS "auth"."Role";
