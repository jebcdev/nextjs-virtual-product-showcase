import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { generateTitle } from "@/lib/layout-metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: generateTitle("Inicio"),
        description:
            "Sistema de autenticación y autorización construido con Next.js. Rutas protegidas, control de acceso por roles y sesión segura.",
    };
}

const features = [
    {
        tag: "Auth",
        title: "Registro e inicio de sesión",
        description:
            "Flujo completo de identidad con validaciones en cliente y servidor, sesión persistente y redirección automática.",
    },
    {
        tag: "RBAC",
        title: "Control de acceso por roles",
        description:
            "Dos roles — administrador y usuario — con experiencias distintas aplicadas estructuralmente desde el servidor.",
    },
    {
        tag: "Rutas",
        title: "Protección por capas",
        description:
            "Rutas públicas, privadas y restringidas organizadas mediante layouts anidados de Next.js App Router.",
    },
    {
        tag: "Stack",
        title: "Tecnología moderna",
        description:
            "Next.js, Better Auth, Prisma, Tailwind CSS v4, shadcn/ui, React Hook Form y Zod trabajando juntos.",
    },
];

const stack = ["Next.js", "Better Auth", "Prisma", "SQLite", "Tailwind v4", "shadcn/ui", "TypeScript", "Zod"];

export default function HomePage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero */}
            <section className="relative overflow-hidden">
                {/* Grid bg */}
                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
                        `,
                        backgroundSize: "40px 40px",
                    }}
                />

                {/* Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-emerald-500/10 blur-[100px] pointer-events-none" />

                <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-24">
                    {/* Badge */}
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-zinc-800 bg-zinc-900/50">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-xs font-mono text-zinc-400 tracking-widest uppercase">
                                Proyecto educativo · Open Source
                            </span>
                        </div>
                    </div>

                    {/* Headline */}
                    <h1
                        className="text-center text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mb-8"
                        style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                    >
                        Auth.
                        <br />
                        <span className="text-emerald-400">Roles.</span>
                        <br />
                        <span className="text-zinc-600">Control.</span>
                    </h1>

                    <p className="text-center text-zinc-500 text-base font-mono max-w-lg mx-auto leading-relaxed mb-12">
                        Un sistema de autenticación y autorización construido desde cero con
                        Next.js. Rutas protegidas, sesión segura y control de acceso por roles —
                        sin magia, sin abstracciones innecesarias.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link href="/register">
                            <Button className="h-11 px-8 bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono text-sm tracking-widest uppercase rounded-sm transition-all hover:shadow-[0_0_20px_rgba(52,211,153,0.25)] active:scale-[0.99]">
                                Crear cuenta →
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button
                                variant="outline"
                                className="h-11 px-8 border-zinc-800 bg-transparent text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 hover:border-zinc-700 font-mono text-sm tracking-widest uppercase rounded-sm transition-all"
                            >
                                Iniciar sesión
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button
                                variant="ghost"
                                className="h-11 px-6 text-zinc-600 hover:text-zinc-300 font-mono text-sm tracking-widest uppercase rounded-sm transition-all"
                            >
                                Acerca del proyecto
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Línea divisora decorativa */}
                <div className="max-w-6xl mx-auto px-6">
                    <div className="h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent" />
                </div>
            </section>

            {/* Stack pills */}
            <section className="max-w-6xl mx-auto px-6 py-10">
                <div className="flex flex-wrap justify-center gap-2">
                    {stack.map((item) => (
                        <span
                            key={item}
                            className="px-3 py-1 rounded-sm border border-zinc-800 bg-zinc-900/40 text-zinc-500 text-xs font-mono tracking-wider"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </section>

            {/* Divider */}
            <div className="max-w-6xl mx-auto px-6">
                <div className="h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent" />
            </div>

            {/* Features */}
            <section className="max-w-6xl mx-auto px-6 py-20">
                <div className="flex items-center gap-3 mb-12">
                    <div className="h-px flex-1 bg-zinc-800" />
                    <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                        Qué incluye
                    </span>
                    <div className="h-px flex-1 bg-zinc-800" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className="group border border-zinc-800/60 rounded-sm bg-zinc-900/20 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all p-6"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm border bg-emerald-500/10 text-emerald-400 border-emerald-500/30 tracking-widest">
                                    {f.tag}
                                </span>
                            </div>
                            <h3
                                className="text-base font-black text-white mb-2 group-hover:text-emerald-400 transition-colors"
                                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                            >
                                {f.title}
                            </h3>
                            <p className="text-sm text-zinc-500 font-mono leading-relaxed">
                                {f.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Divider */}
            <div className="max-w-6xl mx-auto px-6">
                <div className="h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent" />
            </div>

            {/* CTA final */}
            <section className="max-w-6xl mx-auto px-6 py-24 text-center">
                <h2
                    className="text-4xl md:text-5xl font-black tracking-tight mb-4"
                    style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                    Listo para explorar
                    <span className="text-emerald-400">.</span>
                </h2>
                <p className="text-zinc-500 font-mono text-sm max-w-md mx-auto mb-10 leading-relaxed">
                    Regístrate para ver el sistema en acción o revisa el código para entender
                    cómo está construido.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link href="/register">
                        <Button className="h-11 px-8 bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono text-sm tracking-widest uppercase rounded-sm transition-all hover:shadow-[0_0_20px_rgba(52,211,153,0.25)] active:scale-[0.99]">
                            Empezar →
                        </Button>
                    </Link>
                    <Link href="/about">
                        <Button
                            variant="outline"
                            className="h-11 px-8 border-zinc-800 bg-transparent text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 hover:border-zinc-700 font-mono text-sm tracking-widest uppercase rounded-sm transition-all"
                        >
                            Leer más
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer mínimo */}
            <div className="max-w-6xl mx-auto px-6">
                <div className="h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent" />
            </div>
            <footer className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-700">
                    JEBC-DeV · {new Date().getFullYear()}
                </span>
                <div className="flex items-center gap-4">
                    <Link href="/about" className="text-xs font-mono text-zinc-700 hover:text-zinc-400 transition-colors">
                        Acerca de
                    </Link>
                    <Link href="/login" className="text-xs font-mono text-zinc-700 hover:text-zinc-400 transition-colors">
                        Acceso
                    </Link>
                </div>
            </footer>
        </div>
    );
}