// src/queries/public/usePublicGendersQuery.ts
import { useQuery } from "@tanstack/react-query";
import { getPublicGenders } from "@/actions/public/public";
import { Gender } from "@/generated/prisma/client";

export const usePublicGendersQuery = () => {
    return useQuery<Gender[]>({
        queryKey: ["public-genders"],
        queryFn: async () => {
            const response = await getPublicGenders();
            if (!response.success) throw new Error(response.message);
            return response.data ?? [];
        },
        staleTime: 1000 * 60 * 60 * 24 * 2,
        gcTime: 1000 * 60 * 60 * 24 * 2,
    });
};