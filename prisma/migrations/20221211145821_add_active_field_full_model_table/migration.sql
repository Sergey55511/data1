-- AlterTable
ALTER TABLE "FullModels" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "LengthModel" ALTER COLUMN "active" SET DEFAULT true;
