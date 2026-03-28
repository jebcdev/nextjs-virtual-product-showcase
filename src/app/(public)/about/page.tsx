import type { Metadata } from "next";
import {
    generateTitle,
    generateDescription,
} from "@/lib/layout-metadata";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: generateTitle("Acerca de"),
        description: generateDescription(
            "Arquitectura limpia de autenticación con Next.js, roles y rutas protegidas",
        ),
    };
}

const stack = [
    {
        name: "Next.js 16",
        description:
            "App Router, Server Components, layouts anidados",
        tag: "framework",
    },
    {
        name: "Better Auth",
        description:
            "Autenticación moderna con soporte de sesiones y roles",
        tag: "auth",
    },
    {
        name: "Prisma + SQLite",
        description: "ORM type-safe con adaptador better-sqlite3",
        tag: "database",
    },
    {
        name: "Tailwind CSS v4",
        description: "Utilidades CSS con design system coherente",
        tag: "styles",
    },
    {
        name: "shadcn/ui",
        description:
            "Componentes accesibles construidos sobre Radix UI",
        tag: "ui",
    },
    {
        name: "React Hook Form",
        description:
            "Formularios con validación Zod sin re-renders innecesarios",
        tag: "forms",
    },
    {
        name: "TypeScript",
        description: "Tipado estático en todo el proyecto",
        tag: "language",
    },
    {
        name: "Sonner",
        description: "Toast notifications con estilo y control total",
        tag: "ux",
    },
];

const features = [
    { icon: "▸", label: "Rutas públicas y privadas" },
    { icon: "▸", label: "Control de acceso por roles (RBAC)" },
    { icon: "▸", label: "Sesión persistente con cookies seguras" },
    { icon: "▸", label: "Layouts anidados por sección" },
    { icon: "▸", label: "Server Actions y Server Components" },
    {
        icon: "▸",
        label: "Validaciones con Zod en cliente y servidor",
    },
    { icon: "▸", label: "Seed de usuarios iniciales vía API Route" },
    { icon: "▸", label: "Metadata dinámica por página" },
];

const tagColors: Record<string, string> = {
    framework:
        "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    auth: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    database: "text-orange-400 border-orange-500/30 bg-orange-500/10",
    styles: "text-pink-400 border-pink-500/30 bg-pink-500/10",
    ui: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    forms: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
    language: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    ux: "text-zinc-300 border-zinc-600 bg-zinc-800",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-black text-white px-6 py-16 max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-14">
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-sm border border-zinc-800 bg-zinc-900/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono text-zinc-400 tracking-widest uppercase">
                        Acerca del proyecto
                    </span>
                </div>

                <h1
                    className="text-5xl font-black tracking-tight leading-none mb-4"
                    style={{
                        fontFamily:
                            "'DM Serif Display', Georgia, serif",
                    }}
                >
                    JEBC
                    <span className="text-emerald-400">-DeV</span>
                </h1>

                <p className="text-zinc-400 text-base leading-relaxed max-w-xl mt-4">
                    Proyecto educativo enfocado en construir una base
                    sólida para aplicaciones Next.js con autenticación
                    real, rutas protegidas y control de acceso por
                    roles — sin magia, sin abstracciones innecesarias.
                </p>

                <div className="flex items-center gap-4 mt-6">
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-xs font-mono text-zinc-500">
                            v1.0.0
                        </span>
                    </div>
                    <div className="w-px h-3 bg-zinc-800" />
                    <span className="text-xs font-mono text-zinc-500">
                        Educativo · Open Source
                    </span>
                    <div className="w-px h-3 bg-zinc-800" />
                    <span className="text-xs font-mono text-zinc-500">
                        por JEBC
                    </span>
                </div>
            </div>

            {/* Propósito */}
            <section className="mb-14">
                <div className="flex items-center gap-3 mb-5">
                    <div className="h-px flex-1 bg-zinc-800" />
                    <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                        Propósito
                    </span>
                    <div className="h-px flex-1 bg-zinc-800" />
                </div>

                <div className="border border-zinc-800 rounded-sm p-6 bg-zinc-900/30">
                    <p className="text-zinc-300 text-sm leading-relaxed">
                        Este proyecto nace como una{" "}
                        <span className="text-white font-semibold">
                            plantilla de referencia
                        </span>{" "}
                        para entender cómo estructurar una aplicación
                        Next.js moderna desde cero. Cubre los patrones
                        más comunes en proyectos reales:
                        autenticación, autorización por roles,
                        protección de rutas, manejo de sesión y
                        organización del código.
                    </p>
                    <p className="text-zinc-500 text-sm leading-relaxed mt-3">
                        No es una plantilla para copiar y pegar — es
                        una arquitectura para entender, modificar y
                        escalar.
                    </p>
                </div>
            </section>

            {/* Features */}
            <section className="mb-14">
                <div className="flex items-center gap-3 mb-5">
                    <div className="h-px flex-1 bg-zinc-800" />
                    <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                        Características
                    </span>
                    <div className="h-px flex-1 bg-zinc-800" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 px-4 py-3 border border-zinc-800/60 rounded-sm bg-zinc-900/20 hover:border-zinc-700 transition-colors"
                        >
                            <span className="text-emerald-500 font-mono text-xs">
                                {f.icon}
                            </span>
                            <span className="text-zinc-300 text-sm font-mono">
                                {f.label}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Stack */}
            <section className="mb-14">
                <div className="flex items-center gap-3 mb-5">
                    <div className="h-px flex-1 bg-zinc-800" />
                    <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                        Stack tecnológico
                    </span>
                    <div className="h-px flex-1 bg-zinc-800" />
                </div>

                <div className="space-y-2">
                    {stack.map((item, i) => (
                        <div
                            key={i}
                            className="flex items-start gap-4 px-5 py-4 border border-zinc-800/60 rounded-sm bg-zinc-900/20 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all group"
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-mono font-bold text-white group-hover:text-emerald-400 transition-colors">
                                        {item.name}
                                    </span>
                                    <span
                                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded-sm border ${tagColors[item.tag]}`}
                                    >
                                        {item.tag}
                                    </span>
                                </div>
                                <p className="text-xs text-zinc-500 font-mono leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer del about */}
            <div className="border-t border-zinc-800 pt-8 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-700">
                    JEBC-DeV · {new Date().getFullYear()}
                </span>
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-mono text-zinc-600">
                        Sistema activo
                    </span>
                </div>
            </div>
        </main>
    );
}
