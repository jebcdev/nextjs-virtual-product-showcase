import {
    generateDescription,
    generateTitle,
} from "@/lib/layout-metadata";
import { getPublicCategories } from "@/actions/public/public";
import { CategoriesGrid } from "@/components/public/categories/CategoriesGrid";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: generateTitle("Categorías"),
        description: generateDescription(
            "Explora nuestra amplia variedad de categorías de productos, desde moda y tecnología hasta hogar y más. Encuentra lo que necesitas con facilidad.",
        ),
    };
}

export default async function PublicCategoriesPage() {
    const response = await getPublicCategories();

    return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="mb-8 sm:mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-100 mb-2 sm:mb-3">
                    Categorías
                </h1>
                <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
                    Explora nuestra amplia variedad de categorías de
                    productos, desde moda y tecnología hasta hogar y
                    más. Encuentra lo que necesitas con facilidad.
                </p>
            </div>

            {/* Empty state */}
            {!response.success ||
            !response.data ||
            response.data.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4 text-zinc-600">
                    <p className="font-mono text-sm tracking-widest uppercase">
                        No hay categorías disponibles
                    </p>
                </div>
            ) : (
                /* Grid with search */
                <CategoriesGrid categories={response.data} />
            )}
        </main>
    );
}
