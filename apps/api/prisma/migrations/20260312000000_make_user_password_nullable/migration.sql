-- AlterTable: allow NULL password for two-step signup (email first, then set password)
ALTER TABLE "auth"."User" ALTER COLUMN "password" DROP NOT NULL;
