-- AlterTable
ALTER TABLE "Data" ADD COLUMN     "optimized" INTEGER;

-- CreateTable
CREATE TABLE "OptimizedData" (
    "id" SERIAL NOT NULL,
    "dateSystem" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lot" DOUBLE PRECISION,
    "numDocument" TEXT,
    "pp" INTEGER,
    "sizeRangeId" INTEGER,
    "widthInDocument" DOUBLE PRECISION,
    "widthIn" DOUBLE PRECISION,
    "widthOut" DOUBLE PRECISION,
    "tareWidth" DOUBLE PRECISION,
    "provider" TEXT,
    "countItemsIn" INTEGER,
    "countItemsOut" INTEGER,
    "workingTimeFact" INTEGER,
    "workingTimePlan" INTEGER,
    "moneyIn" DOUBLE PRECISION,
    "moneyOut" DOUBLE PRECISION,
    "typeOfProcessing" TEXT,
    "materialGroupId" INTEGER,
    "workpieceTypeId" INTEGER,
    "operationId" INTEGER,
    "userId" INTEGER,
    "managerId" INTEGER,
    "storeId" INTEGER,
    "gradeId" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "productionId" INTEGER,
    "articleId" INTEGER,
    "colorId" INTEGER,
    "lengthId" INTEGER,
    "stateId" INTEGER,
    "channelId" INTEGER,
    "fractionId" INTEGER,
    "typeId" INTEGER,
    "recipientId" INTEGER,
    "fullModelId" INTEGER,
    "model" TEXT,
    "task" INTEGER,
    "optimized" INTEGER,

    CONSTRAINT "OptimizedData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OptimizedData" ADD CONSTRAINT "OptimizedData_sizeRangeId_fkey" FOREIGN KEY ("sizeRangeId") REFERENCES "SizeRange"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptimizedData" ADD CONSTRAINT "OptimizedData_materialGroupId_fkey" FOREIGN KEY ("materialGroupId") REFERENCES "MaterialGroup"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptimizedData" ADD CONSTRAINT "OptimizedData_workpieceTypeId_fkey" FOREIGN KEY ("workpieceTypeId") REFERENCES "WorkpieceType"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptimizedData" ADD CONSTRAINT "OptimizedData_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "Operations"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptimizedData" ADD CONSTRAINT "OptimizedData_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Stores"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptimizedData" ADD CONSTRAINT "OptimizedData_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptimizedData" ADD CONSTRAINT "OptimizedData_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptimizedData" ADD CONSTRAINT "OptimizedData_lengthId_fkey" FOREIGN KEY ("lengthId") REFERENCES "Length"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptimizedData" ADD CONSTRAINT "OptimizedData_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptimizedData" ADD CONSTRAINT "OptimizedData_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptimizedData" ADD CONSTRAINT "OptimizedData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptimizedData" ADD CONSTRAINT "OptimizedData_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Managers"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptimizedData" ADD CONSTRAINT "OptimizedData_fractionId_fkey" FOREIGN KEY ("fractionId") REFERENCES "Fraction"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptimizedData" ADD CONSTRAINT "OptimizedData_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Types"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptimizedData" ADD CONSTRAINT "OptimizedData_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Recipients"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptimizedData" ADD CONSTRAINT "OptimizedData_fullModelId_fkey" FOREIGN KEY ("fullModelId") REFERENCES "FullModels"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
