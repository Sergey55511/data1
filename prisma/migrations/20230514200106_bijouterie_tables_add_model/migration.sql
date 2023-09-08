-- AlterTable
ALTER TABLE "YarnsAssemble" ADD COLUMN     "width" INTEGER;

-- CreateTable
CREATE TABLE "BijouterieArticles" (
    "id" SERIAL NOT NULL,
    "article" TEXT NOT NULL,
    "resultsAssembleId" INTEGER,
    "variant" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "typeAssemble" TEXT NOT NULL,

    CONSTRAINT "BijouterieArticles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Locks" (
    "id" SERIAL NOT NULL,
    "material" TEXT NOT NULL,
    "size" DECIMAL(10,2) NOT NULL,
    "type" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Locks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BijouterieBridge" (
    "id" SERIAL NOT NULL,
    "bijouterieArticlesId" INTEGER NOT NULL,
    "workpieceTypeId" INTEGER NOT NULL,
    "sizeRangeId" INTEGER NOT NULL,
    "colorId" INTEGER NOT NULL,
    "locksId" INTEGER NOT NULL,
    "yarnsAssembleId" INTEGER NOT NULL,

    CONSTRAINT "BijouterieBridge_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BijouterieArticles" ADD CONSTRAINT "BijouterieArticles_resultsAssembleId_fkey" FOREIGN KEY ("resultsAssembleId") REFERENCES "ResultsAssemble"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BijouterieBridge" ADD CONSTRAINT "BijouterieBridge_bijouterieArticlesId_fkey" FOREIGN KEY ("bijouterieArticlesId") REFERENCES "BijouterieArticles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BijouterieBridge" ADD CONSTRAINT "BijouterieBridge_workpieceTypeId_fkey" FOREIGN KEY ("workpieceTypeId") REFERENCES "WorkpieceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BijouterieBridge" ADD CONSTRAINT "BijouterieBridge_sizeRangeId_fkey" FOREIGN KEY ("sizeRangeId") REFERENCES "SizeRange"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BijouterieBridge" ADD CONSTRAINT "BijouterieBridge_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BijouterieBridge" ADD CONSTRAINT "BijouterieBridge_locksId_fkey" FOREIGN KEY ("locksId") REFERENCES "Locks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BijouterieBridge" ADD CONSTRAINT "BijouterieBridge_yarnsAssembleId_fkey" FOREIGN KEY ("yarnsAssembleId") REFERENCES "YarnsAssemble"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
