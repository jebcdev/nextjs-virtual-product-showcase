import { getDashboardCategories } from "@/actions/dashboard/categories/categories";
import Loading from "@/app/loading";
import notFound from "@/app/not-found";
import { DashbaordCategoriesGrid } from "@/components/private/dashboard/categories/DashbaordCategoriesGrid";
import { DashboardHeader } from "@/components/private/dashboard/DashboardHeader";
import {
    generateDescription,
    generateTitle,
} from "@/lib/layout-metadata";
import { Plus } from "lucide-react";
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

export default async function DashboardCategoriesPage() {
    const categories = await getDashboardCategories();
    if (!categories) notFound();

    return (
        <>
            <div className="dashboard-page-container">
                <DashboardHeader
                    title="Categorías"
                    subtitle="Gestiona las categorías de la vitrina"
                    action={{
                        label: "Nueva Categoría",
                        href: "/dasboard/categories/new",
                        icon: Plus,
                    }}
                />
                <Suspense
                    fallback={
                        <Loading message="Cargando Categorías" />
                    }
                >
                    <DashbaordCategoriesGrid
                        categories={categories.data ?? []}
                    />
                </Suspense>
            </div>
        </>
    );
}
