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

-- CreateTable
CREATE TABLE "VariantsAssemble" (
    "id" SERIAL NOT NULL,
    "variantAssemble" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "VariantsAssemble_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "typeAssemble" (
    "id" SERIAL NOT NULL,
    "typeAssemble" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "typeAssemble_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColorsAssemble" (
    "id" SERIAL NOT NULL,
    "colorAssemble" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ColorsAssemble_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YarnsAssemble" (
    "id" SERIAL NOT NULL,
    "yarnAssemble" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "YarnsAssemble_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GradesAssemble" (
    "id" SERIAL NOT NULL,
    "gradeAssemble" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "GradesAssemble_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResultsAssemble" (
    "id" SERIAL NOT NULL,
    "resultAssemble" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ResultsAssemble_pkey" PRIMARY KEY ("id")
);
