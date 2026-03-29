import { Category } from "@/generated/prisma/client";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface IProps {
    category: Category;
}

export const DashboardCategoryDetails = ({ category }: IProps) => {
    const { name, slug, description, image, isActive, createdAt, updatedAt } =
        category;

    return (
        <div className="flex flex-col gap-6 py-6">
            {/* Image */}
            <div className="relative w-full h-56 rounded-sm overflow-hidden border border-zinc-800 bg-zinc-900">
                {image ? (
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-2 text-zinc-700">
                        <ImageOff className="w-6 h-6" />
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
                <Field label="Descripción" value={description ?? "—"} />

                {/* isActive */}
                <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                        Estado
                    </span>
                    <Badge
                        className={cn(
                            "w-fit text-[11px] font-mono tracking-widest uppercase rounded-sm px-2 py-0.5 border",
                            isActive
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : "bg-zinc-800 text-zinc-500 border-zinc-700",
                        )}
                    >
                        {isActive ? "Activo" : "Inactivo"}
                    </Badge>
                </div>

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