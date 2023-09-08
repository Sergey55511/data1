-- DropForeignKey
ALTER TABLE "StateOperationBridge" DROP CONSTRAINT "StateOperationBridge_stateId_fkey";

-- AddForeignKey
ALTER TABLE "StateOperationBridge" ADD CONSTRAINT "StateOperationBridge_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE SET NULL ON UPDATE CASCADE;
