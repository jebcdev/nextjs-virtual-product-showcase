"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, ChevronDown, LayoutGrid, Venus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { usePublicCategoriesQuery } from "@/queries/public/useCategoriesQuery";
import { usePublicGendersQuery } from "@/queries/public/useGendersQuery";
import Loading from "@/app/loading";

interface IUser {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    role?: string | null;
}

interface IProps {
    isAuthenticated: boolean;
    isAdmin: boolean;
    currentUser: IUser | null;
}

export const PublicHeader = ({
    isAuthenticated,
    isAdmin,
    currentUser,
}: IProps) => {
    const router = useRouter();

    const categories= usePublicCategoriesQuery();
    const genders   = usePublicGendersQuery();

    // Tomar 5 aleatorios cada render
    const featuredCategories = [...categories.data??[]]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);

    const featuredGenders = genders.data??[];

    const initials = currentUser?.name
        ? currentUser.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)
        : "U";

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.info("Sesión cerrada", {
                        description: "Has cerrado sesión correctamente.",
                        action: {
                            label: "Entendido",
                            onClick: () => toast.dismiss(),
                        },
                    });
                    router.push("/login");
                },
                onError: () => {
                    toast.error("Error al cerrar sesión", {
                        description: "Intenta nuevamente.",
                        action: {
                            label: "Entendido",
                            onClick: () => toast.dismiss(),
                        },
                    });
                },
            },
        });
    };
if(categories.isLoading || categories.isFetching || genders.isLoading || genders.isFetching) return <Loading message="Cargando categorías y géneros..." />;
    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/80 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group shrink-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 group-hover:shadow-[0_0_8px_rgba(52,211,153,0.8)] transition-all" />
                    <span
                        className="text-sm font-black text-white tracking-tight"
                        style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                    >
                        JEBC<span className="text-emerald-400">-DeV</span>
                    </span>
                </Link>

                {/* Nav */}
                <nav className="hidden sm:flex items-center gap-1">
                    <Link
                        href="/"
                        className="px-3 py-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-100 tracking-widest uppercase transition-colors rounded-sm hover:bg-zinc-900"
                    >
                        Inicio
                    </Link>

                    {/* Dropdown Géneros */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-100 tracking-widest uppercase transition-colors rounded-sm hover:bg-zinc-900 outline-none">
                            <Venus className="w-3 h-3" />
                            Géneros
                            <ChevronDown className="w-3 h-3 opacity-50" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="start"
                            className="w-48 bg-zinc-900 border-zinc-800 rounded-sm p-1"
                        >
                            <DropdownMenuLabel className="px-3 py-1.5">
                                <Link
                                    href="/genders"
                                    className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase hover:text-emerald-300 transition-colors"
                                >
                                    Ver todos →
                                </Link>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-zinc-800 my-1" />
                            {featuredGenders.map((gender) => (
                                <DropdownMenuItem key={gender.id} asChild>
                                    <Link
                                        href={`/gender/${gender.slug}`}
                                        className="font-mono text-xs text-zinc-300 hover:text-white focus:text-white hover:bg-zinc-800 focus:bg-zinc-800 rounded-sm cursor-pointer px-3 py-2"
                                    >
                                        {gender.name}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Dropdown Categorías */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-100 tracking-widest uppercase transition-colors rounded-sm hover:bg-zinc-900 outline-none">
                            <LayoutGrid className="w-3 h-3" />
                            Categorías
                            <ChevronDown className="w-3 h-3 opacity-50" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="start"
                            className="w-48 bg-zinc-900 border-zinc-800 rounded-sm p-1"
                        >
                            <DropdownMenuLabel className="px-3 py-1.5">
                                <Link
                                    href="/categories"
                                    className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase hover:text-emerald-300 transition-colors"
                                >
                                    Ver todas →
                                </Link>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-zinc-800 my-1" />
                            {featuredCategories.map((category) => (
                                <DropdownMenuItem key={category.id} asChild>
                                    <Link
                                        href={`/category/${category.slug}`}
                                        className="font-mono text-xs text-zinc-300 hover:text-white focus:text-white hover:bg-zinc-800 focus:bg-zinc-800 rounded-sm cursor-pointer px-3 py-2"
                                    >
                                        {category.name}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Link
                        href="/about"
                        className="px-3 py-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-100 tracking-widest uppercase transition-colors rounded-sm hover:bg-zinc-900"
                    >
                        Acerca de
                    </Link>
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {!isAuthenticated ? (
                        <>
                            <Link href="/login">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 font-mono text-xs text-zinc-400 hover:text-white hover:bg-zinc-900 tracking-widest uppercase rounded-sm"
                                >
                                    Iniciar sesión
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button
                                    size="sm"
                                    className="h-8 bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold tracking-widest uppercase rounded-sm transition-all hover:shadow-[0_0_12px_rgba(52,211,153,0.3)]"
                                >
                                    Registro
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="outline-none group">
                                    <Avatar className="w-8 h-8 rounded-sm border border-zinc-700 group-hover:border-emerald-500/50 transition-colors cursor-pointer">
                                        <AvatarImage
                                            src={currentUser?.image ?? undefined}
                                            alt={currentUser?.name ?? "Usuario"}
                                        />
                                        <AvatarFallback className="bg-zinc-900 text-emerald-400 text-xs font-mono font-bold rounded-sm">
                                            {currentUser?.image ? (
                                                initials
                                            ) : (
                                                <User className="w-4 h-4 text-zinc-400" />
                                            )}
                                        </AvatarFallback>
                                    </Avatar>
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="end"
                                className="w-56 bg-zinc-900 border-zinc-800 rounded-sm p-1"
                            >
                                <DropdownMenuLabel className="px-3 py-2">
                                    <p className="text-xs font-mono font-bold text-white truncate">
                                        {currentUser?.name}
                                    </p>
                                    <p className="text-[10px] font-mono text-zinc-500 truncate mt-0.5">
                                        {currentUser?.email}
                                    </p>
                                    <Badge
                                        className={`mt-2 rounded-sm font-mono text-[9px] tracking-widest px-1.5 py-0 border ${
                                            isAdmin
                                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                                : "bg-zinc-800 text-zinc-400 border-zinc-700"
                                        }`}
                                    >
                                        {currentUser?.role ?? "USER"}
                                    </Badge>
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator className="bg-zinc-800 my-1" />

                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/profile"
                                        className="font-mono text-xs text-zinc-300 hover:text-white focus:text-white hover:bg-zinc-800 focus:bg-zinc-800 rounded-sm cursor-pointer px-3 py-2 flex items-center gap-2"
                                    >
                                        <User className="w-3.5 h-3.5 text-zinc-500" />
                                        Perfil
                                    </Link>
                                </DropdownMenuItem>

                                {isAdmin && (
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href="/dashboard"
                                            className="font-mono text-xs text-zinc-300 hover:text-white focus:text-white hover:bg-zinc-800 focus:bg-zinc-800 rounded-sm cursor-pointer px-3 py-2 flex items-center gap-2"
                                        >
                                            <LayoutGrid className="w-3.5 h-3.5 text-zinc-500" />
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                )}

                                <DropdownMenuSeparator className="bg-zinc-800 my-1" />

                                <DropdownMenuItem
                                    onClick={handleSignOut}
                                    className="font-mono text-xs text-red-400 hover:text-red-300 focus:text-red-300 hover:bg-red-500/10 focus:bg-red-500/10 rounded-sm cursor-pointer px-3 py-2 flex items-center gap-2"
                                >
                                    <svg
                                        className="w-3.5 h-3.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                        />
                                    </svg>
                                    Cerrar sesión
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>
        </header>
    );
};