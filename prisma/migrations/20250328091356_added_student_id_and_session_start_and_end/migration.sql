/*
  Warnings:

  - Added the required column `endYear` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startYear` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentInt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `studentId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "endYear" INTEGER NOT NULL,
ADD COLUMN     "startYear" INTEGER NOT NULL,
ADD COLUMN     "studentInt" BIGINT NOT NULL,
ALTER COLUMN "studentId" SET NOT NULL,
ALTER COLUMN "studentType" DROP NOT NULL;
