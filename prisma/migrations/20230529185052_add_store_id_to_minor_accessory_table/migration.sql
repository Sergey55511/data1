-- AlterTable
ALTER TABLE "MinorAccessoryData" ADD COLUMN     "storeId" INTEGER;

-- AddForeignKey
ALTER TABLE "MinorAccessoryData" ADD CONSTRAINT "MinorAccessoryData_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;
