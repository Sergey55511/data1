-- CreateTable
CREATE TABLE "Collor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "collor" TEXT NOT NULL,
    "for" TEXT,
    "variant" INTEGER NOT NULL,
    "activ" BOOLEAN NOT NULL DEFAULT true
);

-- CreateIndex
CREATE UNIQUE INDEX "Collor_collor_key" ON "Collor"("collor");
