"use client";

import { Suspense, useState } from "react";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { DashboardGenderCard } from "./DashboardGenderCard";
import { useGendersQuery } from "@/queries/dashboard/genders/useGenderQuery";
import Loading from "@/app/loading";
import { notFound } from "next/navigation";
export const DashboardGendersGrid = () => {
    const [query, setQuery] = useState("");

    const genders = useGendersQuery();

      if (genders.isLoading || genders.isFetching)
        return Loading({ message: "Cargando géneros..." });

    if (genders.isError) return notFound();

    const filtered = genders.data!.filter((gender) => {
        const q = query.toLowerCase().trim();
        if (!q) return true;
        return (
            gender.id.toLowerCase().includes(q) ||
            gender.name.toLowerCase().includes(q) ||
            gender.slug.toLowerCase().includes(q) ||
            (gender.description ?? "").toLowerCase().includes(q)
        );
    });

  

    return (
        <div className="flex flex-col gap-6">
            {/* Search */}
            <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar géneros..."
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
                fallback={<Loading message="Cargando géneros..." />}
            >
                {filtered.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filtered.map((gender) => (
                            <DashboardGenderCard
                                key={gender.id}
                                gender={gender}
                                editHref={`/dashboard/genders/${gender.id}/edit`}
                            />
                        ))}
                    </div>
                )}
            </Suspense>
        </div>
    );
};
