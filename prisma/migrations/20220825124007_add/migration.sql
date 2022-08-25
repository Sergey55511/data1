-- CreateTable
CREATE TABLE "Stores" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "key" TEXT,
    "status" TEXT,
    "activ" BOOLEAN NOT NULL DEFAULT true,
    "storesId" INTEGER,
    CONSTRAINT "Users_storesId_fkey" FOREIGN KEY ("storesId") REFERENCES "Stores" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Users" ("activ", "id", "key", "login", "password", "status") SELECT "activ", "id", "key", "login", "password", "status" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_login_key" ON "Users"("login");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
