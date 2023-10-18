-- DropForeignKey
ALTER TABLE
    "Data" DROP CONSTRAINT "Data_productionId_fkey";

-- AddForeignKey
ALTER TABLE
    "Data"
ADD
    CONSTRAINT "Data_productionId_fkey" FOREIGN KEY ("productionId") REFERENCES "Productions"("id") ON DELETE NO ACTION ON UPDATE CASCADE;