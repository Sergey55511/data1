/*
  Warnings:

  - You are about to drop the column `productionsId` on the `Data` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_productionsId_fkey";

-- AlterTable
ALTER TABLE "Data" DROP COLUMN "productionsId",
ADD COLUMN     "productionId" INTEGER;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_productionId_fkey" FOREIGN KEY ("productionId") REFERENCES "Productions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
