/*
  Warnings:

  - Made the column `password` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "Opereytion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "opereytion" TEXT NOT NULL,
    "result" TEXT,
    "sborka" TEXT,
    "activ" BOOLEAN NOT NULL DEFAULT true
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "activ" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Users" ("activ", "id", "login", "password") SELECT coalesce("activ", true) AS "activ", "id", "login", "password" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_login_key" ON "Users"("login");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Opereytion_opereytion_key" ON "Opereytion"("opereytion");
