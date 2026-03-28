import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Gender } from "@/generated/prisma/client";


interface DashboardEntityCardProps {
    gender:Gender
    editHref: string;
    className?: string;
}

export const DashboardGenderCard = ({
    gender: { id, name, slug, isActive },
    editHref,
    className,
}: DashboardEntityCardProps) => {
    return (
        <div
            className={cn(
                "flex flex-col gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-sm hover:border-zinc-700 transition-colors",
                className,
            )}
        >
            {/* Top — name + badge */}
            <div className="flex items-start justify-between gap-2">
                <p
                    className="text-sm font-black text-white leading-tight"
                    style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                    {name}
                </p>
                <Badge
                    className={cn(
                        "shrink-0 text-[10px] font-mono tracking-widest uppercase rounded-sm px-1.5 py-0.5",
                        isActive
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-zinc-800 text-zinc-500 border border-zinc-700",
                    )}
                >
                    {isActive ? "Activo" : "Inactivo"}
                </Badge>
            </div>

            {/* Slug */}
            <p className="text-[11px] font-mono text-zinc-500 tracking-widest">
                /{slug}
            </p>


        </div>
    );
};