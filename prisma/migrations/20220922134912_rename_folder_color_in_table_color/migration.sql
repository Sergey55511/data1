/*
  Warnings:

  - You are about to drop the column `collor` on the `Color` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[color]` on the table `Color` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `color` to the `Color` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Collor_collor_key";

-- DropIndex
DROP INDEX "Color_collor_key";

-- AlterTable
ALTER TABLE "Color" RENAME COLUMN "collor" TO "color";

-- CreateIndex
CREATE UNIQUE INDEX "Color_color_key" ON "Color"("color");
