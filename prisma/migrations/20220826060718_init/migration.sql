-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "key" TEXT,
    "status" TEXT,
    "activ" BOOLEAN NOT NULL DEFAULT true,
    "storesId" INTEGER,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stores" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Opereytion" (
    "id" SERIAL NOT NULL,
    "opereytion" TEXT NOT NULL,
    "result" TEXT,
    "sborka" INTEGER,
    "activ" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Opereytion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grade" (
    "id" SERIAL NOT NULL,
    "grade" TEXT NOT NULL,
    "for" TEXT,
    "variant" INTEGER NOT NULL,
    "activ" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collor" (
    "id" SERIAL NOT NULL,
    "collor" TEXT NOT NULL,
    "for" TEXT,
    "variant" INTEGER NOT NULL,
    "activ" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Collor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_login_key" ON "Users"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Opereytion_opereytion_key" ON "Opereytion"("opereytion");

-- CreateIndex
CREATE UNIQUE INDEX "Grade_grade_key" ON "Grade"("grade");

-- CreateIndex
CREATE UNIQUE INDEX "Collor_collor_key" ON "Collor"("collor");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_storesId_fkey" FOREIGN KEY ("storesId") REFERENCES "Stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;
