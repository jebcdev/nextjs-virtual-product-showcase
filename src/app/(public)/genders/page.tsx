import {
    generateDescription,
    generateTitle,
} from "@/lib/layout-metadata";
import { getPublicGenders } from "@/actions/public/public";
import { GenderCard } from "@/components/public/genders/GenderCard";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: generateTitle("Géneros"),
        description: generateDescription(
            "Explora nuestra amplia variedad de géneros de productos, desde moda y tecnología hasta hogar y más. Encuentra lo que necesitas con facilidad.",
        ),
    };
}

export default async function PublicGendersPage() {
    const response = await getPublicGenders();

    return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="mb-8 sm:mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-100 mb-2 sm:mb-3">
                    Géneros
                </h1>
                <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
                    Explora nuestra amplia variedad de géneros de
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
                        No hay géneros disponibles
                    </p>
                </div>
            ) : (
                /* Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {response.data.map((gender) => (
                        <GenderCard key={gender.id} gender={gender} />
                    ))}
                </div>
            )}
        </main>
    );
}
