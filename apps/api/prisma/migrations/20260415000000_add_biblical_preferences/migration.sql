-- Add biblicalPreferences field to User table
-- This adds the missing field for biblical preference questions (JSONB map: question id -> selected option)

-- AlterTable
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "biblicalPreferences" JSONB;

