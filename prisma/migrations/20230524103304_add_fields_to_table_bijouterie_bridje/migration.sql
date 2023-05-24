/*
  Warnings:

  - You are about to drop the `SizeRangeModel` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "BijouterieBridge" ADD COLUMN     "channelId" INTEGER,
ADD COLUMN     "fullModelsId" INTEGER,
ADD COLUMN     "gradeId" INTEGER,
ADD COLUMN     "stateId" INTEGER,
ADD COLUMN     "typesId" INTEGER;

-- DropTable
DROP TABLE "SizeRangeModel";

-- AddForeignKey
ALTER TABLE "BijouterieBridge" ADD CONSTRAINT "BijouterieBridge_fullModelsId_fkey" FOREIGN KEY ("fullModelsId") REFERENCES "FullModels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BijouterieBridge" ADD CONSTRAINT "BijouterieBridge_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BijouterieBridge" ADD CONSTRAINT "BijouterieBridge_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BijouterieBridge" ADD CONSTRAINT "BijouterieBridge_typesId_fkey" FOREIGN KEY ("typesId") REFERENCES "Types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BijouterieBridge" ADD CONSTRAINT "BijouterieBridge_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
