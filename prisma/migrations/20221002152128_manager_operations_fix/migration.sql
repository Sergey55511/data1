/*
  Warnings:

  - You are about to drop the column `managerOperationsId` on the `Operations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Operations" DROP CONSTRAINT "Operations_managerOperationsId_fkey";

-- AlterTable
ALTER TABLE "ManagerOperations" ADD COLUMN     "operationId" INTEGER;

-- AlterTable
ALTER TABLE "Operations" DROP COLUMN "managerOperationsId";

-- AddForeignKey
ALTER TABLE "ManagerOperations" ADD CONSTRAINT "ManagerOperations_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "Operations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
