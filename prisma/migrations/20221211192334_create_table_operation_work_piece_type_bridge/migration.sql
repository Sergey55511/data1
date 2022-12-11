-- CreateTable
CREATE TABLE "OperationWorkPieceTypeBridge" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "workpieceTypeId" INTEGER,
    "operationsId" INTEGER,

    CONSTRAINT "OperationWorkPieceTypeBridge_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OperationWorkPieceTypeBridge" ADD CONSTRAINT "OperationWorkPieceTypeBridge_workpieceTypeId_fkey" FOREIGN KEY ("workpieceTypeId") REFERENCES "WorkpieceType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationWorkPieceTypeBridge" ADD CONSTRAINT "OperationWorkPieceTypeBridge_operationsId_fkey" FOREIGN KEY ("operationsId") REFERENCES "Operations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
