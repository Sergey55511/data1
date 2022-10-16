-- AlterTable
ALTER TABLE "Recipients" ADD COLUMN     "storeId" INTEGER;

-- AddForeignKey
ALTER TABLE "Recipients" ADD CONSTRAINT "Recipients_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;
