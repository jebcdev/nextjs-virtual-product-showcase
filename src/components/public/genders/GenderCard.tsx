"use client";

import Link from "next/link";
import { Gender } from "@/generated/prisma/client";
import { ChevronRight } from "lucide-react";

interface IGenderCardProps {
    gender: Gender;
}

export const GenderCard = ({ gender }: IGenderCardProps) => {
    return (
        <Link href={`/gender/${gender.slug}`}>
            <div className="group relative h-full overflow-hidden rounded-lg bg-linear-to-br from-zinc-900 to-zinc-800 border border-zinc-700 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 cursor-pointer">
                {/* Hover overlay effect */}
                <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors duration-300" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-4 sm:p-6">
                    {/* Top section - Name and count */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors duration-300 capitalize truncate">
                            {gender.name}
                        </h3>
                        {gender.description && (
                            <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 group-hover:text-zinc-300 transition-colors duration-300">
                                {gender.description}
                            </p>
                        )}
                    </div>

                    {/* Bottom section - CTA */}
                    <div className="flex items-center justify-between pt-4 gap-2">
                        <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-zinc-500 group-hover:text-emerald-400/70 transition-colors duration-300">
                            Ver productos
                        </span>
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-500 group-hover:text-emerald-400 transform group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                </div>
            </div>
        </Link>
    );
};
