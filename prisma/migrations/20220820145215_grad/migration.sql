/*
  Warnings:

  - You are about to alter the column `sborka` on the `Opereytion` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- CreateTable
CREATE TABLE "Grade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "grade" TEXT NOT NULL,
    "for" TEXT,
    "variant" INTEGER NOT NULL,
    "activ" BOOLEAN NOT NULL DEFAULT true
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Opereytion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "opereytion" TEXT NOT NULL,
    "result" TEXT,
    "sborka" INTEGER,
    "activ" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Opereytion" ("activ", "id", "opereytion", "result", "sborka") SELECT "activ", "id", "opereytion", "result", "sborka" FROM "Opereytion";
DROP TABLE "Opereytion";
ALTER TABLE "new_Opereytion" RENAME TO "Opereytion";
CREATE UNIQUE INDEX "Opereytion_opereytion_key" ON "Opereytion"("opereytion");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Grade_grade_key" ON "Grade"("grade");
