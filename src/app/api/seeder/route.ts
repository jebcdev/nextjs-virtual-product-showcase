// src/app/api/seeder/route.ts
import { seedInitialUsers } from "@/actions/auth";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const result = await seedInitialUsers();
        return NextResponse.json(
            { success: true, data: result },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Error al ejecutar el seeder" },
            { status: 500 }
        );
    }
}