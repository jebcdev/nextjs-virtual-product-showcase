"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    const [mounted, setMounted] = useState(false);
    const [glitch, setGlitch] = useState(false);
    const [dots, setDots] = useState(".");

    useEffect(() => {
        setMounted(true);

        // Glitch effect interval
        const glitchInterval = setInterval(() => {
            setGlitch(true);
            setTimeout(() => setGlitch(false), 150);
        }, 3000);

        // Dots animation
        const dotsInterval = setInterval(() => {
            setDots((prev) =>
                prev.length >= 3 ? "." : prev + "."
            );
        }, 500);

        return () => {
            clearInterval(glitchInterval);
            clearInterval(dotsInterval);
        };
    }, []);

    return (
        <div className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden">
            {/* Animated grid */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                    animation: "gridMove 20s linear infinite",
                }}
            />

            {/* Scan line */}
            <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                    background:
                        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
                    animation: "scanline 8s linear infinite",
                }}
            />

            {/* Glow orbs animados */}
            <div
                className="absolute w-96 h-96 rounded-full bg-emerald-500/8 blur-3xl pointer-events-none"
                style={{ animation: "orbFloat1 8s ease-in-out infinite" }}
            />
            <div
                className="absolute w-64 h-64 rounded-full bg-red-500/5 blur-3xl pointer-events-none"
                style={{ animation: "orbFloat2 12s ease-in-out infinite" }}
            />

            {/* Corner TL */}
            <div className="absolute top-6 left-6 flex items-center gap-2">
                <div
                    className="w-2 h-2 rounded-full bg-red-400"
                    style={{ animation: "pulse 1s ease-in-out infinite" }}
                />
                <span className="text-xs text-zinc-600 font-mono tracking-widest uppercase">
                    ERROR / 404
                </span>
            </div>

            {/* Corner TR */}
            <div className="absolute top-6 right-6 text-xs text-zinc-700 font-mono tracking-widest">
                JEBC-DeV v1.0.0
            </div>

            {/* Corner BL */}
            <div
                className="absolute bottom-6 left-6 text-xs text-zinc-700 font-mono"
                style={{ opacity: mounted ? 1 : 0, transition: "opacity 1s" }}
            >
                Buscando ruta{dots}
            </div>

            {/* Corner BR */}
            <div className="absolute bottom-6 right-6 flex items-center gap-1.5">
                <div
                    className="w-1.5 h-1.5 rounded-full bg-red-500"
                    style={{ animation: "pulse 0.8s ease-in-out infinite" }}
                />
                <span className="text-xs text-zinc-700 font-mono">LOST</span>
            </div>

            {/* Main content */}
            <div
                className="relative z-20 flex flex-col items-center text-center px-6"
                style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.8s ease, transform 0.8s ease",
                }}
            >
                {/* 404 glitch */}
                <div className="relative mb-6 select-none">
                    <span
                        className="text-[9rem] font-black leading-none text-white"
                        style={{
                            fontFamily: "'DM Serif Display', Georgia, serif",
                            letterSpacing: "-4px",
                            animation: "fadeInScale 0.8s ease forwards",
                        }}
                    >
                        404
                    </span>

                    {/* Glitch layers */}
                    {glitch && (
                        <>
                            <span
                                className="absolute inset-0 text-[9rem] font-black leading-none text-emerald-400"
                                style={{
                                    fontFamily: "'DM Serif Display', Georgia, serif",
                                    letterSpacing: "-4px",
                                    clipPath: "inset(20% 0 60% 0)",
                                    transform: "translate(-4px, 0)",
                                    opacity: 0.8,
                                }}
                            >
                                404
                            </span>
                            <span
                                className="absolute inset-0 text-[9rem] font-black leading-none text-red-400"
                                style={{
                                    fontFamily: "'DM Serif Display', Georgia, serif",
                                    letterSpacing: "-4px",
                                    clipPath: "inset(60% 0 10% 0)",
                                    transform: "translate(4px, 0)",
                                    opacity: 0.8,
                                }}
                            >
                                404
                            </span>
                        </>
                    )}
                </div>

                {/* Badge */}
                <div
                    className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-sm border border-zinc-800 bg-zinc-900/50"
                    style={{
                        animation: "fadeInUp 0.8s ease 0.2s both",
                    }}
                >
                    <div
                        className="w-1.5 h-1.5 rounded-full bg-red-400"
                        style={{ animation: "pulse 1s ease-in-out infinite" }}
                    />
                    <span className="text-xs font-mono text-zinc-400 tracking-widest uppercase">
                        Página no encontrada
                    </span>
                </div>

                {/* Mensaje */}
                <p
                    className="text-zinc-500 text-sm font-mono max-w-sm leading-relaxed mb-10"
                    style={{ animation: "fadeInUp 0.8s ease 0.4s both" }}
                >
                    La ruta que buscas no existe o fue movida.
                    <br />
                    Regresa al inicio para continuar.
                </p>

                {/* CTA */}
                <div style={{ animation: "fadeInUp 0.8s ease 0.6s both" }}>
                    <Link href="/">
                        <Button
                            className="h-11 px-8 bg-emerald-500 hover:bg-emerald-400 text-black font-bold
                                       font-mono text-sm tracking-widest uppercase rounded-sm transition-all
                                       hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] active:scale-[0.99]"
                        >
                            ← Volver al inicio
                        </Button>
                    </Link>
                </div>

                {/* Código de error decorativo */}
                <div
                    className="mt-12 font-mono text-xs text-zinc-800 text-left max-w-xs"
                    style={{ animation: "fadeInUp 0.8s ease 0.8s both" }}
                >
                    <span className="text-zinc-700">{">"}</span>{" "}
                    <span className="text-red-900">ERROR</span>{" "}
                    <span className="text-zinc-800">route not found</span>
                    <br />
                    <span className="text-zinc-700">{">"}</span>{" "}
                    <span className="text-zinc-800">status: 404</span>
                    <br />
                    <span className="text-zinc-700">{">"}</span>{" "}
                    <span className="text-emerald-900">suggestion: go home</span>
                    <span
                        className="inline-block w-2 h-3 bg-emerald-800 ml-1"
                        style={{ animation: "blink 1s step-end infinite" }}
                    />
                </div>
            </div>

            <style jsx>{`
                @keyframes gridMove {
                    0% { background-position: 0 0; }
                    100% { background-position: 40px 40px; }
                }
                @keyframes scanline {
                    0% { background-position: 0 0; }
                    100% { background-position: 0 100vh; }
                }
                @keyframes orbFloat1 {
                    0%, 100% { transform: translate(-30%, -40%); }
                    33% { transform: translate(-20%, -50%); }
                    66% { transform: translate(-40%, -35%); }
                }
                @keyframes orbFloat2 {
                    0%, 100% { transform: translate(60%, 50%); }
                    50% { transform: translate(70%, 40%); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeInScale {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
}