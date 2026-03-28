"use client";

import { cn } from "@/lib/utils";

interface LoadingProps {
    message?: string;
    className?: string;
}

export const Loading = ({ message = "Cargando", className }: LoadingProps) => {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center gap-6 py-20 w-full",
                className,
            )}
        >
            {/* Animated bars */}
            <div className="flex items-end gap-1" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                    <span
                        key={i}
                        className="w-0.5 bg-emerald-400 rounded-full animate-loading-bar"
                        style={{
                            animationDelay: `${i * 0.12}s`,
                        }}
                    />
                ))}
            </div>

            {/* Text */}
            <p className="text-[11px] font-mono tracking-[0.3em] uppercase text-zinc-500 animate-pulse">
                {message}
                <span className="animate-ellipsis" />
            </p>

            <style jsx>{`
                @keyframes loading-bar {
                    0%, 100% { height: 8px; opacity: 0.3; }
                    50% { height: 28px; opacity: 1; }
                }
                .animate-loading-bar {
                    animation: loading-bar 1s ease-in-out infinite;
                }
                @keyframes ellipsis {
                    0%   { content: ''; }
                    33%  { content: '.'; }
                    66%  { content: '..'; }
                    100% { content: '...'; }
                }
                .animate-ellipsis::after {
                    content: '';
                    animation: ellipsis 1.2s steps(1) infinite;
                }
            `}</style>
        </div>
    );
};