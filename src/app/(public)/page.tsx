import { PublicProductsGrid } from "@/components/public/products/ProductsGrid";
import { generateTitle } from "@/lib/layout-metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: generateTitle("Vitrina de Productos"),
        description:
            "Explora nuestro catálogo de productos, descubre ofertas especiales y gestiona tu carrito de compras de forma segura.",
    };
}

export default async function HomePage() {

    return (
        <>
            <PublicProductsGrid />
        </>
    );
}
