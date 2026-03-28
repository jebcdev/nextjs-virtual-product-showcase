import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { generateTitle } from "@/lib/layout-metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: generateTitle("Vitrina de Productos"),
        description:
            "Explora nuestro catálogo de productos, descubre ofertas especiales y gestiona tu carrito de compras de forma segura.",
    };
}

const features = [
    {
        tag: "Catálogo",
        title: "Amplio catálogo de productos",
        description:
            "Explora miles de productos organizados por categorías con búsqueda avanzada, filtros y clasificación inteligente.",
    },
    {
        tag: "Carrito",
        title: "Carrito de compras inteligente",
        description:
            "Gestiona tu carrito de compras con vista previa de productos, cálculo automático de totales y persistencia de datos.",
    },
    {
        tag: "Seguridad",
        title: "Compras seguras",
        description:
            "Autenticación robusta, encriptación de datos y control de acceso basado en roles para tu protección.",
    },
    {
        tag: "Rendimiento",
        title: "Experiencia ultra rápida",
        description:
            "Server Components, optimización de imágenes y caché inteligente para carga instantánea de productos.",
    },
];

const stack = [
    "Next.js 16",
    "Better Auth",
    "Prisma",
    "Tailwind CSS v4",
    "shadcn/ui",
    "React Query",
    "TypeScript",
    "Zod",
];

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
                                Vitrina virtual · Compra en línea
                            </span>
                        </div>
                    </div>

                    {/* Headline */}
                    <h1
                        className="text-center text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mb-8"
                        style={{
                            fontFamily:
                                "'DM Serif Display', Georgia, serif",
                        }}
                    >
                        Tienda.
                        <br />
                        <span className="text-emerald-400">
                            Productos.
                        </span>
                        <br />
                        <span className="text-zinc-600">Envíos.</span>
                    </h1>

                    <p className="text-center text-zinc-500 text-base font-mono max-w-lg mx-auto leading-relaxed mb-12">
                        La mejor experiencia de compra en línea.
                        Explora nuestro catálogo de productos,
                        gestiona tu carrito y realiza compras seguras.
                        Panel administrativo completo para gestionar
                        tu tienda.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link href="/register">
                            <Button className="h-11 px-8 bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono text-sm tracking-widest uppercase rounded-sm transition-all hover:shadow-[0_0_20px_rgba(52,211,153,0.25)] active:scale-[0.99]">
                                Compra ahora →
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button
                                variant="outline"
                                className="h-11 px-8 border-zinc-800 bg-transparent text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 hover:border-zinc-700 font-mono text-sm tracking-widest uppercase rounded-sm transition-all"
                            >
                                Mi cuenta
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button
                                variant="ghost"
                                className="h-11 px-6 text-zinc-600 hover:text-zinc-300 font-mono text-sm tracking-widest uppercase rounded-sm transition-all"
                            >
                                Sobre nosotros
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
                        Características principales
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
                                style={{
                                    fontFamily:
                                        "'DM Serif Display', Georgia, serif",
                                }}
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
                    style={{
                        fontFamily:
                            "'DM Serif Display', Georgia, serif",
                    }}
                >
                    Comienza a comprar
                    <span className="text-emerald-400">.</span>
                </h2>
                <p className="text-zinc-500 font-mono text-sm max-w-md mx-auto mb-10 leading-relaxed">
                    Crea tu cuenta hoy y accede a miles de productos.
                    Compra segura, envíos rápidos y excelente servicio
                    al cliente.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link href="/register">
                        <Button className="h-11 px-8 bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono text-sm tracking-widest uppercase rounded-sm transition-all hover:shadow-[0_0_20px_rgba(52,211,153,0.25)] active:scale-[0.99]">
                            Registrar →
                        </Button>
                    </Link>
                    <Link href="/about">
                        <Button
                            variant="outline"
                            className="h-11 px-8 border-zinc-800 bg-transparent text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 hover:border-zinc-700 font-mono text-sm tracking-widest uppercase rounded-sm transition-all"
                        >
                            Más información
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
                    VirtualShop · {new Date().getFullYear()}
                </span>
                <div className="flex items-center gap-4">
                    <Link
                        href="/about"
                        className="text-xs font-mono text-zinc-700 hover:text-zinc-400 transition-colors"
                    >
                        Catálogo
                    </Link>
                    <Link
                        href="/login"
                        className="text-xs font-mono text-zinc-700 hover:text-zinc-400 transition-colors"
                    >
                        Cuenta
                    </Link>
                </div>
            </footer>
        </div>
    );
}
