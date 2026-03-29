import { z } from "zod";

export const CreateProductSchema = z.object({
    name: z
        .string({ error: "El nombre es requerido" })
        .trim()
        .min(3, { error: "Mínimo 3 caracteres" })
        .max(200, { error: "Máximo 200 caracteres" }),

    slug: z
        .string({ error: "El slug es requerido" })
        .trim()
        .min(3, { error: "Mínimo 3 caracteres" })
        .max(200, { error: "Máximo 200 caracteres" })
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
            error: "Solo minúsculas, números y guiones medios",
        }),

    description: z
        .string()
        .trim()
        .max(1000, { error: "Máximo 1000 caracteres" })
        .optional(),

    price: z
        .number({ error: "El precio es requerido" })
        .positive({ error: "El precio debe ser mayor a 0" })
        .multipleOf(0.01, { error: "Máximo 2 decimales" }),

    stock: z
        .number({ error: "El stock es requerido" })
        .int({ error: "El stock debe ser un número entero" })
        .min(0, { error: "El stock no puede ser negativo" }),

    images: z
        .array(
            z.string().url({ error: "Cada imagen debe ser una URL válida" }),
        )
        .min(1, { error: "Debe tener al menos una imagen" }),

    isActive: z.boolean({ error: "El estado es requerido" }),

    isFeatured: z.boolean({ error: "El campo destacado es requerido" }),

    categoryIds: z
        .array(z.string({ error: "ID de categoría inválido" }))
        .min(1, { error: "Selecciona al menos una categoría" }),

    genderIds: z
        .array(z.string({ error: "ID de género inválido" }))
        .min(1, { error: "Selecciona al menos un género" }),
});

export const UpdateProductSchema = CreateProductSchema.partial().extend({
    id: z.string({ error: "El id es requerido" }),
});

export type TCreateProductData = z.infer<typeof CreateProductSchema>;
export type TUpdateProductData = z.infer<typeof UpdateProductSchema>;