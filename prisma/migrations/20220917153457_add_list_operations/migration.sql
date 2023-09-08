/*
  Warnings:

  - You are about to drop the column `operation` on the `Data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Data" DROP COLUMN "operation",
ADD COLUMN     "operationsId" INTEGER;

-- CreateTable
CREATE TABLE "Operations" (
    "id" SERIAL NOT NULL,
    "operation" TEXT NOT NULL,
    "position" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Operations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_operationsId_fkey" FOREIGN KEY ("operationsId") REFERENCES "Operations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
