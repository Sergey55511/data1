/*
  Warnings:

  - You are about to drop the column `workpieceType` on the `Data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Data" DROP COLUMN "workpieceType",
ADD COLUMN     "workpieceTypeId" INTEGER;

-- CreateTable
CREATE TABLE "WorkpieceType" (
    "id" SERIAL NOT NULL,
    "workpieceType" TEXT NOT NULL,
    "position" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "WorkpieceType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_workpieceTypeId_fkey" FOREIGN KEY ("workpieceTypeId") REFERENCES "WorkpieceType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
