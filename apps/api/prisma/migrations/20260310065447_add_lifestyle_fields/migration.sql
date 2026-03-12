/*
  Warnings:

  - You are about to drop the column `spiritualJourney` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "auth"."User" DROP COLUMN "spiritualJourney",
ADD COLUMN     "denomination" TEXT;
