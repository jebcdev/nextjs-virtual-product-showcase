import { getDashboardProducts } from "@/actions/dashboard/products/product";
import Loading from "@/app/loading";
import notFound from "@/app/not-found";
import { DashboardHeader } from "@/components/private/dashboard/Header";
import { DashboardProductsGrid } from "@/components/private/dashboard/products/ProductsGrid";
import {
    generateDescription,
    generateTitle,
} from "@/lib/layout-metadata";
import { Plus } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: generateTitle("Gestión de Productos"),
        description: generateDescription(
            "Administra los productos disponibles en tu vitrina virtual",
        ),
    };
}

export default async function DashboardProductsPage() {
    const products = await getDashboardProducts();
    if (!products.success) notFound();

    return (
        <>
            <div className="dashboard-page-container">
                <DashboardHeader
                    title="Productos"
                    subtitle="Gestiona los productos de la vitrina"
                    action={{
                        label: "Nuevo Producto",
                        href: "/dashboard/products/new",
                        icon: Plus,
                    }}
                />
                <Suspense
                    fallback={
                        <Loading message="Cargando Productos" />
                    }
                >
                    <DashboardProductsGrid
                        products={products.data ?? []}
                    />
                </Suspense>
            </div>
        </>
    );
}
