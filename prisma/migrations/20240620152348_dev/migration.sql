/*
  Warnings:

  - Added the required column `forgotToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forgotTokenExpiry` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "forgotToken" TEXT NOT NULL,
ADD COLUMN     "forgotTokenExpiry" TIMESTAMP(3) NOT NULL;
