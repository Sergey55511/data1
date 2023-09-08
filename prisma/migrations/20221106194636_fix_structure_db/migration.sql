/*
  Warnings:

  - You are about to drop the `SizeRangeLengthBridge` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SizeRangeLengthBridge" DROP CONSTRAINT "SizeRangeLengthBridge_lengthId_fkey";

-- DropForeignKey
ALTER TABLE "SizeRangeLengthBridge" DROP CONSTRAINT "SizeRangeLengthBridge_sizeRangeId_fkey";

-- DropTable
DROP TABLE "SizeRangeLengthBridge";
