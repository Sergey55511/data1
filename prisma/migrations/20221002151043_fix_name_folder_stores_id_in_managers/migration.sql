/*
  Warnings:

  - You are about to drop the column `storesId` on the `Managers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Managers" DROP CONSTRAINT "Managers_storesId_fkey";

-- AlterTable
ALTER TABLE "Managers" DROP COLUMN "storesId",
ADD COLUMN     "storeId" INTEGER;

-- AddForeignKey
ALTER TABLE "Managers" ADD CONSTRAINT "Managers_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;
