 -- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateEnum
CREATE TYPE "auth"."Role" AS ENUM ('ADMIN', 'EMPLOYER', 'INDIVIDUAL');

-- CreateTable
CREATE TABLE "auth"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "auth"."Role" NOT NULL DEFAULT 'INDIVIDUAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "auth"."User"("email");
