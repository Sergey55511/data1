-- AlterTable
ALTER TABLE "Productions" ADD COLUMN     "fullModelId" INTEGER;

-- AddForeignKey
ALTER TABLE "Productions" ADD CONSTRAINT "Productions_fullModelId_fkey" FOREIGN KEY ("fullModelId") REFERENCES "FullModels"("id") ON DELETE SET NULL ON UPDATE CASCADE;
