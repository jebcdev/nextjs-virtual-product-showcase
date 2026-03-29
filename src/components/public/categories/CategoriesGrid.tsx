"use client";

import { useState, useMemo } from "react";
import { Category } from "@/generated/prisma/client";
import { CategoryCard } from "./CategoryCard";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";

interface ICategoriesGridProps {
    categories: Category[];
}

export const CategoriesGrid = ({
    categories,
}: ICategoriesGridProps) => {
    const [query, setQuery] = useState("");

    const filtered = useMemo(() => {
        if (!query.trim()) return categories;

        const q = query.toLowerCase().trim();
        return categories.filter(
            (category) =>
                category.name.toLowerCase().includes(q) ||
                category.slug.toLowerCase().includes(q) ||
                (category.description ?? "")
                    .toLowerCase()
                    .includes(q),
        );
    }, [query, categories]);

    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Search — full width */}
            <div className="w-full flex flex-col gap-2">
                <div className="relative w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Busca por nombre, descripción o slug..."
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
                    {["nombre", "descripción", "slug"].map((hint) => (
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
                        {filtered.length === 0
                            ? "Sin resultados"
                            : `${filtered.length} resultado${filtered.length === 1 ? "" : "s"} para "${query}"`}
                    </p>
                )}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 gap-3 text-zinc-700">
                    <Search className="w-10 h-10 opacity-20" />
                    <p className="font-mono text-xs tracking-widest uppercase">
                        {query
                            ? `Sin resultados para "${query}"`
                            : "No hay categorías disponibles"}
                    </p>
                    {query && (
                        <button
                            onClick={() => setQuery("")}
                            className="text-[11px] font-mono text-emerald-600 hover:text-emerald-400 tracking-widest uppercase transition-colors"
                        >
                            Limpiar búsqueda
                        </button>
                    )}
                </div>
            )}

            {/* Grid */}
            {filtered.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {filtered.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
