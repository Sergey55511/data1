/*
  Warnings:

  - The `optimized` column on the `Data` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Data" DROP COLUMN "optimized",
ADD COLUMN     "optimized" BOOLEAN NOT NULL DEFAULT false;
