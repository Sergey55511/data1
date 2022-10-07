-- AlterTable
ALTER TABLE "MaterialGroup" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "position" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "SizeRange" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "position" SERIAL NOT NULL;
