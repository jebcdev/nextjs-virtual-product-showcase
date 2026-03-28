import { useQuery } from "@tanstack/react-query";
import { getDashboardGenders } from "@/actions/dashboard/genders/genders";
import { Gender } from "@/generated/prisma/client";

export const useGendersQuery = () => {
    return useQuery<Gender[]>({
        queryKey: ["genders"],
        queryFn: async () => {
            const response = await getDashboardGenders();
            if (!response.success) throw new Error(response.message);
            return response.data ?? [];
        },
        staleTime: 1000 * 60 * 60 * 24 * 2,
        gcTime: 1000 * 60 * 60 * 24 * 2,
    });
};
