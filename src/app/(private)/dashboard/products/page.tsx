
import { getDashboardProducts } from "@/actions/dashboard/products/product";
import Loading from "@/app/loading";
import notFound from "@/app/not-found";
import { DashboardCategoriesGrid } from "@/components/private/dashboard/categories/CategoriesGrid";
import { DashboardHeader } from "@/components/private/dashboard/Header";
import {
    generateDescription,
    generateTitle,
} from "@/lib/layout-metadata";
import { Plus } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: generateTitle("Gestión de Categorías"),
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
                        href: "/dashboard/categories/new",
                        icon: Plus,
                    }}
                />
                <Suspense
                    fallback={
                        <Loading message="Cargando Categorías" />
                    }
                >
                    <DashboardCategoriesGrid
                        categories={categories.data ?? []}
                    />
                </Suspense>
            </div>
        </>
    );
}
