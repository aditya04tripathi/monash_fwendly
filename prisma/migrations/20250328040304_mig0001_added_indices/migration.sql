/*
  Warnings:

  - You are about to drop the column `faculty` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "faculty";

-- CreateIndex
CREATE INDEX "course_search_index" ON "Course"("code", "name");

-- CreateIndex
CREATE INDEX "event_search_index" ON "Event"("title", "location", "startTime", "endTime");

-- CreateIndex
CREATE INDEX "event_type_search_index" ON "EventType"("name");

-- CreateIndex
CREATE INDEX "free_slot_search_index" ON "FreeSlot"("code");

-- CreateIndex
CREATE INDEX "interest_search_index" ON "Interest"("name");

-- CreateIndex
CREATE INDEX "tag_search_index" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "unit_search_index" ON "Unit"("code", "name");

-- CreateIndex
CREATE INDEX "user_search_index" ON "User"("email", "name", "studentId");
