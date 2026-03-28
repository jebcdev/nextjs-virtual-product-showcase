"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    BarChart3,
    Settings,
    FileText,
    ShieldCheck,
    LogOut,
    ChevronLeft,
    Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Usuarios",
        href: "/dashboard",
        icon: Users,
    },
    {
        label: "Analíticas",
        href: "/dashboard",
        icon: BarChart3,
    },
    {
        label: "Reportes",
        href: "/dashboard",
        icon: FileText,
    },
    {
        label: "Permisos",
        href: "/dashboard",
        icon: ShieldCheck,
    },
    {
        label: "Configuración",
        href: "/dashboard",
        icon: Settings,
    },
];

export const DashboardSideBar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

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

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div
                className={cn(
                    "flex items-center h-14 px-4 border-b border-zinc-800 shrink-0",
                    collapsed ? "justify-center" : "justify-between",
                )}
            >
                {!collapsed && (
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 group-hover:shadow-[0_0_8px_rgba(52,211,153,0.8)] transition-all shrink-0" />
                        <span
                            className="text-sm font-black text-white tracking-tight"
                            style={{
                                fontFamily: "'DM Serif Display', Georgia, serif",
                            }}
                        >
                            JEBC<span className="text-emerald-400">-DeV</span>
                        </span>
                    </Link>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-7 h-7 text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 rounded-sm hidden md:flex"
                >
                    <ChevronLeft
                        className={cn(
                            "w-4 h-4 transition-transform duration-300",
                            collapsed && "rotate-180",
                        )}
                    />
                </Button>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
                <TooltipProvider delayDuration={0}>
                    {navItems.map(({ label, href, icon: Icon }) => {
                        const isActive = pathname === href;
                        return (
                            <Tooltip key={label} disableHoverableContent={!collapsed}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={href}
                                        onClick={() => setMobileOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2 rounded-sm text-xs font-mono tracking-widest uppercase transition-all group",
                                            isActive
                                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                : "text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800/60 border border-transparent",
                                            collapsed && "justify-center px-2",
                                        )}
                                    >
                                        <Icon
                                            className={cn(
                                                "shrink-0 transition-colors",
                                                collapsed ? "w-5 h-5" : "w-4 h-4",
                                                isActive
                                                    ? "text-emerald-400"
                                                    : "text-zinc-600 group-hover:text-zinc-300",
                                            )}
                                        />
                                        {!collapsed && <span>{label}</span>}
                                    </Link>
                                </TooltipTrigger>
                                {collapsed && (
                                    <TooltipContent
                                        side="right"
                                        className="bg-zinc-900 border-zinc-800 text-zinc-300 font-mono text-xs rounded-sm"
                                    >
                                        {label}
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        );
                    })}
                </TooltipProvider>
            </nav>

            {/* Footer — cerrar sesión */}
            <div className="shrink-0 px-2 pb-4">
                <Separator className="bg-zinc-800 mb-3" />
                <TooltipProvider delayDuration={0}>
                    <Tooltip disableHoverableContent={!collapsed}>
                        <TooltipTrigger asChild>
                            <button
                                onClick={handleSignOut}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-2 rounded-sm text-xs font-mono tracking-widest uppercase transition-all border border-transparent",
                                    "text-red-500/70 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20",
                                    collapsed && "justify-center px-2",
                                )}
                            >
                                <LogOut
                                    className={cn(
                                        "shrink-0",
                                        collapsed ? "w-5 h-5" : "w-4 h-4",
                                    )}
                                />
                                {!collapsed && <span>Cerrar sesión</span>}
                            </button>
                        </TooltipTrigger>
                        {collapsed && (
                            <TooltipContent
                                side="right"
                                className="bg-zinc-900 border-zinc-800 text-red-400 font-mono text-xs rounded-sm"
                            >
                                Cerrar sesión
                            </TooltipContent>
                        )}
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile trigger */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(true)}
                className="fixed top-4 left-4 z-50 md:hidden w-8 h-8 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 rounded-sm"
            >
                <Menu className="w-4 h-4" />
            </Button>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/70 md:hidden backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Mobile drawer */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-60 bg-black border-r border-zinc-800 md:hidden transition-transform duration-300",
                    mobileOpen ? "translate-x-0" : "-translate-x-full",
                )}
            >
                <SidebarContent />
            </aside>

            {/* Desktop sidebar */}
            <aside
                className={cn(
                    "hidden md:flex flex-col h-screen sticky top-0 bg-black border-r border-zinc-800 transition-all duration-300 shrink-0",
                    collapsed ? "w-16" : "w-56",
                )}
            >
                <SidebarContent />
            </aside>
        </>
    );
};