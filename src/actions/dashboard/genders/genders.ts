"use server";

import { Gender } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { IGeneralResponse } from "@/types/general-response";

export const getDashboardGenders = async (): Promise<
    IGeneralResponse<Gender[]>
> => {
    try {
        
        const genders = await prisma.gender.findMany();
        return {
            success: true,
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