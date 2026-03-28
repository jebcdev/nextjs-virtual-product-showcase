import { generateTitle } from "@/lib/layout-metadata";
import type { Metadata } from "next";
import { getSessionDetails } from "@/actions/auth/session-details";
import { redirect } from "next/navigation";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: generateTitle("Acceso"),
        description:
            "Inicia sesión o crea una nueva cuenta en JEBC-DeV",
    };
}

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { isAuthenticated } = await getSessionDetails();
    if (isAuthenticated) redirect("/");

    return (
        <div className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden">
            {/* Grid */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Glows */}
            <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

            {/* Top bar */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-2 group"
                >
                    <div className="w-2 h-2 rounded-full bg-emerald-400 group-hover:shadow-[0_0_8px_rgba(52,211,153,0.8)] transition-all" />
                    <span className="text-sm font-black text-white tracking-tight">
                        JEBC
                        <span className="text-emerald-400">-DeV</span>
                    </span>
                </Link>
                <span className="text-xs text-zinc-700 font-mono tracking-widest">
                    v1.0.0
                </span>
            </div>

            {/* Bottom bar */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <span className="text-xs text-zinc-700 font-mono">
                    Sistema de acceso seguro
                </span>
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-xs text-zinc-700 font-mono">
                        ONLINE
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-md px-4">
                {children}
            </div>
        </div>
    );
}
