/*
  Warnings:

  - You are about to drop the column `length` on the `Models` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Models` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Models" DROP COLUMN "length",
DROP COLUMN "size";

-- CreateTable
CREATE TABLE "ModelsSizes" (
    "id" SERIAL NOT NULL,
    "size" TEXT,
    "length" TEXT,
    "modelsId" INTEGER NOT NULL,

    CONSTRAINT "ModelsSizes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ModelsSizes" ADD CONSTRAINT "ModelsSizes_modelsId_fkey" FOREIGN KEY ("modelsId") REFERENCES "Models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
