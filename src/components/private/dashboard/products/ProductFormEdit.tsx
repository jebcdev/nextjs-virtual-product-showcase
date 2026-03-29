"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    CreateProductSchema,
    TUpdateProductData,
    type TCreateProductData,
} from "@/validations/dashboard/products";
import { updateDashboardProductById } from "@/actions/dashboard/products/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { SingleFormError } from "@/components/ui";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";
import { slugify } from "@/lib/slugify";
import { Category, Gender, Product } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";

interface IProps {
    product: Product & { categories: Category[]; genders: Gender[] };
    categories: Category[];
    genders: Gender[];
}

export const DashboardProductFormEdit = ({
    product,
    categories,
    genders,
}: IProps) => {
    const router = useRouter();
    const parsedImages: string[] = JSON.parse(product.images || "[]");
    const [previews, setPreviews] = useState<string[]>(parsedImages);
    const [uploading, setUploading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<TCreateProductData>({
        resolver: zodResolver(CreateProductSchema),
        mode: "onBlur",
        defaultValues: {
            name: product.name,
            slug: product.slug,
            description: product.description ?? undefined,
            price: product.price,
            stock: product.stock,
            images: parsedImages,
            isActive: product.isActive,
            isFeatured: product.isFeatured,
            categoryIds: product.categories.map((c) => c.id),
            genderIds: product.genders.map((g) => g.id),
        },
    });

    const isActive = watch("isActive");
    const isFeatured = watch("isFeatured");
    const selectedCategoryIds = watch("categoryIds");
    const selectedGenderIds = watch("genderIds");

    const handleNameChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setValue("slug", slugify(e.target.value), {
            shouldValidate: true,
        });
    };

    const handleImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const localUrl = URL.createObjectURL(file);
        setPreviews((prev) => [...prev, localUrl]);

        try {
            setUploading(true);
            const url = await uploadToCloudinary(file);
            const current = watch("images") ?? [];
            setValue("images", [...current, url], {
                shouldValidate: true,
            });
            toast.success("Imagen subida correctamente");
        } catch {
            toast.error("Error al subir la imagen");
            setPreviews((prev) => prev.filter((p) => p !== localUrl));
        } finally {
            setUploading(false);
        }
    };

    const handleRemoveImage = (index: number) => {
        const current = watch("images") ?? [];
        setValue(
            "images",
            current.filter((_, i) => i !== index),
            { shouldValidate: true },
        );
        setPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const toggleCategory = (id: string) => {
        const current = watch("categoryIds") ?? [];
        setValue(
            "categoryIds",
            current.includes(id)
                ? current.filter((c) => c !== id)
                : [...current, id],
            { shouldValidate: true },
        );
    };

    const toggleGender = (id: string) => {
        const current = watch("genderIds") ?? [];
        setValue(
            "genderIds",
            current.includes(id)
                ? current.filter((g) => g !== id)
                : [...current, id],
            { shouldValidate: true },
        );
    };

    const onSubmit = async (data: TCreateProductData) => {
        const response = await updateDashboardProductById(
            product.id,
            data as TUpdateProductData,
        );

        if (!response.success) {
            toast.error("Error al actualizar el producto", {
                description: response.message,
                action: {
                    label: "Entendido",
                    onClick: () => toast.dismiss(),
                },
            });
            return;
        }

        toast.success("Producto actualizado correctamente", {
            description: response.message,
            action: {
                label: "Entendido",
                onClick: () => toast.dismiss(),
            },
        });

        router.push("/dashboard/products");
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 py-6"
        >
            {/* Images */}
            <div className="space-y-2">
                <Label className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                    Imágenes
                </Label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {previews.map((src, i) => (
                        <div
                            key={i}
                            className="relative h-32 rounded-sm overflow-hidden border border-zinc-800 group"
                        >
                            <Image
                                src={src}
                                alt={`preview-${i}`}
                                fill
                                className="object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(i)}
                                className="absolute top-1.5 right-1.5 h-6 w-6 flex items-center justify-center bg-zinc-900/80 border border-zinc-700 text-zinc-400 hover:text-red-400 hover:border-red-900/40 rounded-sm opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))}

                    <label className="flex flex-col items-center justify-center gap-2 h-32 border border-dashed border-zinc-800 rounded-sm cursor-pointer hover:border-zinc-600 hover:bg-zinc-900/50 transition-all">
                        <ImagePlus className="w-5 h-5 text-zinc-600" />
                        <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-600">
                            {uploading ? "Subiendo..." : "Agregar"}
                        </span>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                            disabled={uploading}
                        />
                    </label>
                </div>

                {errors.images && (
                    <SingleFormError
                        message={errors.images.message}
                    />
                )}
            </div>

            {/* Name */}
            <div className="space-y-2">
                <Label
                    htmlFor="name"
                    className="text-xs font-mono text-zinc-400 uppercase tracking-widest"
                >
                    Nombre
                </Label>
                <Input
                    id="name"
                    type="text"
                    placeholder="Ej: Camiseta Oversize"
                    className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-emerald-500 rounded-sm h-11 font-mono text-sm transition-colors"
                    {...register("name", {
                        onChange: handleNameChange,
                    })}
                />
                {errors.name && (
                    <SingleFormError message={errors.name.message} />
                )}
            </div>

            {/* Slug */}
            <div className="space-y-2">
                <Label
                    htmlFor="slug"
                    className="text-xs font-mono text-zinc-400 uppercase tracking-widest"
                >
                    Slug
                </Label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 font-mono text-sm pointer-events-none">
                        /
                    </span>
                    <Input
                        id="slug"
                        type="text"
                        disabled
                        className="pl-6 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 rounded-sm h-11 font-mono text-sm"
                        {...register("slug")}
                    />
                </div>
                {errors.slug && (
                    <SingleFormError message={errors.slug.message} />
                )}
            </div>

            {/* Description */}
            <div className="space-y-2">
                <Label
                    htmlFor="description"
                    className="text-xs font-mono text-zinc-400 uppercase tracking-widest"
                >
                    Descripción{" "}
                    <span className="text-zinc-600 normal-case tracking-normal">
                        (opcional)
                    </span>
                </Label>
                <Textarea
                    id="description"
                    placeholder="Describe brevemente este producto..."
                    rows={3}
                    className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-emerald-500 rounded-sm font-mono text-sm transition-colors resize-none"
                    {...register("description")}
                />
                {errors.description && (
                    <SingleFormError
                        message={errors.description.message}
                    />
                )}
            </div>

            {/* Price + Stock */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label
                        htmlFor="price"
                        className="text-xs font-mono text-zinc-400 uppercase tracking-widest"
                    >
                        Precio
                    </Label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 font-mono text-sm pointer-events-none">
                            $
                        </span>
                        <Input
                            id="price"
                            type="number"
                            step="0.01"
                            min="0"
                            className="pl-6 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-emerald-500 rounded-sm h-11 font-mono text-sm transition-colors"
                            {...register("price", {
                                valueAsNumber: true,
                            })}
                        />
                    </div>
                    {errors.price && (
                        <SingleFormError
                            message={errors.price.message}
                        />
                    )}
                </div>

                <div className="space-y-2">
                    <Label
                        htmlFor="stock"
                        className="text-xs font-mono text-zinc-400 uppercase tracking-widest"
                    >
                        Stock
                    </Label>
                    <Input
                        id="stock"
                        type="number"
                        min="0"
                        className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-emerald-500 rounded-sm h-11 font-mono text-sm transition-colors"
                        {...register("stock", {
                            valueAsNumber: true,
                        })}
                    />
                    {errors.stock && (
                        <SingleFormError
                            message={errors.stock.message}
                        />
                    )}
                </div>
            </div>

            {/* Categories */}
            <div className="space-y-2">
                <Label className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                    Categorías
                </Label>
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => toggleCategory(cat.id)}
                            className={cn(
                                "px-3 py-1.5 text-[11px] font-mono tracking-widest uppercase rounded-sm border transition-all",
                                selectedCategoryIds?.includes(cat.id)
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                    : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300",
                            )}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
                {errors.categoryIds && (
                    <SingleFormError
                        message={errors.categoryIds.message}
                    />
                )}
            </div>

            {/* Genders */}
            <div className="space-y-2">
                <Label className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                    Géneros
                </Label>
                <div className="flex flex-wrap gap-2">
                    {genders.map((gen) => (
                        <button
                            key={gen.id}
                            type="button"
                            onClick={() => toggleGender(gen.id)}
                            className={cn(
                                "px-3 py-1.5 text-[11px] font-mono tracking-widest uppercase rounded-sm border transition-all",
                                selectedGenderIds?.includes(gen.id)
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                    : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300",
                            )}
                        >
                            {gen.name}
                        </button>
                    ))}
                </div>
                {errors.genderIds && (
                    <SingleFormError
                        message={errors.genderIds.message}
                    />
                )}
            </div>

            {/* isActive */}
            <div className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-sm">
                <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-mono text-zinc-300 uppercase tracking-widest">
                        Estado
                    </span>
                    <span className="text-[11px] text-zinc-600 font-mono">
                        {isActive
                            ? "Visible en la vitrina"
                            : "Oculto en la vitrina"}
                    </span>
                </div>
                <Switch
                    checked={isActive}
                    onCheckedChange={(val) =>
                        setValue("isActive", val)
                    }
                    className="data-[state=checked]:bg-emerald-500"
                />
            </div>

            {/* isFeatured */}
            <div className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-sm">
                <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-mono text-zinc-300 uppercase tracking-widest">
                        Destacado
                    </span>
                    <span className="text-[11px] text-zinc-600 font-mono">
                        {isFeatured
                            ? "Aparece en sección destacados"
                            : "No aparece en destacados"}
                    </span>
                </div>
                <Switch
                    checked={isFeatured}
                    onCheckedChange={(val) =>
                        setValue("isFeatured", val)
                    }
                    className="data-[state=checked]:bg-amber-500"
                />
            </div>

            {/* Submit */}
            <Button
                type="submit"
                disabled={isSubmitting || uploading}
                className="h-11 bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono text-sm tracking-widest uppercase rounded-sm transition-all hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting
                    ? "Actualizando producto..."
                    : "Actualizar producto →"}
            </Button>
        </form>
    );
};
