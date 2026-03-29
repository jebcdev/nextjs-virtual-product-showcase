"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    CreateCategorySchema,
    type TCreateCategoryData,
} from "@/validations/dashboard/categories";
import { updateDashboardCategoryById } from "@/actions/dashboard/categories/categories";
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
import { Category } from "@/generated/prisma/client";

interface IProps {
    category: Category;
}

export const DashboardCategoryFormEdit = ({ category }: IProps) => {
    const router = useRouter();
    const [preview, setPreview] = useState<string | null>(
        category.image ?? null,
    );
    const [uploading, setUploading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<TCreateCategoryData>({
        resolver: zodResolver(CreateCategorySchema),
        mode: "onBlur",
        defaultValues: {
            name: category.name,
            slug: category.slug,
            description: category.description ?? undefined,
            image: category.image ?? undefined,
            isActive: category.isActive,
        },
    });

    const isActive = watch("isActive");

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue("slug", slugify(e.target.value), { shouldValidate: true });
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setPreview(URL.createObjectURL(file));

        try {
            setUploading(true);
            const url = await uploadToCloudinary(file);
            setValue("image", url, { shouldValidate: true });
            toast.success("Imagen subida correctamente");
        } catch {
            toast.error("Error al subir la imagen");
            setPreview(category.image ?? null);
        } finally {
            setUploading(false);
        }
    };

    const handleRemoveImage = () => {
        setPreview(null);
        setValue("image", undefined);
    };

    const onSubmit = async (data: TCreateCategoryData) => {
        const response = await updateDashboardCategoryById(category.id, data);

        if (!response.success) {
            toast.error("Error al actualizar la categoría", {
                description: response.message,
                action: { label: "Entendido", onClick: () => toast.dismiss() },
            });
            return;
        }

        toast.success("Categoría actualizada correctamente", {
            description: response.message,
            action: { label: "Entendido", onClick: () => toast.dismiss() },
        });

        router.push("/dashboard/categories");
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 py-6"
        >
            {/* Image upload */}
            <div className="space-y-2">
                <Label className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                    Imagen
                </Label>

                {preview ? (
                    <div className="relative w-full h-48 rounded-sm overflow-hidden border border-zinc-800 group">
                        <Image
                            src={preview}
                            alt="Preview"
                            fill
                            className="object-cover"
                        />
                        {uploading && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <span className="text-[11px] font-mono tracking-widest uppercase text-emerald-400 animate-pulse">
                                    Subiendo...
                                </span>
                            </div>
                        )}
                        {!uploading && (
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="absolute top-2 right-2 h-7 w-7 flex items-center justify-center bg-zinc-900/80 border border-zinc-700 text-zinc-400 hover:text-red-400 hover:border-red-900/40 rounded-sm opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>
                ) : (
                    <label className="flex flex-col items-center justify-center gap-3 w-full h-48 border border-dashed border-zinc-800 rounded-sm cursor-pointer hover:border-zinc-600 hover:bg-zinc-900/50 transition-all">
                        <ImagePlus className="w-6 h-6 text-zinc-600" />
                        <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-600">
                            Haz clic para subir una imagen
                        </span>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </label>
                )}

                {errors.image && (
                    <SingleFormError message={errors.image.message} />
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
                    placeholder="Ej: Camisetas"
                    className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-emerald-500 rounded-sm h-11 font-mono text-sm transition-colors"
                    {...register("name", { onChange: handleNameChange })}
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
                        className="pl-6 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-emerald-500 rounded-sm h-11 font-mono text-sm transition-colors"
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
                    placeholder="Describe brevemente esta categoría..."
                    rows={3}
                    className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-emerald-500 rounded-sm font-mono text-sm transition-colors resize-none"
                    {...register("description")}
                />
                {errors.description && (
                    <SingleFormError message={errors.description.message} />
                )}
            </div>

            {/* isActive */}
            <div className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-sm">
                <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-mono text-zinc-300 uppercase tracking-widest">
                        Estado
                    </span>
                    <span className="text-[11px] text-zinc-600 font-mono">
                        {isActive ? "Visible en la vitrina" : "Oculta en la vitrina"}
                    </span>
                </div>
                <Switch
                    checked={isActive}
                    onCheckedChange={(val) => setValue("isActive", val)}
                    className="data-[state=checked]:bg-emerald-500"
                />
            </div>

            {/* Submit */}
            <Button
                type="submit"
                disabled={isSubmitting || uploading}
                className="h-11 bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono text-sm tracking-widest uppercase rounded-sm transition-all hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Actualizando categoría..." : "Actualizar categoría →"}
            </Button>
        </form>
    );
};