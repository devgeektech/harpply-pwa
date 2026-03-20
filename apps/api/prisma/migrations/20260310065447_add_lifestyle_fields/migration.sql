-- AlterTable: add denomination (faith & lifestyle)
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "denomination" TEXT;
