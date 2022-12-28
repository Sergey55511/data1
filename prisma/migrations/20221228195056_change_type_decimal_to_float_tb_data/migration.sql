/*
  Warnings:

  - You are about to alter the column `moneyDefect` on the `Data` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `moneyIn` on the `Data` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `moneyOut` on the `Data` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `lot` on the `Data` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Data" ALTER COLUMN "moneyDefect" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "moneyIn" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "moneyOut" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "lot" SET DATA TYPE DOUBLE PRECISION;
