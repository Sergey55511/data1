/*
  Warnings:

  - You are about to drop the column `billetsId` on the `Models` table. All the data in the column will be lost.
  - You are about to drop the `BilletStore` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Billets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ModelsSizes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `active` to the `Models` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BilletStore" DROP CONSTRAINT "BilletStore_billetId_fkey";

-- DropForeignKey
ALTER TABLE "BilletStore" DROP CONSTRAINT "BilletStore_storesId_fkey";

-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_modelId_fkey";

-- DropForeignKey
ALTER TABLE "Models" DROP CONSTRAINT "Models_billetsId_fkey";

-- DropForeignKey
ALTER TABLE "ModelsSizes" DROP CONSTRAINT "ModelsSizes_modelsId_fkey";

-- DropIndex
DROP INDEX "Models_model_key";

-- AlterTable
ALTER TABLE "Data" ADD COLUMN     "fullModelId" INTEGER;

-- AlterTable
ALTER TABLE "Models" DROP COLUMN "billetsId",
ADD COLUMN     "active" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "BilletStore";

-- DropTable
DROP TABLE "Billets";

-- DropTable
DROP TABLE "ModelsSizes";

-- CreateTable
CREATE TABLE "FullModels" (
    "id" SERIAL NOT NULL,
    "workpieceTypeId" INTEGER,
    "modelId" INTEGER,
    "profileId" INTEGER,
    "sizeRangeModelId" INTEGER,
    "lengthModelId" INTEGER,

    CONSTRAINT "FullModels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LengthModel" (
    "id" SERIAL NOT NULL,
    "length" DECIMAL(3,2) NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "LengthModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SizeRangeModel" (
    "id" SERIAL NOT NULL,
    "sizeRange" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "SizeRangeModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "profile" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_fullModelId_fkey" FOREIGN KEY ("fullModelId") REFERENCES "FullModels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FullModels" ADD CONSTRAINT "FullModels_workpieceTypeId_fkey" FOREIGN KEY ("workpieceTypeId") REFERENCES "WorkpieceType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FullModels" ADD CONSTRAINT "FullModels_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Models"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FullModels" ADD CONSTRAINT "FullModels_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FullModels" ADD CONSTRAINT "FullModels_sizeRangeModelId_fkey" FOREIGN KEY ("sizeRangeModelId") REFERENCES "SizeRangeModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FullModels" ADD CONSTRAINT "FullModels_lengthModelId_fkey" FOREIGN KEY ("lengthModelId") REFERENCES "LengthModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
