/*
  Warnings:

  - You are about to drop the column `Channel` on the `Channel` table. All the data in the column will be lost.
  - Added the required column `channel` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Channel" RENAME COLUMN "Channel" TO "channel";
