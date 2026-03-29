import Loading from "@/app/loading";

import { DashboardHeader } from "@/components/private/dashboard/Header";
import {
    generateDescription,
    generateTitle,
} from "@/lib/layout-metadata";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { getDashboardCategories } from "@/actions/dashboard/categories/categories";
import { getDashboardGenders } from "@/actions/dashboard/genders/genders";
import { DashboardProductFormNew } from "@/components/private/dashboard/products/ProductFormNew";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: generateTitle("Crear Producto"),
        description: generateDescription(
            "Crea un nuevo producto para agregar a tu vitrina virtual",
        ),
    };
}

export default async function DashboardProductsNewPage() {
    const categories = await getDashboardCategories();
    const genders = await getDashboardGenders();

    if (!categories.success || !genders.success) return notFound();

    return (
        <>
            <div className="dashboard-page-container">
                <DashboardHeader
                    title="Crear Nuevo Producto"
                    subtitle="Agrega un nuevo producto a tu vitrina virtual"
                    action={{
                        label: "Volver",
                        href: "/dashboard/products",
                        icon: ArrowLeft,
                    }}
                    className="mb-2"
                />
                <Suspense
                    fallback={
                        <Loading message="Cargando Categorías" />
                    }
                >
                    <DashboardProductFormNew
                        categories={categories?.data!}
                        genders={genders?.data!}
                    />
                </Suspense>
            </div>
        </>
    );
}
