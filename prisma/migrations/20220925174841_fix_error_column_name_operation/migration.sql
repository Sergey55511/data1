/*
  Warnings:

  - You are about to drop the column `opereytion` on the `Operations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[operation]` on the table `Operations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `operation` to the `Operations` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Operations_opereytion_key";

-- DropIndex
DROP INDEX "Opereytion_opereytion_key";

-- AlterTable
ALTER TABLE "Operations" RENAME COLUMN "opereytion" TO "operation";

-- CreateIndex
CREATE UNIQUE INDEX "Operations_operation_key" ON "Operations"("operation");
