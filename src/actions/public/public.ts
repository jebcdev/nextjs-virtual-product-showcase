"use server";

import { prisma } from "@/lib/prisma";
import { IGeneralResponse } from "@/types/general-response";
import { Gender, Category, Product } from "@/generated/prisma/client";

export const getPublicGenders = async (): Promise<
    IGeneralResponse<Gender[]>
> => {
    try {
        const genders = await prisma.gender.findMany({
            where: {
                isActive: true,
            },
        });
        return {
            success: true,
            error: false,
            message: "Géneros obtenidos correctamente",
            data: genders,
        };
    } catch (error) {
        console.error("Error fetching genders:", error);
        return {
            success: false,
            error: true,
            message: "Error al obtener los géneros",
        };
    }
};

export const getPublicCategories = async (): Promise<
    IGeneralResponse<Category[]>
> => {
    try {
        const categories = await prisma.category.findMany({
            where: {
                isActive: true,
            },
        });
        return {
            success: true,
            error: false,
            message: "Categorías obtenidas correctamente",
            data: categories,
        };
    } catch (error) {
        console.error("Error fetching categories:", error);
        return {
            success: false,
            error: true,
            message: "Error al obtener las categorías",
        };
    }
};

export const getPublicProducts = async (): Promise<
    IGeneralResponse<
        (Product & { categories: Category[]; genders: Gender[] })[]
    >
> => {
    try {
        const products = await prisma.product.findMany({
            where: {
                isActive: true,
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                categories: true,
                genders: true,
            },
        });
        return {
            success: true,
            error: false,
            message: "Productos obtenidos correctamente",
            data: products,
        };
    } catch (error) {
        console.error("Error fetching products:", error);
        return {
            success: false,
            error: true,
            message: "Error al obtener los productos",
        };
    }
};

export const getPublicProductBySlug = async (
    slug: string,
): Promise<
    IGeneralResponse<
        Product & { categories: Category[]; genders: Gender[] }
    >
> => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                slug,
                isActive: true,
            },
            include: {
                categories: true,
                genders: true,
            },
        });

        if (!product)
            return {
                success: false,
                error: true,
                message: "Producto no encontrado",
            };

        return {
            success: true,
            error: false,
            message: "Producto obtenido correctamente",
            data: product,
        };
    } catch (error) {
        console.error("Error fetching product:", error);
        return {
            success: false,
            error: true,
            message: "Error al obtener el producto",
        };
    }
};
