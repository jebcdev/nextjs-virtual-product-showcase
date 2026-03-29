import { useQuery } from "@tanstack/react-query";
import { TProductWithRelations } from "@/types/product-with-relations";
import { getPublicProductsByGender } from "@/actions/public/public";

export const usePublicProductsByGenderQuery = (genderSlug: string) => {
    return useQuery<TProductWithRelations[]>({
        queryKey: ["public-products-gender", { genderSlug }],
        queryFn: async () => {
            const response = await getPublicProductsByGender(genderSlug);
            if (!response.success) throw new Error(response.message);
            return response.data ?? [];
        },
        staleTime: 1000 * 60 * 60 * 24 * 2,
        gcTime: 1000 * 60 * 60 * 24 * 2,
    });
};
