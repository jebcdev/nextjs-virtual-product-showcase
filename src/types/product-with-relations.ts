import { Product, Category, Gender } from "@/generated/prisma/client";

export type TProductWithRelations = Product & {
    categories: Category[];
    genders: Gender[];
};