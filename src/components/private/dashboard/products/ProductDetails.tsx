import { Product, Category, Gender } from "@/generated/prisma/client";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Package, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface IProps {
    product: Product & { categories: Category[]; genders: Gender[] };
}

export const DashboardProductDetails = ({ product }: IProps) => {
    const {
        name,
        slug,
        description,
        price,
        stock,
        images,
        isActive,
        isFeatured,
        categories,
        genders,
        createdAt,
        updatedAt,
    } = product;

    const parsedImages: string[] = JSON.parse(images || "[]");
    const cover = parsedImages[0] ?? null;

    return (
        <div className="flex flex-col gap-6 py-6">
            {/* Image */}
            <div className="relative w-full h-56 rounded-sm overflow-hidden border border-zinc-800 bg-zinc-900">
                {cover ? (
                    <Image
                        src={cover}
                        alt={name}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-2 text-zinc-700">
                        <Package className="w-6 h-6" />
                        <span className="text-[11px] font-mono tracking-widest uppercase">
                            Sin imagen
                        </span>
                    </div>
                )}
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-4">
                <Field label="Nombre" value={name} />
                <Field label="Slug" value={`/${slug}`} mono />
                <Field
                    label="Descripción"
                    value={description ?? "—"}
                />

                {/* Price + Stock */}
                <div className="grid grid-cols-2 gap-4">
                    <Field
                        label="Precio"
                        value={`$${price.toLocaleString("es-CO")}`}
                    />
                    <Field
                        label="Stock"
                        value={`${stock} unidades`}
                    />
                </div>

                {/* Badges — Estados */}
                <div className="flex gap-2 pt-2">
                    {isFeatured && (
                        <Badge className="flex items-center gap-1 text-[11px] font-mono tracking-widest uppercase rounded-sm px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            <Star className="w-3 h-3" />
                            Destacado
                        </Badge>
                    )}
                    <Badge
                        className={cn(
                            "text-[11px] font-mono tracking-widest uppercase rounded-sm px-2 py-0.5 border",
                            isActive
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : "bg-zinc-800 text-zinc-500 border-zinc-700",
                        )}
                    >
                        {isActive ? "Activo" : "Inactivo"}
                    </Badge>
                </div>

                {/* Categorías */}
                {categories.length > 0 && (
                    <div className="flex flex-col gap-1.5 pb-4 border-b border-zinc-800">
                        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                            Categorías
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <Badge
                                    key={cat.id}
                                    className="text-[10px] font-mono tracking-widest uppercase rounded-sm px-2 py-0.5 bg-zinc-800 text-zinc-300 border border-zinc-700"
                                >
                                    {cat.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {/* Géneros */}
                {genders.length > 0 && (
                    <div className="flex flex-col gap-1.5 pb-4 border-b border-zinc-800">
                        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                            Géneros
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {genders.map((gen) => (
                                <Badge
                                    key={gen.id}
                                    className="text-[10px] font-mono tracking-widest uppercase rounded-sm px-2 py-0.5 bg-zinc-800 text-zinc-300 border border-zinc-700"
                                >
                                    {gen.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                <Field
                    label="Creado"
                    value={createdAt.toLocaleDateString("es-CO", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                    })}
                    mono
                />
                <Field
                    label="Actualizado"
                    value={updatedAt.toLocaleDateString("es-CO", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                    })}
                    mono
                />
            </div>
        </div>
    );
};

// Campo reutilizable interno
const Field = ({
    label,
    value,
    mono = false,
}: {
    label: string;
    value: string;
    mono?: boolean;
}) => (
    <div className="flex flex-col gap-1.5 pb-4 border-b border-zinc-800 last:border-0 last:pb-0">
        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
            {label}
        </span>
        <span
            className={cn(
                "text-sm text-zinc-200",
                mono ? "font-mono" : "font-normal",
            )}
        >
            {value}
        </span>
    </div>
);
