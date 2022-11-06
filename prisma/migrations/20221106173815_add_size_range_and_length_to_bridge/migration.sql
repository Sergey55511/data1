-- AlterTable
ALTER TABLE "Bridge" ADD COLUMN     "lengthId" INTEGER,
ADD COLUMN     "sizeRangeId" INTEGER;

-- AddForeignKey
ALTER TABLE "Bridge" ADD CONSTRAINT "Bridge_sizeRangeId_fkey" FOREIGN KEY ("sizeRangeId") REFERENCES "SizeRange"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bridge" ADD CONSTRAINT "Bridge_lengthId_fkey" FOREIGN KEY ("lengthId") REFERENCES "Length"("id") ON DELETE SET NULL ON UPDATE CASCADE;
