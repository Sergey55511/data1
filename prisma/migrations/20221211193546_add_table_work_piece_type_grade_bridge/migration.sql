-- CreateTable
CREATE TABLE "WorkPieceTypeGradeBridge" (
    "id" SERIAL NOT NULL,
    "workpieceTypeId" INTEGER,
    "gradeId" INTEGER,

    CONSTRAINT "WorkPieceTypeGradeBridge_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkPieceTypeGradeBridge" ADD CONSTRAINT "WorkPieceTypeGradeBridge_workpieceTypeId_fkey" FOREIGN KEY ("workpieceTypeId") REFERENCES "WorkpieceType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkPieceTypeGradeBridge" ADD CONSTRAINT "WorkPieceTypeGradeBridge_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
