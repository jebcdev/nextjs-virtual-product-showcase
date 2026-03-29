import { getDashboardProductBySlug } from "@/actions/dashboard/products/product";
import { getDashboardCategories } from "@/actions/dashboard/categories/categories";
import { getDashboardGenders } from "@/actions/dashboard/genders/genders";
import Loading from "@/app/loading";
import { DashboardHeader } from "@/components/private/dashboard/Header";
import { DashboardProductFormEdit } from "@/components/private/dashboard/products/ProductFormEdit";
import { Category, Gender, Product } from "@/generated/prisma/client";
import { generateDescription, generateTitle } from "@/lib/layout-metadata";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: generateTitle("Editar Producto"),
        description: generateDescription(
            "Visualiza y administra los detalles de un producto específico en tu tienda",
        ),
    };
}

interface IProps {
    params: Promise<{ slug: string }>;
}

export default async function DashboardProductsEditPage({ params }: IProps) {
    const { slug } = await params;

    const [product, categories, genders] = await Promise.all([
        getDashboardProductBySlug(slug),
        getDashboardCategories(),
        getDashboardGenders(),
    ]);

    if (!product.success || !product.data) notFound();
    if (!categories.success || !genders.success) notFound();

    return (
        <div className="dashboard-page-container">
            <DashboardHeader
                title="Editar Producto"
                subtitle="Visualiza y administra los detalles de un producto específico en tu tienda"
                action={{
                    label: "Volver",
                    href: "/dashboard/products",
                    icon: ArrowLeft,
                }}
            />
            <Suspense fallback={<Loading message="Cargando Productos" />}>
                <DashboardProductFormEdit
                    product={product.data as Product & { categories: Category[]; genders: Gender[] }}
                    categories={categories.data ?? []}
                    genders={genders.data ?? []}
                />
            </Suspense>
        </div>
    );
}