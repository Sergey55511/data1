-- CreateTable
CREATE TABLE "DataBijouterie" (
    "id" SERIAL NOT NULL,
    "date" DATE DEFAULT CURRENT_TIMESTAMP,
    "BijouterieArticleId" INTEGER,
    "widthIn" DOUBLE PRECISION,
    "widthOut" DOUBLE PRECISION,
    "moneyIn" DOUBLE PRECISION,
    "moneyOut" DOUBLE PRECISION,
    "countItemsIn" INTEGER,
    "countItemsOut" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "DataBijouterie_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DataBijouterie" ADD CONSTRAINT "DataBijouterie_BijouterieArticleId_fkey" FOREIGN KEY ("BijouterieArticleId") REFERENCES "BijouterieArticles"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
