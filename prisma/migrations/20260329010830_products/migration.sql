-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "images" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "product_categories" (
    "product_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    PRIMARY KEY ("product_id", "category_id"),
    CONSTRAINT "product_categories_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "product_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "product_genders" (
    "product_id" TEXT NOT NULL,
    "gender_id" TEXT NOT NULL,

    PRIMARY KEY ("product_id", "gender_id"),
    CONSTRAINT "product_genders_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "product_genders_gender_id_fkey" FOREIGN KEY ("gender_id") REFERENCES "genders" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");
