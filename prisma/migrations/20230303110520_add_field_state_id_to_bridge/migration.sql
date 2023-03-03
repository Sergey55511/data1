-- AlterTable
ALTER TABLE "Bridge" ADD COLUMN     "stateId" INTEGER;

-- AddForeignKey
ALTER TABLE "Bridge" ADD CONSTRAINT "Bridge_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
