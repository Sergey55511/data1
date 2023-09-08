/*
  Warnings:

  - You are about to drop the column `fraction` on the `Data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Data" DROP COLUMN "fraction",
ADD COLUMN     "fractionId" INTEGER;

-- CreateTable
CREATE TABLE "Fraction" (
    "id" SERIAL NOT NULL,
    "fraction" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Fraction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fraction_fraction_key" ON "Fraction"("fraction");

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_fractionId_fkey" FOREIGN KEY ("fractionId") REFERENCES "Fraction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
