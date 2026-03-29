"use client";

import { Category } from "@/generated/prisma/client";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { toggleDashboardCategoryById } from "@/actions/dashboard/categories/categories";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface IProps {
    category: Category;
}

export const DashboardCategoryCard = ({ category }: IProps) => {
    const { id, name, slug, description, image, isActive } = category;
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleToggle = () => {
        startTransition(async () => {
            const response = await toggleDashboardCategoryById(id);

            if (!response.success) {
                toast.error("Error al cambiar estado", {
                    description: response.message,
                    action: {
                        label: "Entendido",
                        onClick: () => toast.dismiss(),
                    },
                });
                return;
            }

            toast.success(response.message, {
                action: {
                    label: "Entendido",
                    onClick: () => toast.dismiss(),
                },
            });

            router.refresh();
        });
    };

    return (
        <div className="group relative flex flex-col bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden hover:border-zinc-600 transition-all duration-300">
            {/* Image */}
            <div className="relative h-40 w-full overflow-hidden bg-zinc-800">
                {image ? (
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-600">
                            Sin imagen
                        </span>
                    </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badge isActive — top right */}
                <div className="absolute top-2 right-2">
                    <Badge
                        className={cn(
                            "text-[10px] font-mono tracking-widest uppercase rounded-sm px-1.5 py-0.5 border",
                            isActive
                                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                : "bg-zinc-800/80 text-zinc-500 border-zinc-700",
                        )}
                    >
                        {isActive ? "Activo" : "Inactivo"}
                    </Badge>
                </div>

                {/* Actions overlay — appear on hover */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                        asChild
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 bg-zinc-900/80 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-sm"
                    >
                        <Link
                            href={`/dashboard/categories/${slug}/view`}
                        >
                            <Eye className="w-3.5 h-3.5" />
                        </Link>
                    </Button>

                    <Button
                        asChild
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 bg-zinc-900/80 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-sm"
                    >
                        <Link
                            href={`/dashboard/categories/${slug}/edit`}
                        >
                            <Pencil className="w-3.5 h-3.5" />
                        </Link>
                    </Button>

                    <Button
                        onClick={handleToggle}
                        disabled={isPending}
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 bg-zinc-900/80 border border-red-900/40 text-red-500/70 hover:text-red-400 hover:bg-red-500/10 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-2 p-4">
                <div className="flex items-start justify-between gap-2">
                    <p
                        className="text-sm font-black text-white leading-tight"
                        style={{
                            fontFamily:
                                "'DM Serif Display', Georgia, serif",
                        }}
                    >
                        {name}
                    </p>
                </div>

                <p className="text-[11px] font-mono text-zinc-600 tracking-widest">
                    /{slug}
                </p>

                {description && (
                    <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};
