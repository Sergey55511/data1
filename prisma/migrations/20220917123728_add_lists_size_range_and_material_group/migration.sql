/*
  Warnings:

  - You are about to drop the column `materialGroup` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `sizeRange` on the `Data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Data" DROP COLUMN "materialGroup",
DROP COLUMN "sizeRange",
ADD COLUMN     "materialGroupId" INTEGER,
ADD COLUMN     "sizeRangeId" INTEGER;

-- CreateTable
CREATE TABLE "SizeRange" (
    "id" SERIAL NOT NULL,
    "sizeRange" TEXT NOT NULL,

    CONSTRAINT "SizeRange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialGroup" (
    "id" SERIAL NOT NULL,
    "materialGroup" TEXT NOT NULL,

    CONSTRAINT "MaterialGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_sizeRangeId_fkey" FOREIGN KEY ("sizeRangeId") REFERENCES "SizeRange"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_materialGroupId_fkey" FOREIGN KEY ("materialGroupId") REFERENCES "MaterialGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
