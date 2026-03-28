// src/app/api/seeder/route.ts
import { seedInitialUsers } from "@/actions/auth";
import { seedInitialCategories } from "@/actions/dashboard/categories/seed-categories";
import { seedInitialGenders } from "@/actions/dashboard/genders/seed-genders";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const users = await seedInitialUsers();
        console.log({ users });

        const genders = await seedInitialGenders();
        console.log({ genders });

        const categories = await seedInitialCategories();
        console.log({ categories });

        return NextResponse.json(
            { success: true, data: "Seeder ejecutado correctamente" },
            { status: 201 },
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Error al ejecutar el seeder" },
            { status: 500 },
        );
    }
}
