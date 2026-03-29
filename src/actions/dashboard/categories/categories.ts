"use server";

import { Category } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { IGeneralResponse } from "@/types/general-response";
import {
    CreateCategorySchema,
    TCreateCategoryData,
} from "@/validations/dashboard/categories";

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

export const getDashboardCategoryBySlug = async (
    slug: string,
): Promise<IGeneralResponse<Category>> => {
    try {
        const category = await prisma.category.findUnique({
            where: {
                slug,
            },
        });

        if (!category) {
            return {
                success: false,
                error: true,
                message: "Category not found",
            };
        }

        return {
            success: true,
            message: "Dashboard category fetched successfully",
            data: category,
        };
    } catch (error) {
        return {
            success: false,
            error: true,
            message: "Failed to fetch dashboard category",
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

export const updateDashboardCategoryById = async (
    id: string,
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

        const updatedCategory = await prisma.category.update({
            where: {
                id: id.toString(),
            },
            data: validData.data,
        });

        if (!updatedCategory)
            return {
                success: false,
                error: true,
                message: "No se pudo actualizar la categoría",
            };

        return {
            success: true,
            message: "Categoría actualizada exitosamente",
            data: updatedCategory,
        };
    } catch (error) {
        console.error("Error updating dashboard category:", error);
        return {
            success: false,
            message: "Failed to update dashboard category",
            error: true,
        };
    }
};

export const toggleDashboardCategoryById = async (
    id: string,
): Promise<IGeneralResponse<Category>> => {
    try {
        const currentCategory = await prisma.category.findUnique({
            where: {
                id: id.toString(),
            },
            select: {
                isActive: true,
            },
        });

        if (!currentCategory) {
            return {
                success: false,
                error: true,
                message: "Categoría no encontrada",
            };
        }

        const toggledCategory = await prisma.category.update({
            where: {
                id: id.toString(),
            },
            data: {
                isActive: !currentCategory.isActive,
            },
        });

        if (!toggledCategory)
            return {
                success: false,
                error: true,
                message:
                    "No se pudo cambiar el estado de la categoría",
            };

        return {
            success: true,
            message: toggledCategory.isActive
                ? "Categoría activada exitosamente"
                : "Categoría desactivada exitosamente",
            data: toggledCategory,
        };
    } catch (error) {
        console.error("Error toggling dashboard category:", error);
        return {
            success: false,
            message: "Failed to toggle dashboard category",
            error: true,
        };
    }
};
