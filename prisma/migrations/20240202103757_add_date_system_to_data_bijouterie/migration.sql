-- AlterTable
ALTER TABLE "DataBijouterie" ADD COLUMN     "dateSystem" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "DataProduct" ALTER COLUMN "dateSystem" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "OptimizedData" ALTER COLUMN "dateSystem" SET DATA TYPE TIMESTAMP(3);
