/*
  Warnings:

  - You are about to drop the column `recipient` on the `Data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Data" DROP COLUMN "recipient",
ADD COLUMN     "recipientId" INTEGER;

-- CreateTable
CREATE TABLE "Recipients" (
    "id" SERIAL NOT NULL,
    "recipient" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Recipients_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Recipients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
