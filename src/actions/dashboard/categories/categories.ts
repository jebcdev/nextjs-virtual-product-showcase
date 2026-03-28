import { Category } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { IGeneralResponse } from "@/types/general-response";

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
