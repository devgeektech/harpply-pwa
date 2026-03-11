-- AlterTable
ALTER TABLE "auth"."User" ADD COLUMN     "company" TEXT,
ADD COLUMN     "exercise" TEXT,
ADD COLUMN     "interests" JSONB,
ADD COLUMN     "jobTitle" TEXT,
ADD COLUMN     "school" TEXT;
