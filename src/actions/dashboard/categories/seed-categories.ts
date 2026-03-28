import { prisma } from "@/lib/prisma";

export const seedInitialCategories = async () => {
    try {
        const categories = await prisma.category.createMany({
            data: [
                {
                    name: "Camisetas",
                    slug: "camisetas",
                    description: "Camisetas y tops para toda ocasión",
                    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
                },
                {
                    name: "Pantalones",
                    slug: "pantalones",
                    description: "Pantalones, jeans y leggins",
                    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
                },
                {
                    name: "Zapatos",
                    slug: "zapatos",
                    description: "Calzado para hombre, mujer y niños",
                    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
                },
                {
                    name: "Accesorios",
                    slug: "accesorios",
                    description: "Bolsos, cinturones, gorras y más",
                    image: "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=400",
                },
                {
                    name: "Chaquetas",
                    slug: "chaquetas",
                    description: "Chaquetas, abrigos y rompevientos",
                    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
                },
                {
                    name: "Ropa Interior",
                    slug: "ropa-interior",
                    description: "Ropa interior y pijamas",
                    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400",
                },
            ],
  
        });

        return {
            success: true,
            message: `${categories.count} categorías creadas correctamente`,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Error al crear las categorías",
        };
    }
};