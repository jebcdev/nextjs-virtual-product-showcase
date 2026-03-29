// src/queries/public/usePublicCategoriesQuery.ts
import { useQuery } from "@tanstack/react-query";
import { getPublicCategories } from "@/actions/public/public";
import { Category } from "@/generated/prisma/client";

export const usePublicCategoriesQuery = () => {
    return useQuery<Category[]>({
        queryKey: ["public-categories"],
        queryFn: async () => {
            const response = await getPublicCategories();
            if (!response.success) throw new Error(response.message);
            return response.data ?? [];
        },
        staleTime: 1000 * 60 * 60 * 24 * 2,
        gcTime: 1000 * 60 * 60 * 24 * 2,
    });
};