-- AlterTable
ALTER TABLE "Bridge" ADD COLUMN     "typeId" INTEGER;

-- AddForeignKey
ALTER TABLE "Bridge" ADD CONSTRAINT "Bridge_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Types"("id") ON DELETE SET NULL ON UPDATE CASCADE;
