/*
  Warnings:

  - You are about to drop the column `studentInt` on the `User` table. All the data in the column will be lost.
  - Changed the type of `studentId` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "studentInt",
DROP COLUMN "studentId",
ADD COLUMN     "studentId" BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_studentId_key" ON "User"("studentId");

-- CreateIndex
CREATE INDEX "user_search_index" ON "User"("email", "name", "studentId");
