/*
  Warnings:

  - You are about to drop the column `FullModel` on the `FullModels` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FullModels" DROP COLUMN "FullModel",
ADD COLUMN     "fullModel" TEXT;
