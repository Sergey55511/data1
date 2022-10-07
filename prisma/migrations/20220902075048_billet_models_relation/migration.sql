-- DropForeignKey
ALTER TABLE "Billets" DROP CONSTRAINT "Billets_modelsId_fkey";

-- AlterTable
ALTER TABLE "Models" ADD COLUMN     "billetsId" INTEGER;

-- AddForeignKey
ALTER TABLE "Models" ADD CONSTRAINT "Models_billetsId_fkey" FOREIGN KEY ("billetsId") REFERENCES "Billets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
