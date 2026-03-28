"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, LayoutDashboard, LogOut, Settings } from "lucide-react";
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
    isAdmin: boolean;
    currentUser: IUser | null;
}

const userLinks = [
    { href: "/profile", label: "Perfil", icon: User },
];

const adminLinks = [
    { href: "/profile", label: "Perfil", icon: User },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export const PrivateHeader = ({ isAdmin, currentUser }: IProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const initials = currentUser?.name
        ? currentUser.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)
        : "U";

    const navLinks = isAdmin ? adminLinks : userLinks;

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
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 group-hover:shadow-[0_0_8px_rgba(52,211,153,0.8)] transition-all" />
                    <span
                        className="text-sm font-black text-white tracking-tight"
                        style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                    >
                        JEBC<span className="text-emerald-400">-DeV</span>
                    </span>
                </Link>

                {/* Nav */}
                <nav className="hidden sm:flex items-center gap-6">
                    {navLinks.map(({ href, label }) => {
                        const isActive = pathname === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`text-xs font-mono tracking-widest uppercase transition-colors ${
                                    isActive
                                        ? "text-emerald-400"
                                        : "text-zinc-500 hover:text-zinc-100"
                                }`}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Avatar dropdown */}
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
                        {/* Info */}
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

                        {/* Links dinámicos */}
                        {navLinks.map(({ href, label, icon: Icon }) => (
                            <DropdownMenuItem key={href} asChild>
                                <Link
                                    href={href}
                                    className="font-mono text-xs text-zinc-300 hover:text-white focus:text-white hover:bg-zinc-800 focus:bg-zinc-800 rounded-sm cursor-pointer px-3 py-2 flex items-center gap-2"
                                >
                                    <Icon className="w-3.5 h-3.5 text-zinc-500" />
                                    {label}
                                </Link>
                            </DropdownMenuItem>
                        ))}

                        <DropdownMenuSeparator className="bg-zinc-800 my-1" />

                        {/* Cerrar sesión */}
                        <DropdownMenuItem
                            onClick={handleSignOut}
                            className="font-mono text-xs text-red-400 hover:text-red-300 focus:text-red-300 hover:bg-red-500/10 focus:bg-red-500/10 rounded-sm cursor-pointer px-3 py-2 flex items-center gap-2"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            Cerrar sesión
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};