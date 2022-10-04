-- AlterTable
ALTER TABLE "Data" ADD COLUMN     "typeId" INTEGER;

-- CreateTable
CREATE TABLE "Types" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Types"("id") ON DELETE SET NULL ON UPDATE CASCADE;
