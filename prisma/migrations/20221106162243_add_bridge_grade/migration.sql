-- AlterTable
ALTER TABLE "Bridge" ADD COLUMN     "gradeId" INTEGER;

-- AddForeignKey
ALTER TABLE "Bridge" ADD CONSTRAINT "Bridge_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
