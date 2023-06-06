/*
  Warnings:

  - You are about to drop the column `BijouterieArticleId` on the `DataBijouterie` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "DataBijouterie" DROP CONSTRAINT "DataBijouterie_BijouterieArticleId_fkey";

-- AlterTable
ALTER TABLE "DataBijouterie" DROP COLUMN "BijouterieArticleId",
ADD COLUMN     "bijouterieArticleId" INTEGER;

-- AddForeignKey
ALTER TABLE "DataBijouterie" ADD CONSTRAINT "DataBijouterie_bijouterieArticleId_fkey" FOREIGN KEY ("bijouterieArticleId") REFERENCES "BijouterieArticles"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
