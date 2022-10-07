/*
  Warnings:

  - You are about to drop the `Opereytion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_operationId_fkey";

-- DropForeignKey
ALTER TABLE "Opereytion" DROP CONSTRAINT "Opereytion_storeOperationsId_fkey";

-- Rename

ALTER TABLE "Opereytion" RENAME TO "Operations";

-- CreateIndex
CREATE UNIQUE INDEX "Operations_opereytion_key" ON "Operations"("opereytion");

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "Operations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operations" ADD CONSTRAINT "Operations_storeOperationsId_fkey" FOREIGN KEY ("storeOperationsId") REFERENCES "StoreOperations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
