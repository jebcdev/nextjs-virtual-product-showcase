import type { Metadata } from "next";
import {
    generateTitle,
    generateDescription,
} from "@/lib/layout-metadata";
import { DashboardHeader } from "@/components/private/dashboard/Header";

import { DashboardGendersGrid } from "@/components/private/dashboard/gender/GenderGrid";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: generateTitle("Gestión de Géneros"),
        description: generateDescription(
            "Administra los géneros y categorías de productos disponibles en tu tienda",
        ),
    };
}

export default async function DashbaordGendersPage() {
    
    return (
        <>
            <div className="dashboard-page-container">
                <DashboardHeader
                    title="Géneros"
                    subtitle="Gestiona los géneros de la vitrina"
                />
                <DashboardGendersGrid  />
            </div>
        </>
    );
}
