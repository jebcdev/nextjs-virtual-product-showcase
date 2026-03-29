"use client";

import { useState } from "react";
import Image from "next/image";
import { Package, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface IProductImageGalleryProps {
    images: string[];
    productName: string;
}

export const ProductImageGallery = ({
    images,
    productName,
}: IProductImageGalleryProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const currentImage = images[currentImageIndex] ?? null;
    const hasMultiple = images.length > 1;

    const handlePrevious = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1,
        );
    };

    const handleNext = () => {
        setCurrentImageIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1,
        );
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Main image */}
            <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-zinc-700 bg-zinc-900/50 group">
                {currentImage ? (
                    <>
                        <Image
                            src={currentImage}
                            alt={productName}
                            fill
                            className="object-cover"
                            priority
                        />
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-2 text-zinc-600">
                        <Package className="w-12 h-12" />
                        <span className="text-sm font-mono tracking-widest uppercase">
                            Sin imagen
                        </span>
                    </div>
                )}

                {/* Navigation arrows */}
                {hasMultiple && (
                    <>
                        <button
                            onClick={handlePrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-emerald-400 transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
                            aria-label="Imagen anterior"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-emerald-400 transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
                            aria-label="Siguiente imagen"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Image counter */}
                        <div className="absolute bottom-4 right-4 px-3 py-1 rounded-lg bg-zinc-900/80 text-[11px] font-mono tracking-widest text-zinc-400">
                            {currentImageIndex + 1} / {images.length}
                        </div>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {hasMultiple && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={cn(
                                "relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300",
                                currentImageIndex === idx
                                    ? "border-emerald-500"
                                    : "border-zinc-700 hover:border-zinc-600",
                            )}
                        >
                            <Image
                                src={img}
                                alt={`${productName} - imagen ${idx + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
