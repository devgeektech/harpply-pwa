-- Add profilePhotos JSON column for storing array of { key, url } from S3
ALTER TABLE "auth"."User" ADD COLUMN IF NOT EXISTS "profilePhotos" JSONB;
