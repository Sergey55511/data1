/*
  Warnings:

  - You are about to drop the column `opereytionId` on the `StoreOperations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "StoreOperations" DROP CONSTRAINT "StoreOperations_opereytionId_fkey";

-- AlterTable
ALTER TABLE "Opereytion" ADD COLUMN     "storeOperationsId" INTEGER;

-- AlterTable
ALTER TABLE "StoreOperations" DROP COLUMN "opereytionId";

-- AddForeignKey
ALTER TABLE "Opereytion" ADD CONSTRAINT "Opereytion_storeOperationsId_fkey" FOREIGN KEY ("storeOperationsId") REFERENCES "StoreOperations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
