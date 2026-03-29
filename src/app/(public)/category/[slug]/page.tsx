import {
    generateDescription,
    generateTitle,
} from "@/lib/layout-metadata";
import { PublicProductsGrid } from "@/components/public/products/ProductsGrid";
import type { Metadata } from "next";

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
    const { slug } = await params;
    return {
        title: generateTitle(`Productos - ${slug}`),
        description: generateDescription(
            `Explora nuestros productos para ${slug}`
        ),
    };
}

interface IProps {
    params: Promise<{ slug: string }>;
}

export default async function PublicProductByCategoryPage(
    { params }: IProps,
) {
    const { slug } = await params;
    return (
        <main className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-10 capitalize">{slug}</h1>
            <PublicProductsGrid searchCriteria="category" slug={slug} />
        </main>
    );
}
