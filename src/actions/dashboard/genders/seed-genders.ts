import { prisma } from "@/lib/prisma";

export const seedGenders = async () => {
    try {
        const genders = await prisma.gender.createMany({
            data: [
                {
                    name: "Hombre",
                    slug: "hombre",
                    description: "Ropa y accesorios para hombre",
                },
                {
                    name: "Mujer",
                    slug: "mujer",
                    description: "Ropa y accesorios para mujer",
                },
                {
                    name: "Unisex",
                    slug: "unisex",
                    description: "Ropa y accesorios para todos",
                },
                {
                    name: "Niños",
                    slug: "ninos",
                    description: "Ropa y accesorios para niños",
                },
            ],
        });

        return {
            success: true,
            message: `${genders.count} géneros creados correctamente`,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Error al crear los géneros",
        };
    }
};