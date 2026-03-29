"use client";

import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import Loading from "@/app/loading";
import { useState } from "react";
import { PublicProductCard } from "./ProductCard";
import { usePublicProductsQuery } from "@/queries/public/useProductsWithRelationsQuery";
import { usePublicProductsByGenderQuery } from "@/queries/public/useProductsByGenderQuery";
import { usePublicProductsByCategoryQuery } from "@/queries/public/useProductsByCategoryQuery";
import { notFound } from "next/navigation";

type TSearchCriteria = "gender" | "category" | "all";

interface IProps {
    searchCriteria?: TSearchCriteria;
    slug?: string;
}

export const PublicProductsGrid = ({
    searchCriteria = "all",
    slug,
}: IProps) => {
    const [query, setQuery] = useState("");

    // ✅ Llamar TODOS los hooks siempre (no condicionalmente)
    const allProductsQuery = usePublicProductsQuery();
    const genderProductsQuery = usePublicProductsByGenderQuery(
        slug || "",
    );
    const categoryProductsQuery = usePublicProductsByCategoryQuery(
        slug || "",
    );

    // Seleccionar cuál usar después
    const activeQuery =
        searchCriteria === "gender"
            ? genderProductsQuery
            : searchCriteria === "category"
              ? categoryProductsQuery
              : allProductsQuery;

    const filtered = activeQuery.data?.filter((product) => {
        const q = query.toLowerCase().trim();
        if (!q) return true;

        return (
            product.id.toLowerCase().includes(q) ||
            product.name.toLowerCase().includes(q) ||
            product.slug.toLowerCase().includes(q) ||
            (product.description ?? "").toLowerCase().includes(q) ||
            product.price.toString().includes(q) ||
            product.stock.toString().includes(q) ||
            product.categories.some(
                (cat) =>
                    cat.name.toLowerCase().includes(q) ||
                    cat.slug.toLowerCase().includes(q) ||
                    (cat.description ?? "").toLowerCase().includes(q),
            ) ||
            product.genders.some(
                (gen) =>
                    gen.name.toLowerCase().includes(q) ||
                    gen.slug.toLowerCase().includes(q) ||
                    (gen.description ?? "").toLowerCase().includes(q),
            )
        );
    });

    if (activeQuery.isLoading || activeQuery.isFetching)
        return <Loading message="Cargando productos..." />;
    if (activeQuery.isError) return notFound();

    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Search — full width */}
            <div className="w-full flex flex-col gap-2">
                <div className="relative w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Busca por nombre, categoría, género, descripción, precio..."
                        className="w-full pl-10 pr-4 h-12 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 font-mono text-xs rounded-sm focus-visible:ring-1 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500/50 transition-colors"
                    />
                    {query && (
                        <button
                            onClick={() => setQuery("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono tracking-widest uppercase text-zinc-600 hover:text-zinc-300 transition-colors"
                        >
                            Limpiar
                        </button>
                    )}
                </div>

                {/* Search hints */}
                <div className="flex items-center gap-2 flex-wrap">
                    <SlidersHorizontal className="w-3 h-3 text-zinc-700 shrink-0" />
                    {[
                        "nombre",
                        "categoría",
                        "género",
                        "descripción",
                        "precio",
                        "stock",
                    ].map((hint) => (
                        <span
                            key={hint}
                            className="text-[10px] font-mono text-zinc-700 tracking-widest uppercase border border-zinc-800 rounded-sm px-1.5 py-0.5"
                        >
                            {hint}
                        </span>
                    ))}
                </div>

                {/* Results count */}
                {query && (
                    <p className="text-[11px] font-mono text-zinc-600 tracking-widest">
                        {filtered?.length === 0
                            ? "Sin resultados"
                            : `${filtered?.length} resultado${filtered?.length === 1 ? "" : "s"} para "${query}"`}
                    </p>
                )}
            </div>

            {/* Empty state */}
            {filtered?.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 gap-3 text-zinc-700">
                    <Search className="w-10 h-10 opacity-20" />
                    <p className="font-mono text-xs tracking-widest uppercase">
                        Sin resultados para &quot;{query}&quot;
                    </p>
                    <button
                        onClick={() => setQuery("")}
                        className="text-[11px] font-mono text-emerald-600 hover:text-emerald-400 tracking-widest uppercase transition-colors"
                    >
                        Limpiar búsqueda
                    </button>
                </div>
            )}

            {/* Grid */}
            {filtered && filtered.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                    {filtered.map((product) => (
                        <PublicProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
