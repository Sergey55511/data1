-- CreateTable
CREATE TABLE "Billets" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "modelsId" INTEGER,

    CONSTRAINT "Billets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BilletStore" (
    "id" SERIAL NOT NULL,
    "billetId" INTEGER,
    "storesId" INTEGER,

    CONSTRAINT "BilletStore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Models" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "size" TEXT,
    "length" TEXT,

    CONSTRAINT "Models_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Billets_name_key" ON "Billets"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Models_name_key" ON "Models"("name");

-- AddForeignKey
ALTER TABLE "Billets" ADD CONSTRAINT "Billets_modelsId_fkey" FOREIGN KEY ("modelsId") REFERENCES "Models"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BilletStore" ADD CONSTRAINT "BilletStore_billetId_fkey" FOREIGN KEY ("billetId") REFERENCES "Billets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BilletStore" ADD CONSTRAINT "BilletStore_storesId_fkey" FOREIGN KEY ("storesId") REFERENCES "Stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;
