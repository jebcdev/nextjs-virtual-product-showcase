import { useQuery } from "@tanstack/react-query";
import { TProductWithRelations } from "@/types/product-with-relations";
import { getPublicProductBySlug } from "@/actions/public/public";

export const usePublicProductBySlugQuery = (slug: string) => {
    return useQuery<TProductWithRelations>({
        queryKey: ["public-products", { slug }],
        queryFn: async () => {
            const response = await getPublicProductBySlug(slug);
            if (!response.success) throw new Error(response.message);
            if (!response.data)
                throw new Error("Producto no encontrado");
            return response.data;
        },
        staleTime: 1000 * 60 * 60 * 24 * 2,
        gcTime: 1000 * 60 * 60 * 24 * 2,
    });
};
