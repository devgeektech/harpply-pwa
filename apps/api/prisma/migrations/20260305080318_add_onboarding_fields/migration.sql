-- CreateEnum
CREATE TYPE "auth"."Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- AlterTable
ALTER TABLE "auth"."User" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "churchAttendance" TEXT,
ADD COLUMN     "churchInvolvement" TEXT,
ADD COLUMN     "dietaryPreference" TEXT,
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "gender" "auth"."Gender",
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "lifestyleDrinking" BOOLEAN,
ADD COLUMN     "lifestylePartying" BOOLEAN,
ADD COLUMN     "lifestyleSmoking" BOOLEAN,
ADD COLUMN     "locationEnabled" BOOLEAN DEFAULT false,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role" TEXT,
ADD COLUMN     "yearsInFaith" INTEGER;
