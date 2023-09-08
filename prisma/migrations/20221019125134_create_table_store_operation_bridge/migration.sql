/*
  Warnings:

  - You are about to drop the column `storeOperationsId` on the `Operations` table. All the data in the column will be lost.
  - You are about to drop the `StoreOperations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Operations" DROP CONSTRAINT "Operations_storeOperationsId_fkey";

-- DropForeignKey
ALTER TABLE "StoreOperations" DROP CONSTRAINT "StoreOperations_storesId_fkey";

-- AlterTable
ALTER TABLE "Operations" DROP COLUMN "storeOperationsId";

-- DropTable
DROP TABLE "StoreOperations";

-- CreateTable
CREATE TABLE "StoreOperationsBridge" (
    "id" SERIAL NOT NULL,
    "storesId" INTEGER,
    "operationId" INTEGER,

    CONSTRAINT "StoreOperationsBridge_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StoreOperationsBridge" ADD CONSTRAINT "StoreOperationsBridge_storesId_fkey" FOREIGN KEY ("storesId") REFERENCES "Stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreOperationsBridge" ADD CONSTRAINT "StoreOperationsBridge_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "Operations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
