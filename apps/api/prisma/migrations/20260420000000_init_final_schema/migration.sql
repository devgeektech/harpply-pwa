-- Final baseline migration for current schema state.
CREATE SCHEMA IF NOT EXISTS "auth";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enums
DO $$
BEGIN
  CREATE TYPE "auth"."UserRole" AS ENUM ('admin', 'user');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE TYPE "auth"."Gender" AS ENUM ('male', 'female', 'other');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Main user table
CREATE TABLE IF NOT EXISTS "auth"."User" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
  "email" TEXT NOT NULL,
  "password" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "googleId" TEXT,
  "role" "auth"."UserRole" NOT NULL DEFAULT 'user',

  "token" TEXT,
  "resetOtp" TEXT,
  "resetOtpExpires" TIMESTAMP(3),
  "resetToken" TEXT,
  "resetTokenExpires" TIMESTAMP(3),
  "emailVerified" BOOLEAN NOT NULL DEFAULT false,
  "emailVerificationToken" TEXT,

  "fullName" TEXT,
  "age" INTEGER,
  "gender" "auth"."Gender",
  "profilePhotos" JSONB,

  "latitude" DOUBLE PRECISION,
  "longitude" DOUBLE PRECISION,
  "location" TEXT,
  "locationEnabled" BOOLEAN DEFAULT false,

  "bio" TEXT,

  "denomination" TEXT,
  "churchInvolvement" TEXT,
  "yearsInFaith" INTEGER,
  "churchAttendance" TEXT,
  "myFaithValues" JSONB,
  "partnerValues" JSONB,
  "smokingPreference" TEXT,
  "alcoholPreference" TEXT,
  "dietaryPreference" TEXT,

  "relationshipHistory" JSONB,
  "haveChildren" JSONB,
  "wantChildren" JSONB,
  "openToPartnerWithChildren" JSONB,
  "freeTime" JSONB,
  "musicTaste" JSONB,
  "sportsPlayOrFollow" JSONB,
  "fitnessLifestyle" JSONB,
  "recharge" JSONB,
  "communicationStyle" JSONB,
  "favoriteFood" JSONB,
  "travelerType" JSONB,
  "travelStyle" JSONB,
  "perfectNightIn" JSONB,
  "showsOrMovies" JSONB,
  "dayToDay" JSONB,
  "biblicalPreferences" JSONB,

  "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,

  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "auth"."User"("email");
