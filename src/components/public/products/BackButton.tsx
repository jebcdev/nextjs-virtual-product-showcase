"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export const BackButton = () => {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 text-sm font-mono tracking-widest uppercase text-emerald-400 hover:text-emerald-300 transition-colors group"
        >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver
        </button>
    );
};
