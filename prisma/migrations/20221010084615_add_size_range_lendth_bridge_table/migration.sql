-- CreateTable
CREATE TABLE "SizeRangeLengthBridge" (
    "id" SERIAL NOT NULL,
    "lengthId" INTEGER,
    "sizeRangeId" INTEGER,

    CONSTRAINT "SizeRangeLengthBridge_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SizeRangeLengthBridge" ADD CONSTRAINT "SizeRangeLengthBridge_lengthId_fkey" FOREIGN KEY ("lengthId") REFERENCES "Length"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SizeRangeLengthBridge" ADD CONSTRAINT "SizeRangeLengthBridge_sizeRangeId_fkey" FOREIGN KEY ("sizeRangeId") REFERENCES "SizeRange"("id") ON DELETE SET NULL ON UPDATE CASCADE;
