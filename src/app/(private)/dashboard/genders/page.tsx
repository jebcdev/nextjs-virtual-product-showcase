import type { Metadata } from "next";
import {
    generateTitle,
    generateDescription,
} from "@/lib/layout-metadata";
import { DashboardHeader } from "@/components/private/dashboard/DashboardHeader";
import { Plus } from "lucide-react";
import { getDashboardGenders } from "@/actions/dashboard/genders/genders";
import { notFound } from "next/navigation";
import { DashboardGendersGrid } from "@/components/private/dashboard/gender/DashboardGenderGrid";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: generateTitle("Gestión de Géneros"),
        description: generateDescription(
            "Administra los géneros y categorías de productos disponibles en tu tienda",
        ),
    };
}

export default async function GendersPage() {
    const { data: genders, success } = await getDashboardGenders();
    if (!success) notFound();

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
                <DashboardGendersGrid genders={genders ?? []} />
            </div>
        </>
    );
}
