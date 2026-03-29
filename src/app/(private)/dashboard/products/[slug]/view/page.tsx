import { getDashboardProductBySlug } from "@/actions/dashboard/products/product";
import Loading from "@/app/loading";
import { DashboardHeader } from "@/components/private/dashboard/Header";
import { DashboardProductDetails } from "@/components/private/dashboard/products/ProductDetails";
import { Category, Gender, Product } from "@/generated/prisma/client";
import {
    generateDescription,
    generateTitle,
} from "@/lib/layout-metadata";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: generateTitle("Ver Producto"),
        description: generateDescription(
            "Visualiza los detalles de un producto específico en tu tienda",
        ),
    };
}

interface IProps {
    params: Promise<{ slug: string }>;
}

export default async function DashboardProductsViewPage({
    params,
}: IProps) {
    const { slug } = await params;

    const product = await getDashboardProductBySlug(slug);

    if (!product.success || !product.data) notFound();

    return (
        <div className="dashboard-page-container">
            <DashboardHeader
                title="Ver Producto"
                subtitle="Visualiza los detalles de un producto específico en tu tienda"
                action={{
                    label: "Volver",
                    href: "/dashboard/products",
                    icon: ArrowLeft,
                }}
            />
            <Suspense
                fallback={<Loading message="Cargando Productos" />}
            >
                <DashboardProductDetails
                    product={product?.data as Product & { categories: Category[]; genders: Gender[] }}
                />
            </Suspense>
        </div>
    );
}
