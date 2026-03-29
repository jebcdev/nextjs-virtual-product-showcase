"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
    User,
    ChevronDown,
    LayoutGrid,
    Venus,
    Menu,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { usePublicCategoriesQuery } from "@/queries/public/useCategoriesQuery";
import { usePublicGendersQuery } from "@/queries/public/useGendersQuery";
import { cn } from "@/lib/utils";

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
    const [mobileOpen, setMobileOpen] = useState(false);
    const [gendersOpen, setGendersOpen] = useState(false);
    const [categoriesOpen, setCategoriesOpen] = useState(false);

    const { data: categoriesData = [], isLoading: loadingCats } =
        usePublicCategoriesQuery();
    const { data: gendersData = [], isLoading: loadingGens } =
        usePublicGendersQuery();

    const isLoading = loadingCats || loadingGens;

    const featuredCategories = useMemo(() => {
        // Deterministic shuffle using seeded hash for purity
        const seededShuffle = (arr: typeof categoriesData) => {
            if (arr.length === 0) return [];

            // Use current date to seed - changes daily for rotation
            const seed = Math.floor(
                Date.now() / (1000 * 60 * 60 * 24),
            );
            const shuffled = [...arr];

            for (let i = shuffled.length - 1; i > 0; i--) {
                // Seeded pseudo-random (not cryptographically secure, but deterministic)
                const hash = ((seed + i) * 9301 + 49297) % 233280;
                const j = ((hash / 233280) * (i + 1)) | 0;
                [shuffled[i], shuffled[j]] = [
                    shuffled[j],
                    shuffled[i],
                ];
            }
            return shuffled;
        };

        return seededShuffle(categoriesData).slice(0, 5);
    }, [categoriesData]);

    const initials = useMemo(() => {
        if (!currentUser?.name) return "U";
        return currentUser.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    }, [currentUser]);

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.info("Sesión cerrada", {
                        description:
                            "Has cerrado sesión correctamente.",
                        action: {
                            label: "Entendido",
                            onClick: () => toast.dismiss(),
                        },
                    });
                    setMobileOpen(false);
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

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/90 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 group shrink-0"
                    >
                        <div className="w-2 h-2 rounded-full bg-emerald-400 group-hover:shadow-[0_0_8px_rgba(52,211,153,0.8)] transition-all" />
                        <span
                            className="text-sm font-black text-white tracking-tight"
                            style={{
                                fontFamily:
                                    "'DM Serif Display', Georgia, serif",
                            }}
                        >
                            JEBC
                            <span className="text-emerald-400">
                                -DeV
                            </span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        <Link
                            href="/"
                            className="px-3 py-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-100 tracking-widest uppercase transition-colors rounded-sm hover:bg-zinc-900"
                        >
                            Inicio
                        </Link>

                        {/* Géneros desktop */}
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
                                {isLoading ? (
                                    <DropdownMenuItem
                                        disabled
                                        className="font-mono text-xs text-zinc-600 px-3 py-2 animate-pulse"
                                    >
                                        Cargando...
                                    </DropdownMenuItem>
                                ) : (
                                    gendersData.map((gender) => (
                                        <DropdownMenuItem
                                            key={gender.id}
                                            asChild
                                        >
                                            <Link
                                                href={`/gender/${gender.slug}`}
                                                className="font-mono text-xs text-zinc-300 hover:text-white focus:text-white hover:bg-zinc-800 focus:bg-zinc-800 rounded-sm cursor-pointer px-3 py-2"
                                            >
                                                {gender.name}
                                            </Link>
                                        </DropdownMenuItem>
                                    ))
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Categorías desktop */}
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
                                {isLoading ? (
                                    <DropdownMenuItem
                                        disabled
                                        className="font-mono text-xs text-zinc-600 px-3 py-2 animate-pulse"
                                    >
                                        Cargando...
                                    </DropdownMenuItem>
                                ) : (
                                    featuredCategories.map(
                                        (category) => (
                                            <DropdownMenuItem
                                                key={category.id}
                                                asChild
                                            >
                                                <Link
                                                    href={`/category/${category.slug}`}
                                                    className="font-mono text-xs text-zinc-300 hover:text-white focus:text-white hover:bg-zinc-800 focus:bg-zinc-800 rounded-sm cursor-pointer px-3 py-2"
                                                >
                                                    {category.name}
                                                </Link>
                                            </DropdownMenuItem>
                                        ),
                                    )
                                )}
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
                    <div className="flex items-center gap-2">
                        {/* Auth — desktop */}
                        <div className="hidden md:flex items-center gap-2">
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
                                            className="h-8 bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold tracking-widest uppercase rounded-sm"
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
                                                    src={
                                                        currentUser?.image ??
                                                        undefined
                                                    }
                                                    alt={
                                                        currentUser?.name ??
                                                        "Usuario"
                                                    }
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
                                                className={`mt-2 rounded-sm font-mono text-[9px] tracking-widest px-1.5 py-0 border ${isAdmin ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : "bg-zinc-800 text-zinc-400 border-zinc-700"}`}
                                            >
                                                {currentUser?.role ??
                                                    "USER"}
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

                        {/* Hamburger — mobile */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-sm transition-colors"
                        >
                            {mobileOpen ? (
                                <X className="w-4 h-4" />
                            ) : (
                                <Menu className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Mobile drawer */}
            <div
                className={cn(
                    "fixed top-14 left-0 right-0 z-40 bg-zinc-950 border-b border-zinc-800 md:hidden transition-all duration-200 overflow-y-auto max-h-[calc(100vh-3.5rem)]",
                    mobileOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none",
                )}
            >
                <div className="flex flex-col p-4 gap-1">
                    <Link
                        href="/"
                        onClick={() => setMobileOpen(false)}
                        className="px-3 py-2.5 text-xs font-mono text-zinc-400 hover:text-white tracking-widest uppercase rounded-sm hover:bg-zinc-900 transition-colors"
                    >
                        Inicio
                    </Link>

                    {/* Géneros móvil */}
                    <div>
                        <button
                            onClick={() =>
                                setGendersOpen(!gendersOpen)
                            }
                            className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono text-zinc-400 hover:text-white tracking-widest uppercase rounded-sm hover:bg-zinc-900 transition-colors"
                        >
                            <span className="flex items-center gap-2">
                                <Venus className="w-3 h-3" />
                                Géneros
                            </span>
                            <ChevronDown
                                className={cn(
                                    "w-3 h-3 transition-transform",
                                    gendersOpen && "rotate-180",
                                )}
                            />
                        </button>
                        {gendersOpen && (
                            <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l border-zinc-800 pl-3">
                                <Link
                                    href="/genders"
                                    onClick={() =>
                                        setMobileOpen(false)
                                    }
                                    className="py-2 text-[11px] font-mono text-emerald-400 tracking-widest uppercase"
                                >
                                    Ver todos →
                                </Link>
                                {isLoading ? (
                                    <p className="py-2 text-[11px] font-mono text-zinc-600 animate-pulse">
                                        Cargando...
                                    </p>
                                ) : (
                                    gendersData.map((gender) => (
                                        <Link
                                            key={gender.id}
                                            href={`/gender/${gender.slug}`}
                                            onClick={() =>
                                                setMobileOpen(false)
                                            }
                                            className="py-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                                        >
                                            {gender.name}
                                        </Link>
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    {/* Categorías móvil */}
                    <div>
                        <button
                            onClick={() =>
                                setCategoriesOpen(!categoriesOpen)
                            }
                            className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono text-zinc-400 hover:text-white tracking-widest uppercase rounded-sm hover:bg-zinc-900 transition-colors"
                        >
                            <span className="flex items-center gap-2">
                                <LayoutGrid className="w-3 h-3" />
                                Categorías
                            </span>
                            <ChevronDown
                                className={cn(
                                    "w-3 h-3 transition-transform",
                                    categoriesOpen && "rotate-180",
                                )}
                            />
                        </button>
                        {categoriesOpen && (
                            <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l border-zinc-800 pl-3">
                                <Link
                                    href="/categories"
                                    onClick={() =>
                                        setMobileOpen(false)
                                    }
                                    className="py-2 text-[11px] font-mono text-emerald-400 tracking-widest uppercase"
                                >
                                    Ver todas →
                                </Link>
                                {isLoading ? (
                                    <p className="py-2 text-[11px] font-mono text-zinc-600 animate-pulse">
                                        Cargando...
                                    </p>
                                ) : (
                                    featuredCategories.map(
                                        (category) => (
                                            <Link
                                                key={category.id}
                                                href={`/category/${category.slug}`}
                                                onClick={() =>
                                                    setMobileOpen(
                                                        false,
                                                    )
                                                }
                                                className="py-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                                            >
                                                {category.name}
                                            </Link>
                                        ),
                                    )
                                )}
                            </div>
                        )}
                    </div>

                    <Link
                        href="/about"
                        onClick={() => setMobileOpen(false)}
                        className="px-3 py-2.5 text-xs font-mono text-zinc-400 hover:text-white tracking-widest uppercase rounded-sm hover:bg-zinc-900 transition-colors"
                    >
                        Acerca de
                    </Link>

                    <div className="border-t border-zinc-800 my-2" />

                    {/* Auth móvil */}
                    {!isAuthenticated ? (
                        <div className="flex flex-col gap-2">
                            <Link
                                href="/login"
                                onClick={() => setMobileOpen(false)}
                            >
                                <Button
                                    variant="ghost"
                                    className="w-full h-10 font-mono text-xs text-zinc-400 hover:text-white hover:bg-zinc-900 tracking-widest uppercase rounded-sm"
                                >
                                    Iniciar sesión
                                </Button>
                            </Link>
                            <Link
                                href="/register"
                                onClick={() => setMobileOpen(false)}
                            >
                                <Button className="w-full h-10 bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold tracking-widest uppercase rounded-sm">
                                    Registro
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-3 px-3 py-3 bg-zinc-900 rounded-sm">
                                <Avatar className="w-8 h-8 rounded-sm border border-zinc-700 shrink-0">
                                    <AvatarImage
                                        src={
                                            currentUser?.image ??
                                            undefined
                                        }
                                    />
                                    <AvatarFallback className="bg-zinc-800 text-emerald-400 text-xs font-mono font-bold rounded-sm">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col min-w-0">
                                    <p className="text-xs font-mono font-bold text-white truncate">
                                        {currentUser?.name}
                                    </p>
                                    <p className="text-[10px] font-mono text-zinc-500 truncate">
                                        {currentUser?.email}
                                    </p>
                                </div>
                                <Badge
                                    className={`shrink-0 rounded-sm font-mono text-[9px] tracking-widest px-1.5 py-0 border ${isAdmin ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : "bg-zinc-800 text-zinc-400 border-zinc-700"}`}
                                >
                                    {currentUser?.role ?? "USER"}
                                </Badge>
                            </div>
                            <Link
                                href="/profile"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-2 px-3 py-2.5 text-xs font-mono text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-sm transition-colors"
                            >
                                <User className="w-3.5 h-3.5" />
                                Perfil
                            </Link>
                            {isAdmin && (
                                <Link
                                    href="/dashboard"
                                    onClick={() =>
                                        setMobileOpen(false)
                                    }
                                    className="flex items-center gap-2 px-3 py-2.5 text-xs font-mono text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-sm transition-colors"
                                >
                                    <LayoutGrid className="w-3.5 h-3.5" />
                                    Dashboard
                                </Link>
                            )}
                            <button
                                onClick={handleSignOut}
                                className="flex items-center gap-2 px-3 py-2.5 text-xs font-mono text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-sm transition-colors"
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
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
