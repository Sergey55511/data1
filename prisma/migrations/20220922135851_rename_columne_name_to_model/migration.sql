/*
  Warnings:

  - You are about to drop the column `name` on the `Models` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[model]` on the table `Models` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `model` to the `Models` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Models_name_key";

-- AlterTable
ALTER TABLE "Models" RENAME COLUMN "name" TO "model";

-- CreateIndex
CREATE UNIQUE INDEX "Models_model_key" ON "Models"("model");
