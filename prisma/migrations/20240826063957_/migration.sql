/*
  Warnings:

  - You are about to drop the column `beratSampah` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "beratSampah",
ADD COLUMN     "besi" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "kaca" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "kertas" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "plastik" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "sterofoam" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalPoints" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalWeight" DOUBLE PRECISION NOT NULL DEFAULT 0;
