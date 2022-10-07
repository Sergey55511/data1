-- CreateTable
CREATE TABLE "StoreOperations" (
    "id" SERIAL NOT NULL,
    "storesId" INTEGER,
    "opereytionId" INTEGER NOT NULL,

    CONSTRAINT "StoreOperations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StoreOperations" ADD CONSTRAINT "StoreOperations_storesId_fkey" FOREIGN KEY ("storesId") REFERENCES "Stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreOperations" ADD CONSTRAINT "StoreOperations_opereytionId_fkey" FOREIGN KEY ("opereytionId") REFERENCES "Opereytion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
