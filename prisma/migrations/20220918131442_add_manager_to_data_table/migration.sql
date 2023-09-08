-- AlterTable
ALTER TABLE "Data" ADD COLUMN     "managerId" INTEGER;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
