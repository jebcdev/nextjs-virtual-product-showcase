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

export const deleteDashboardGenderById = async (
    id: string,
): Promise<IGeneralResponse<Gender>> => {
    try {
        // Verificar si el género existe
        const genderExists = await prisma.gender.findUnique({
            where: { id },
        });

        if (!genderExists) {
            return {
                success: false,
                error: true,
                message: "El género no existe",
            };
        }

        // Actualizar isActive a false (soft delete)
        const deletedGender = await prisma.gender.update({
            where: { id },
            data: { isActive: false },
        });

        return {
            success: true,
            message: "Género eliminado correctamente",
            data: deletedGender,
        };
    } catch (error) {
        console.error("Error deleting gender:", error);
        return {
            success: false,
            error: true,
            message: "Error al eliminar el género",
        };
    }
};
