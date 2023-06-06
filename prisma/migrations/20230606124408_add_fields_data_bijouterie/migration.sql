/*
  Warnings:

  - Added the required column `storeId` to the `DataBijouterie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `DataBijouterie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DataBijouterie" ADD COLUMN     "storeId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "DataBijouterie" ADD CONSTRAINT "DataBijouterie_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Stores"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataBijouterie" ADD CONSTRAINT "DataBijouterie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
