/*
  Warnings:

  - You are about to drop the column `workingTimeFact` on the `Data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Data" DROP COLUMN "workingTimeFact",
ADD COLUMN     "workingHours" INTEGER;
