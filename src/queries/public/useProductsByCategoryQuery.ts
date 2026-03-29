import { useQuery } from "@tanstack/react-query";
import { TProductWithRelations } from "@/types/product-with-relations";
import { getPublicProductsByCategory } from "@/actions/public/public";

export const usePublicProductsByCategoryQuery = (
    categorySlug: string,
) => {
    return useQuery<TProductWithRelations[]>({
        queryKey: ["public-products-category", { categorySlug }],
        queryFn: async () => {
            const response =
                await getPublicProductsByCategory(categorySlug);
            if (!response.success) throw new Error(response.message);
            return response.data ?? [];
        },
        staleTime: 1000 * 60 * 60 * 24 * 2,
        gcTime: 1000 * 60 * 60 * 24 * 2,
    });
};
