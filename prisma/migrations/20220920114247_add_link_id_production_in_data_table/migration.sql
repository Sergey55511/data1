/*
  Warnings:

  - You are about to drop the column `numProduction` on the `Data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Data" DROP COLUMN "numProduction",
ADD COLUMN     "productionsId" INTEGER;

-- CreateTable
CREATE TABLE "Productions" (
    "id" SERIAL NOT NULL,
    "Productions" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Productions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_productionsId_fkey" FOREIGN KEY ("productionsId") REFERENCES "Productions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
