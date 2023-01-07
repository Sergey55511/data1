/*
  Warnings:

  - You are about to drop the column `defect` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `exercise` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `moneyDefect` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `numMoving` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `numProducts` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `shade` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `Data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Data" DROP COLUMN "defect",
DROP COLUMN "exercise",
DROP COLUMN "moneyDefect",
DROP COLUMN "numMoving",
DROP COLUMN "numProducts",
DROP COLUMN "shade",
DROP COLUMN "stock";
