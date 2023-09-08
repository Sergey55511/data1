/*
  Warnings:

  - You are about to drop the `Collor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_colorId_fkey";

-- RenameTable
ALTER TABLE "Collor" RENAME TO "Color";

-- CreateIndex
CREATE UNIQUE INDEX "Color_collor_key" ON "Color"("collor");

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE SET NULL ON UPDATE CASCADE;
