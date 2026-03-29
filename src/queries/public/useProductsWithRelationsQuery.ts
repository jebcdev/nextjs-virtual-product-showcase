import { useQuery } from "@tanstack/react-query";
import { getPublicProducts } from "@/actions/public/public";
import { TProductWithRelations } from "@/types/product-with-relations";

export const usePublicProductsQuery = () => {
    return useQuery<TProductWithRelations[]>({
        queryKey: ["public-products"],
        queryFn: async () => {
            const response = await getPublicProducts();
            if (!response.success) throw new Error(response.message);
            return response.data ?? [];
        },
        staleTime: 1000 * 60 * 60 * 24 * 2,
        gcTime: 1000 * 60 * 60 * 24 * 2,
    });
};