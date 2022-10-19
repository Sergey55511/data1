-- CreateTable
CREATE TABLE "StateOperationBridge" (
    "id" SERIAL NOT NULL,
    "stateId" INTEGER,
    "operationId" INTEGER,

    CONSTRAINT "StateOperationBridge_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StateOperationBridge" ADD CONSTRAINT "StateOperationBridge_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "Length"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StateOperationBridge" ADD CONSTRAINT "StateOperationBridge_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "Operations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
