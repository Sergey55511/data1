-- CreateTable
CREATE TABLE "DataProduct" (
    "id" SERIAL NOT NULL,
    "dateSystem" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "storeId" INTEGER,
    "model" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "managerId" INTEGER,
    "workpieceTypeId" INTEGER NOT NULL,
    "colorId" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "gradeId" INTEGER NOT NULL,
    "stateId" INTEGER NOT NULL,
    "articleId" INTEGER NOT NULL,
    "recipientId" INTEGER,
    "operationId" INTEGER,
    "numDocument" TEXT,
    "widthIn" DOUBLE PRECISION,
    "widthOut" DOUBLE PRECISION,
    "moneyIn" DOUBLE PRECISION,
    "moneyOut" DOUBLE PRECISION,
    "countItemsIn" INTEGER,
    "countItemsOut" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "DataProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DataProduct" ADD CONSTRAINT "DataProduct_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataProduct" ADD CONSTRAINT "DataProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataProduct" ADD CONSTRAINT "DataProduct_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Managers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataProduct" ADD CONSTRAINT "DataProduct_workpieceTypeId_fkey" FOREIGN KEY ("workpieceTypeId") REFERENCES "ResultsAssemble"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataProduct" ADD CONSTRAINT "DataProduct_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "ColorsAssemble"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataProduct" ADD CONSTRAINT "DataProduct_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "GradesAssemble"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataProduct" ADD CONSTRAINT "DataProduct_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataProduct" ADD CONSTRAINT "DataProduct_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Recipients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataProduct" ADD CONSTRAINT "DataProduct_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "Operations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
