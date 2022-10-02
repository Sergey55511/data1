-- DropForeignKey
ALTER TABLE "Data" DROP CONSTRAINT "Data_managerId_fkey";

-- AlterTable
ALTER TABLE "Operations" ADD COLUMN     "managerOperationsId" INTEGER;

-- CreateTable
CREATE TABLE "Managers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "storesId" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Managers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManagerOperations" (
    "id" SERIAL NOT NULL,
    "managerId" INTEGER,

    CONSTRAINT "ManagerOperations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Managers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Managers" ADD CONSTRAINT "Managers_storesId_fkey" FOREIGN KEY ("storesId") REFERENCES "Stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManagerOperations" ADD CONSTRAINT "ManagerOperations_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Managers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operations" ADD CONSTRAINT "Operations_managerOperationsId_fkey" FOREIGN KEY ("managerOperationsId") REFERENCES "ManagerOperations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
