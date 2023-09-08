/*
  Warnings:

  - You are about to drop the `Operations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_operationId_fkey";

-- DropTable
DROP TABLE "Operations";

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "Opereytion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
