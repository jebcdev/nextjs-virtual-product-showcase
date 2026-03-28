import type { Metadata } from "next";
import {
    generateTitle,
    generateDescription,
} from "@/lib/layout-metadata";
import { DashboardHeader } from "@/components/private/dashboard/DashboardHeader";
import { Plus } from "lucide-react";
import { getDashboardGenders } from "@/actions/dashboard/genders/genders";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: generateTitle("Gestión de Géneros"),
        description: generateDescription(
            "Administra los géneros y categorías de productos disponibles en tu tienda",
        ),
    };
}

export default async function GendersPage() {
    const { data: genders } = await getDashboardGenders();

    return (
        <>
            <div className="dashboard-page-container">
                <DashboardHeader
                    title="Géneros"
                    subtitle="Gestiona los géneros de la vitrina"
                    action={{
                        label: "Nuevo género",
                        href: "/dashboard/genders/new",
                        icon: Plus,
                    }}
                />
                {JSON.stringify(genders, null, 2)}
            </div>
        </>
    );
}
