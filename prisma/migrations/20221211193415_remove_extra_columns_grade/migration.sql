/*
  Warnings:

  - You are about to drop the column `for` on the `Grade` table. All the data in the column will be lost.
  - You are about to drop the column `variant` on the `Grade` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Grade" DROP COLUMN "for",
DROP COLUMN "variant";
