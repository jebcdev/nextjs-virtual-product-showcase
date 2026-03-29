"use client";

import { Product } from "@/generated/prisma/client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Loading from "@/app/loading";
import { Suspense, useState } from "react";
import { DashboardProductCard } from "./ProductCard";

interface IProps {
    products: Product[];
}

export const DashboardProductsGrid = ({ products }: IProps) => {
        const [query, setQuery] = useState("");
    
        const filtered = products.filter((product) => {
            const q = query.toLowerCase().trim();
            if (!q) return true;
    
            return (
                product.id.toLowerCase().includes(q) ||
                product.name.toLowerCase().includes(q) ||
                product.slug.toLowerCase().includes(q) ||
                product.description?.toLowerCase().includes(q)
            );
        });
    return (
        <>
            <div className="flex flex-col gap-6 mt-2">
                            {/* Search */}
                            <div className="relative w-full max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                                <Input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Buscar productos..."
                                    className="pl-9 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 font-mono text-xs rounded-sm focus-visible:ring-emerald-500/50"
                                />
                            </div>
            
                            {/* Empty state */}
                            {filtered.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-16 gap-2 text-zinc-600 font-mono text-xs tracking-widest uppercase">
                                    <Search className="w-8 h-8 opacity-30" />
                                    <span>
                                        Sin resultados para &quot;{query}&quot;
                                    </span>
                                </div>
                            )}
                            {/* Grid */}
                            <Suspense
                                fallback={
                                    <Loading message="Cargando productos..." />
                                }
                            >
                                {filtered.length > 0 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                        {filtered.map((product) => (
                                            <DashboardProductCard
                                                key={product.id}
                                                product={product}
                                            />
                                        ))}
                                    </div>
                                )}
                            </Suspense>
                        </div>
        </>
    );
};
