-- DropForeignKey
ALTER TABLE "FullModels" DROP CONSTRAINT "FullModels_sizeRangeModelId_fkey";

-- AddForeignKey
ALTER TABLE "FullModels" ADD CONSTRAINT "FullModels_sizeRangeModelId_fkey" FOREIGN KEY ("sizeRangeModelId") REFERENCES "SizeRange"("id") ON DELETE SET NULL ON UPDATE CASCADE;
