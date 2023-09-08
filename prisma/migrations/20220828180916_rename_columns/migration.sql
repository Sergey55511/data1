/*
  Warnings:

  - You are about to drop the column `AcceptedGr` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `AcceptedPieces` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `ColorCype` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `ConsumptionR` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `Executor` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `Exercise` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `IssuedGr` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `IssuedPieces` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `Length` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `Model` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `NumMoving` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `NumProduction` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `NumProducts` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `NumShipment` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `Operation` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `ParishR` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `Personnel` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `Provider` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `Recipient` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `SizeRange` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `State` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `TareWeightGr` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `TypeOfProcessing` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `WorkingHours` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `WorkpieceType` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `consignment` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `defectR` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `material_group` on the `Data` table. All the data in the column will be lost.
  - Added the required column `operation` to the `Data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workpieceType` to the `Data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Data" DROP COLUMN "AcceptedGr",
DROP COLUMN "AcceptedPieces",
DROP COLUMN "ColorCype",
DROP COLUMN "ConsumptionR",
DROP COLUMN "Executor",
DROP COLUMN "Exercise",
DROP COLUMN "IssuedGr",
DROP COLUMN "IssuedPieces",
DROP COLUMN "Length",
DROP COLUMN "Model",
DROP COLUMN "NumMoving",
DROP COLUMN "NumProduction",
DROP COLUMN "NumProducts",
DROP COLUMN "NumShipment",
DROP COLUMN "Operation",
DROP COLUMN "ParishR",
DROP COLUMN "Personnel",
DROP COLUMN "Provider",
DROP COLUMN "Recipient",
DROP COLUMN "SizeRange",
DROP COLUMN "State",
DROP COLUMN "TareWeightGr",
DROP COLUMN "TypeOfProcessing",
DROP COLUMN "WorkingHours",
DROP COLUMN "WorkpieceType",
DROP COLUMN "consignment",
DROP COLUMN "defectR",
DROP COLUMN "material_group",
ADD COLUMN     "TareWidth" DOUBLE PRECISION,
ADD COLUMN     "colorType" TEXT,
ADD COLUMN     "countItemsIn" INTEGER,
ADD COLUMN     "countItemsOut" INTEGER,
ADD COLUMN     "exercise" TEXT,
ADD COLUMN     "length" TEXT,
ADD COLUMN     "lot" TEXT,
ADD COLUMN     "manager" TEXT,
ADD COLUMN     "managerId" INTEGER,
ADD COLUMN     "materialGroup" TEXT,
ADD COLUMN     "model" TEXT,
ADD COLUMN     "moneyDefect" DECIMAL(65,30),
ADD COLUMN     "moneyIn" DECIMAL(65,30),
ADD COLUMN     "moneyOut" DECIMAL(65,30),
ADD COLUMN     "numMoving" INTEGER,
ADD COLUMN     "numProduction" TEXT,
ADD COLUMN     "numProducts" INTEGER,
ADD COLUMN     "numShipment" INTEGER,
ADD COLUMN     "operation" TEXT NOT NULL,
ADD COLUMN     "provider" TEXT,
ADD COLUMN     "recipient" TEXT,
ADD COLUMN     "sizeRange" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "typeOfProcessing" TEXT,
ADD COLUMN     "widthIn" DOUBLE PRECISION,
ADD COLUMN     "widthOut" DOUBLE PRECISION,
ADD COLUMN     "workingHours" INTEGER,
ADD COLUMN     "workpieceType" TEXT NOT NULL;
