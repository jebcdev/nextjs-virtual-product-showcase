import { getDashboardCategoryBySlug } from "@/actions/dashboard/categories/categories";
import Loading from "@/app/loading";
import notFound from "@/app/not-found";
import { DashboardCategoryDetails } from "@/components/private/dashboard/categories/CategoryDetails";
import { DashboardCategoryFormEdit } from "@/components/private/dashboard/categories/CategoryFormEdit";

import { DashboardHeader } from "@/components/private/dashboard/Header";
import { Category } from "@/generated/prisma/client";
import {
    generateDescription,
    generateTitle,
} from "@/lib/layout-metadata";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: generateTitle("Editar Categoría"),
        description: generateDescription(
            "Visualiza y administra los detalles de una categoría específica en tu tienda",
        ),
    };
}

interface IProps {
    params: Promise<{ slug: string }>;
}

export default async function DashboardCategoriesEditPage({
    params,
}: IProps) {
    const { slug } = await params;
    const category = await getDashboardCategoryBySlug(slug);
    if (!category) notFound();

    return (
        <>
            <div className="dashboard-page-container">
                <DashboardHeader
                    title="Editar Categoría"
                    subtitle="Visualiza y administra los detalles de una categoría específica en tu tienda"
                    action={{
                        label: "Volver",
                        href: "/dashboard/categories",
                        icon: ArrowLeft,
                    }}
                />
                <Suspense
                    fallback={
                        <Loading message="Cargando Categorías" />
                    }
                >
                    <DashboardCategoryFormEdit
                        category={category.data as Category ?? []}
                    />
                </Suspense>
            </div>
        </>
    );
}
