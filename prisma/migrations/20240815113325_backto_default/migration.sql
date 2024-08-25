/*
  Warnings:

  - You are about to drop the column `sampahAnorganik` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sampahOrganik` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "sampahAnorganik",
DROP COLUMN "sampahOrganik";
