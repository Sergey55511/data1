-- AlterTable
ALTER TABLE "Bridge" ADD COLUMN     "colorId" INTEGER;

-- AddForeignKey
ALTER TABLE "Bridge" ADD CONSTRAINT "Bridge_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE SET NULL ON UPDATE CASCADE;
