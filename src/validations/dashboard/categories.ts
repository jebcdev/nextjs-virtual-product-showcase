import { z } from "zod";

export const CreateCategorySchema = z.object({
    name: z
        .string({ error: "El nombre es requerido" })
        .trim()
        .min(3, { error: "Mínimo 3 caracteres" })
        .max(100, { error: "Máximo 100 caracteres" }),

    slug: z
        .string({ error: "El slug es requerido" })
        .trim()
        .min(3, { error: "Mínimo 3 caracteres" })
        .max(100, { error: "Máximo 100 caracteres" })
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
            error: "Solo minúsculas, números y guiones medios",
        }),

    description: z
        .string()
        .trim()
        .max(500, { error: "Máximo 500 caracteres" })
        .optional(),

    image: z
        .string()
        .url({ error: "Debe ser una URL válida" })
        .optional(),

    isActive: z.boolean().default(true),
});

export const UpdateCategorySchema = CreateCategorySchema.partial().extend({
    id: z.string({ error: "El id es requerido" }),
});

export type TCreateCategoryData = z.infer<typeof CreateCategorySchema>;
export type TUpdateCategoryData = z.infer<typeof UpdateCategorySchema>;