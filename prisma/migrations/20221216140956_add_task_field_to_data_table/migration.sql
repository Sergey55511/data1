/*
  Warnings:

  - You are about to drop the column `test` on the `Data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Data" DROP COLUMN "test",
ADD COLUMN     "task" INTEGER;
