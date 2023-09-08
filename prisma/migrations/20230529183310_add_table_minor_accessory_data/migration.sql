-- CreateTable
CREATE TABLE "MinorAccessoryData" (
    "id" SERIAL NOT NULL,
    "idAccessory" INTEGER NOT NULL,
    "countIn" INTEGER,
    "countOut" INTEGER,

    CONSTRAINT "MinorAccessoryData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MinorAccessoryData" ADD CONSTRAINT "MinorAccessoryData_idAccessory_fkey" FOREIGN KEY ("idAccessory") REFERENCES "Locks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
