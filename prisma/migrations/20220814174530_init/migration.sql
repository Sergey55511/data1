-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "login" TEXT NOT NULL,
    "password" TEXT,
    "activ" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Users" ("id", "login", "password") SELECT "id", "login", "password" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_login_key" ON "Users"("login");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
