import { seedGenders } from "@/actions/dashboard/genders/seed-genders";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const result = await seedGenders();
        return NextResponse.json(
            { success: true, data: result },
            { status: 201 },
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Error al ejecutar el seeder" },
            { status: 500 },
        );
    }
}
