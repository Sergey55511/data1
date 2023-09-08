-- AlterTable
ALTER TABLE "DataProduct" ADD COLUMN     "fullModelId" INTEGER,
ADD COLUMN     "typeAssembleId" INTEGER;

-- AddForeignKey
ALTER TABLE "DataProduct" ADD CONSTRAINT "DataProduct_fullModelId_fkey" FOREIGN KEY ("fullModelId") REFERENCES "FullModels"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataProduct" ADD CONSTRAINT "DataProduct_typeAssembleId_fkey" FOREIGN KEY ("typeAssembleId") REFERENCES "typeAssemble"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
