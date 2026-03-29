"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TProductWithRelations } from "@/types/product-with-relations";

interface IProps {
    product: TProductWithRelations;
}

export const PublicProductCard = ({ product }: IProps) => {
    const {
        name,
        slug,
        price,
        stock,
        images,
        isFeatured,
        categories,
        genders,
    } = product;

    const parsedImages: string[] = JSON.parse(images || "[]");
    const cover = parsedImages[0] ?? null;

    return (
        <div className="group relative flex flex-col bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden hover:border-zinc-600 transition-all duration-300">
            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden bg-zinc-800">
                {cover ? (
                    <Image
                        src={cover}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex flex-col h-full items-center justify-center gap-2 text-zinc-700">
                        <span className="text-[10px] font-mono tracking-widest uppercase">
                            Sin imagen
                        </span>
                    </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {isFeatured && (
                        <Badge className="flex items-center gap-1 w-fit text-[10px] font-mono tracking-widest uppercase rounded-sm px-1.5 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            <Star className="w-2.5 h-2.5" />
                            Destacado
                        </Badge>
                    )}
                </div>

                {/* Actions overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Ver */}
                    <Button
                        asChild
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 bg-zinc-900/80 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-sm"
                    >
                        <Link href={`/product/${slug}`}>
                            <Eye className="w-3.5 h-3.5" />
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-3 p-4">
                <p
                    className="text-sm font-black text-white leading-tight line-clamp-1"
                    style={{
                        fontFamily:
                            "'DM Serif Display', Georgia, serif",
                    }}
                >
                    {name}
                </p>

                <p className="text-[11px] font-mono text-zinc-600 tracking-widest">
                    /{slug}
                </p>

                {/* Categorías */}
                {categories.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {categories.slice(0, 2).map((cat) => (
                            <Badge
                                key={cat.id}
                                className="text-[9px] font-mono tracking-widest uppercase rounded-sm px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            >
                                {cat.name}
                            </Badge>
                        ))}
                        {categories.length > 2 && (
                            <span className="text-[9px] text-zinc-600">
                                +{categories.length - 2}
                            </span>
                        )}
                    </div>
                )}

                {/* Géneros */}
                {genders && genders.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {genders.map((gen) => (
                            <Badge
                                key={gen.id}
                                className="text-[9px] font-mono tracking-widest uppercase rounded-sm px-1.5 py-0.5 bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold"
                            >
                                {gen.name}
                            </Badge>
                        ))}
                    </div>
                )}

                {/* Price + stock */}
                <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                    <span className="text-base font-black text-emerald-400 font-mono">
                        ${price.toLocaleString("es-CO")}
                    </span>

                    <span
                        className={cn(
                            "text-[10px] font-mono tracking-widest uppercase",
                            stock === 0
                                ? "text-red-500/70"
                                : stock <= 5
                                  ? "text-amber-500/70"
                                  : "text-zinc-500",
                        )}
                    >
                        {stock === 0 ? "Agotado" : `${stock} uds`}
                    </span>
                </div>
            </div>
        </div>
    );
};
