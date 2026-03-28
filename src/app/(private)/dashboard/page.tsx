import type { Metadata } from "next";
import {
    generateTitle,
    generateDescription,
} from "@/lib/layout-metadata";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: generateTitle("Dashboard"),
        description: generateDescription(
            "Panel de administración - solo para usuarios con rol admin",
        ),
    };
}

export default async function DashboardPage() {
    return (
        <>
            <main className="p-1">
                <h1>Dashboard</h1>
            </main>
        </>
    );
}
