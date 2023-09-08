/*
  Warnings:

  - You are about to drop the column `Productions` on the `Productions` table. All the data in the column will be lost.
  - Added the required column `description` to the `Productions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Productions" DROP COLUMN "Productions",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "storeId" INTEGER;

-- AddForeignKey
ALTER TABLE "Productions" ADD CONSTRAINT "Productions_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;
