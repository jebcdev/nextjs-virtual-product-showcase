"use server";

import { Category } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { IGeneralResponse } from "@/types/general-response";
import { CreateCategorySchema, TCreateCategoryData } from "@/validations/dashboard/categories";

export const getDashboardCategories = async (): Promise<
    IGeneralResponse<Category[]>
> => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return {
            success: true,
            message: "Dashboard categories fetched successfully",
            data: categories,
        };
    } catch (error) {
        console.error("Error fetching dashboard categories:", error);
        return {
            success: false,
            message: "Failed to fetch dashboard categories",
            data: [],
        };
    }
};

export const createDashboardCategory = async (
    category: TCreateCategoryData,
): Promise<IGeneralResponse<Category>> => {
    try {
        const validData = CreateCategorySchema.safeParse(category);
        if (!validData.success)
            return {
                success: false,
                error: true,
                message: "La información proporcionada no es válida",
            };

        const newCategory = await prisma.category.create({
            data: validData.data,
        });

        if (!newCategory)
            return {
                success: false,
                error: true,
                message: "No se pudo crear la categoría",
            };

        return {
            success: true,
            message: "Categoría creada exitosamente",
            data: newCategory,
        };
    } catch (error) {
        console.error("Error creating dashboard category:", error);
        return {
            success: false,
            message: "Failed to create dashboard category",
            error: true,
        };
    }
};
