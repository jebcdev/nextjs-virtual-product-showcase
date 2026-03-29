"use server";

import { Product } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { IGeneralResponse } from "@/types/general-response";
import {
    CreateProductSchema,
    TCreateProductData,
    TUpdateProductData,
    UpdateProductSchema,
} from "@/validations/dashboard/products";

export const getDashboardProducts = async (): Promise<
    IGeneralResponse<Product[]>
> => {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                categories: true,
                genders: true,
            },
        });
        return {
            success: true,
            message: "Productos obtenidos exitosamente",
            data: products,
        };
    } catch (error) {
        console.error("Error fetching dashboard products:", error);
        return {
            success: false,
            message: "Error al obtener los productos",
            data: [],
        };
    }
};

export const getDashboardProductBySlug = async (
    slug: string,
): Promise<IGeneralResponse<Product>> => {
    try {
        const product = await prisma.product.findUnique({
            where: { slug },
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
            message: "Producto obtenido exitosamente",
            data: product,
        };
    } catch (error) {
        console.error("Error fetching dashboard product:", error);
        return {
            success: false,
            error: true,
            message: "Error al obtener el producto",
        };
    }
};

export const createDashboardProduct = async (
    product: TCreateProductData,
): Promise<IGeneralResponse<Product>> => {
    try {
        const validData = CreateProductSchema.safeParse(product);
        if (!validData.success)
            return {
                success: false,
                error: true,
                message: "La información proporcionada no es válida",
            };

        const { categoryIds, genderIds, images, ...rest } =
            validData.data;

        const newProduct = await prisma.product.create({
            data: {
                ...rest,
                images: JSON.stringify(images),
                categories: {
                    connect: categoryIds.map((id) => ({ id })),
                },
                genders: {
                    connect: genderIds.map((id) => ({ id })),
                },
            },
            include: {
                categories: true,
                genders: true,
            },
        });

        return {
            success: true,
            message: "Producto creado exitosamente",
            data: newProduct,
        };
    } catch (error) {
        console.error("Error creating dashboard product:", error);
        return {
            success: false,
            error: true,
            message: "Error al crear el producto",
        };
    }
};

export const updateDashboardProductById = async (
    id: string,
    product: TUpdateProductData,
): Promise<IGeneralResponse<Product>> => {
    try {
        const validData = UpdateProductSchema.safeParse({
            ...product,
            id,
        });
        if (!validData.success)
            return {
                success: false,
                error: true,
                message: "La información proporcionada no es válida",
            };

        const {
            categoryIds,
            genderIds,
            images,
            id: _,
            ...rest
        } = validData.data;

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                ...rest,
                ...(images && { images: JSON.stringify(images) }),
                ...(categoryIds && {
                    categories: {
                        set: categoryIds.map((id) => ({ id })),
                    },
                }),
                ...(genderIds && {
                    genders: {
                        set: genderIds.map((id) => ({ id })),
                    },
                }),
            },
            include: {
                categories: true,
                genders: true,
            },
        });

        return {
            success: true,
            message: "Producto actualizado exitosamente",
            data: updatedProduct,
        };
    } catch (error) {
        console.error("Error updating dashboard product:", error);
        return {
            success: false,
            error: true,
            message: "Error al actualizar el producto",
        };
    }
};

export const toggleDashboardProductActiveById = async (
    id: string,
): Promise<IGeneralResponse<Product>> => {
    try {
        const current = await prisma.product.findUnique({
            where: { id },
            select: { isActive: true },
        });

        if (!current)
            return {
                success: false,
                error: true,
                message: "Producto no encontrado",
            };

        const toggled = await prisma.product.update({
            where: { id },
            data: { isActive: !current.isActive },
        });

        return {
            success: true,
            message: toggled.isActive
                ? "Producto activado exitosamente"
                : "Producto desactivado exitosamente",
            data: toggled,
        };
    } catch (error) {
        console.error("Error toggling dashboard product:", error);
        return {
            success: false,
            error: true,
            message: "Error al cambiar el estado del producto",
        };
    }
};

export const toggleDashboardProductFeaturedById = async (
    id: string,
): Promise<IGeneralResponse<Product>> => {
    try {
        const current = await prisma.product.findUnique({
            where: { id },
            select: { isFeatured: true },
        });

        if (!current)
            return {
                success: false,
                error: true,
                message: "Producto no encontrado",
            };

        const toggled = await prisma.product.update({
            where: { id },
            data: { isFeatured: !current.isFeatured },
        });

        return {
            success: true,
            message: toggled.isFeatured
                ? "Producto destacado exitosamente"
                : "Producto removido de destacados exitosamente",
            data: toggled,
        };
    } catch (error) {
        console.error(
            "Error toggling dashboard product featured:",
            error,
        );
        return {
            success: false,
            error: true,
            message: "Error al cambiar el estado de destacado",
        };
    }
};

export const deleteDashboardProductById = async (
    id: string,
): Promise<IGeneralResponse<Product>> => {
    try {
        const deleted = await prisma.product.delete({
            where: { id },
        });

        return {
            success: true,
            message: "Producto eliminado exitosamente",
            data: deleted,
        };
    } catch (error) {
        console.error("Error deleting dashboard product:", error);
        return {
            success: false,
            error: true,
            message: "Error al eliminar el producto",
        };
    }
};
