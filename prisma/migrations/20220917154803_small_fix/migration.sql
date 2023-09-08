/*
  Warnings:

  - You are about to drop the column `operationsId` on the `Data` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_operationsId_fkey";

-- AlterTable
ALTER TABLE "Data" DROP COLUMN "operationsId",
ADD COLUMN     "operationId" INTEGER;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "Operations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
