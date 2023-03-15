/*
 Warnings:
 
 - You are about to drop the column `workingTimeFact` on the `Data` table. All the data in the column will be lost.
 
 */
-- AlterTable
ALTER TABLE
  "Data" RENAME COLUMN "workingTimeFact" TO "workingTimePlan";

ALTER TABLE
  "Data" RENAME COLUMN "workingHours" TO "workingTimeFact";