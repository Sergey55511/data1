-- CreateTable
CREATE TABLE "WorkPieceTypeTypeBridge" (
    "id" SERIAL NOT NULL,
    "workpieceTypeId" INTEGER,
    "typeId" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "WorkPieceTypeTypeBridge_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkPieceTypeTypeBridge" ADD CONSTRAINT "WorkPieceTypeTypeBridge_workpieceTypeId_fkey" FOREIGN KEY ("workpieceTypeId") REFERENCES "WorkpieceType"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkPieceTypeTypeBridge" ADD CONSTRAINT "WorkPieceTypeTypeBridge_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Types"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
