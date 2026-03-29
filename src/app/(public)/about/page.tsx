import type { Metadata } from "next";
import {
    generateTitle,
    generateDescription,
} from "@/lib/layout-metadata";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: generateTitle("Acerca de"),
        description: generateDescription(
            "Vitrina virtual: catálogo de productos con autenticación segura y panel administrativo",
        ),
    };
}

const stack = [
    {
        name: "Next.js 16",
        description: "App Router, Server Components, Server Actions",
        tag: "framework",
    },
    {
        name: "Better Auth",
        description: "Autenticación con roles (ADMIN, USER)",
        tag: "auth",
    },
    {
        name: "Prisma ORM",
        description: "Queries tipadas con SQLite para desarrollo",
        tag: "database",
    },
    {
        name: "Zod",
        description: "Validación de esquemas en cliente y servidor",
        tag: "validation",
    },
    {
        name: "React Hook Form",
        description: "Gestión eficiente de formularios",
        tag: "forms",
    },
    {
        name: "TanStack Query",
        description: "Sincronización de estado del servidor",
        tag: "state",
    },
    {
        name: "Tailwind CSS v4",
        description: "Estilizado utility-first y responsivo",
        tag: "styles",
    },
    {
        name: "shadcn/ui",
        description: "Componentes accesibles sobre Radix UI",
        tag: "ui",
    },
];

const features = [
    {
        icon: "▸",
        label: "Catálogo público con búsqueda y filtros",
    },
    { icon: "▸", label: "Autenticación segura (email + password)" },
    { icon: "▸", label: "Gestión de categorías y géneros" },
    { icon: "▸", label: "Panel administrativo privado" },
    { icon: "▸", label: "Perfiles de usuario con sesión" },
    {
        icon: "▸",
        label: "Validaciones robustas con Zod",
    },
    { icon: "▸", label: "UI moderna con dark theme" },
    { icon: "▸", label: "Totalmente tipado con TypeScript" },
];

const tagColors: Record<string, string> = {
    framework:
        "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    auth: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    database: "text-orange-400 border-orange-500/30 bg-orange-500/10",
    validation: "text-pink-400 border-pink-500/30 bg-pink-500/10",
    forms: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
    state: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    styles: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    ui: "text-violet-400 border-violet-500/30 bg-violet-500/10",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-black text-white px-6 py-16 max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-14">
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-sm border border-zinc-800 bg-zinc-900/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono text-zinc-400 tracking-widest uppercase">
                        Vitrina Virtual
                    </span>
                </div>

                <h1
                    className="text-5xl font-black tracking-tight leading-none mb-4"
                    style={{
                        fontFamily:
                            "'DM Serif Display', Georgia, serif",
                    }}
                >
                    Virtual
                    <span className="text-emerald-400">Shop</span>
                </h1>

                <p className="text-zinc-400 text-base leading-relaxed max-w-xl mt-4">
                    Vitrina de productos moderna construida con
                    Next.js. Autenticación segura, gestión
                    administrativa y catálogo público con búsqueda y
                    filtros.
                </p>

                <div className="flex items-center gap-4 mt-6">
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-xs font-mono text-zinc-500">
                            v0.1.0
                        </span>
                    </div>
                    <div className="w-px h-3 bg-zinc-800" />
                    <span className="text-xs font-mono text-zinc-500">
                        Next.js + Prisma
                    </span>
                </div>
            </div>

            {/* Propósito */}
            <section className="mb-14">
                <div className="flex items-center gap-3 mb-5">
                    <div className="h-px flex-1 bg-zinc-800" />
                    <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                        ¿Qué es?
                    </span>
                    <div className="h-px flex-1 bg-zinc-800" />
                </div>

                <div className="border border-zinc-800 rounded-sm p-6 bg-zinc-900/30">
                    <p className="text-zinc-300 text-sm leading-relaxed">
                        VirtualShop es una{" "}
                        <span className="text-white font-semibold">
                            vitrina de productos desarrollada con
                            Next.js 16
                        </span>
                        . Incluye un catálogo público donde los
                        usuarios pueden buscar productos por categoría
                        o género, un sistema de autenticación seguro y
                        un panel administrativo para gestionar
                        productos, categorías y géneros.
                    </p>
                    <p className="text-zinc-500 text-sm leading-relaxed mt-3">
                        Es una referencia de arquitectura full-stack
                        moderna mostrando patrones con Next.js, Server
                        Components, Server Actions, validación con Zod
                        y gestión de estado con TanStack Query.
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
                    VirtualShop · {new Date().getFullYear()}
                </span>
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-mono text-zinc-600">
                        Vitrina activa
                    </span>
                </div>
            </div>
        </main>
    );
}
