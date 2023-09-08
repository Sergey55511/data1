-- CreateTable
CREATE TABLE "Bridge" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER,
    "operationId" INTEGER,
    "workpieceTypeId" INTEGER,

    CONSTRAINT "Bridge_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bridge" ADD CONSTRAINT "Bridge_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bridge" ADD CONSTRAINT "Bridge_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "Operations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bridge" ADD CONSTRAINT "Bridge_workpieceTypeId_fkey" FOREIGN KEY ("workpieceTypeId") REFERENCES "WorkpieceType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
