"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface IProps {
    user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
        role: string | null | undefined;
    };
}

const Field = ({
    label,
    value,
}: {
    label: string;
    value: React.ReactNode;
}) => (
    <div className="flex flex-col gap-1">
        <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
            {label}
        </span>
        <span className="text-sm font-mono text-zinc-200">
            {value}
        </span>
    </div>
);

export const UserProfile = ({ user }: IProps) => {
    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const isAdmin = user.role === "ADMIN";

    const formatDate = (date: Date) =>
        new Date(date).toLocaleDateString("es-CO", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

    return (
        <div className="w-full max-w-2xl mx-auto space-y-4">
            {/* Avatar + nombre */}
            <Card className="bg-zinc-900 border-zinc-800 rounded-sm overflow-hidden">
                <div className="h-1 w-full bg-linear-to-r from-emerald-500/0 via-emerald-500 to-emerald-500/0" />
                <CardHeader className="pb-0 pt-6 px-6">
                    <div className="flex items-start gap-5">
                        {/* Avatar */}
                        <div className="relative shrink-0">
                            <div className="w-16 h-16 rounded-sm bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                                {user.image ? (
                                    <Image
                                        src={user.image}
                                        alt={user.name}
                                        width={64}
                                        height={64}
                                        className="w-full h-full object-cover rounded-sm"
                                    />
                                ) : (
                                    <span
                                        className="text-xl font-black text-emerald-400"
                                        style={{
                                            fontFamily:
                                                "'DM Serif Display', Georgia, serif",
                                        }}
                                    >
                                        {initials}
                                    </span>
                                )}
                            </div>
                            {/* online dot */}
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-zinc-900" />
                        </div>

                        {/* Nombre y rol */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h2
                                    className="text-xl font-black text-white tracking-tight"
                                    style={{
                                        fontFamily:
                                            "'DM Serif Display', Georgia, serif",
                                    }}
                                >
                                    {user.name}
                                </h2>
                                <Badge
                                    className={`rounded-sm font-mono text-[10px] tracking-widest px-2 py-0.5 border ${
                                        isAdmin
                                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                            : "bg-zinc-800 text-zinc-400 border-zinc-700"
                                    }`}
                                >
                                    {user.role ?? "USER"}
                                </Badge>
                                {user.emailVerified && (
                                    <Badge className="rounded-sm font-mono text-[10px] tracking-widest px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/30">
                                        VERIFICADO
                                    </Badge>
                                )}
                            </div>
                            <p className="text-sm text-zinc-500 font-mono mt-1 truncate">
                                {user.email}
                            </p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="px-6 pt-6 pb-6">
                    <Separator className="bg-zinc-800 mb-6" />

                    {/* Grid de campos */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Field
                            label="ID de usuario"
                            value={
                                <span className="text-zinc-500 text-xs break-all">
                                    {user.id}
                                </span>
                            }
                        />
                        <Field
                            label="Correo electrónico"
                            value={user.email}
                        />
                        <Field
                            label="Verificación de correo"
                            value={
                                <span
                                    className={
                                        user.emailVerified
                                            ? "text-emerald-400"
                                            : "text-zinc-500"
                                    }
                                >
                                    {user.emailVerified
                                        ? "Verificado ✓"
                                        : "No verificado"}
                                </span>
                            }
                        />
                        <Field
                            label="Rol en el sistema"
                            value={
                                <span
                                    className={
                                        isAdmin
                                            ? "text-emerald-400"
                                            : "text-zinc-300"
                                    }
                                >
                                    {user.role ?? "USER"}
                                </span>
                            }
                        />
                        <Field
                            label="Miembro desde"
                            value={formatDate(user.createdAt)}
                        />
                        <Field
                            label="Última actualización"
                            value={formatDate(user.updatedAt)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Info técnica */}
            <Card className="bg-zinc-900/50 border-zinc-800/50 rounded-sm">
                <CardContent className="px-6 py-4">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                        <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                            Información de sesión
                        </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field
                            label="Imagen de perfil"
                            value={
                                user.image ? (
                                    <span className="text-emerald-400">
                                        Configurada
                                    </span>
                                ) : (
                                    <span className="text-zinc-600">
                                        No configurada
                                    </span>
                                )
                            }
                        />
                        <Field
                            label="Estado"
                            value={
                                <span className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                                    <span className="text-emerald-400">
                                        Activo
                                    </span>
                                </span>
                            }
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
