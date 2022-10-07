/*
  Warnings:

  - You are about to drop the column `grade` on the `Data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Data" DROP COLUMN "grade",
ADD COLUMN     "gradeId" INTEGER;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
