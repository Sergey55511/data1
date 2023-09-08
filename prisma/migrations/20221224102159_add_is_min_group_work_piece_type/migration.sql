/*
  Warnings:

  - You are about to drop the column `modelId` on the `Data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Data" DROP COLUMN "modelId";

-- AlterTable
ALTER TABLE "WorkpieceType" ADD COLUMN     "isMinaletGroup" BOOLEAN;
