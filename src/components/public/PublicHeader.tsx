"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
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

const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/about", label: "Acerca de" },
];

export const PublicHeader = ({
    isAuthenticated,
    isAdmin,
    currentUser,
}: IProps) => {
    const router = useRouter();

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

    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/80 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 group"
                >
                    <div className="w-2 h-2 rounded-full bg-emerald-400 group-hover:shadow-[0_0_8px_rgba(52,211,153,0.8)] transition-all" />
                    <span
                        className="text-sm font-black text-white tracking-tight"
                        style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                    >
                        JEBC<span className="text-emerald-400">-DeV</span>
                    </span>
                </Link>

                {/* Nav links */}
                <nav className="hidden sm:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-xs font-mono text-zinc-500 hover:text-zinc-100 tracking-widest uppercase transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
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
                                            {currentUser?.image ? initials : (
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
                                {/* User info */}
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

                                {/* Perfil — siempre visible */}
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/profile"
                                        className="font-mono text-xs text-zinc-300 hover:text-white focus:text-white hover:bg-zinc-800 focus:bg-zinc-800 rounded-sm cursor-pointer px-3 py-2 flex items-center gap-2"
                                    >
                                        <User className="w-3.5 h-3.5 text-zinc-500" />
                                        Perfil
                                    </Link>
                                </DropdownMenuItem>

                                {/* Dashboard — solo admin */}
                                {isAdmin && (
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href="/dashboard"
                                            className="font-mono text-xs text-zinc-300 hover:text-white focus:text-white hover:bg-zinc-800 focus:bg-zinc-800 rounded-sm cursor-pointer px-3 py-2 flex items-center gap-2"
                                        >
                                            <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                                            </svg>
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                )}

                                <DropdownMenuSeparator className="bg-zinc-800 my-1" />

                                {/* Cerrar sesión */}
                                <DropdownMenuItem
                                    onClick={handleSignOut}
                                    className="font-mono text-xs text-red-400 hover:text-red-300 focus:text-red-300 hover:bg-red-500/10 focus:bg-red-500/10 rounded-sm cursor-pointer px-3 py-2 flex items-center gap-2"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
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