import Loading from "@/app/loading";
import { DashboardCategoryFormNew } from "@/components/private/dashboard/categories/CategoryFormNew";
import { DashboardHeader } from "@/components/private/dashboard/Header";
import {
    generateDescription,
    generateTitle,
} from "@/lib/layout-metadata";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: generateTitle("Dashboard Categories"),
        description: generateDescription(
            "Administra las categorías de productos disponibles en tu tienda",
        ),
    };
}

export default async function DashboardCategoriesNewPage() {
    return (
        <>
            <div className="dashboard-page-container">
                <DashboardHeader
                    title="Crear Nueva Categoría"
                    subtitle="Agrega una nueva categoría para organizar tus productos"
                    action={{
                        label: "Volver",
                        href: "/dashboard/categories",
                        icon: ArrowLeft,
                    }}
                    className="mb-2"
                />
                <Suspense
                    fallback={
                        <Loading message="Cargando Categorías" />
                    }
                >
                    <DashboardCategoryFormNew />
                </Suspense>
            </div>
        </>
    );
}
