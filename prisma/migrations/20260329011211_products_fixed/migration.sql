/*
  Warnings:

  - You are about to drop the `product_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_genders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "product_categories";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "product_genders";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_GenderToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_GenderToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "genders" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GenderToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CategoryToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CategoryToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CategoryToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_GenderToProduct_AB_unique" ON "_GenderToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_GenderToProduct_B_index" ON "_GenderToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToProduct_AB_unique" ON "_CategoryToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToProduct_B_index" ON "_CategoryToProduct"("B");
