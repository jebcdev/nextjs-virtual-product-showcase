import { getPublicProductBySlug } from "@/actions/public/public";
import { BackButton } from "@/components/public/products/BackButton";
import { PublicProductDetails } from "@/components/public/products/ProductDetails";
import { ProductImageGallery } from "@/components/public/products/ProductImageGallery";
import {
    generateDescription,
    generateTitle,
} from "@/lib/layout-metadata";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface IProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({
    params,
}: IProps): Promise<Metadata> {
    const { slug } = await params;
    const response = await getPublicProductBySlug(slug);

    if (!response.success || !response.data) {
        return {
            title: generateTitle("Producto no encontrado"),
            description: generateDescription(
                "El producto que buscas no existe",
            ),
        };
    }

    const { name, description } = response.data;

    return {
        title: generateTitle(name),
        description: generateDescription(
            description ??
                `Descubre ${name} en nuestra tienda virtual`,
        ),
    };
}

export default async function PublicProductBySlugPage({
    params,
}: IProps) {
    const { slug } = await params;
    const response = await getPublicProductBySlug(slug);

    if (!response.success || !response.data) {
        return notFound();
    }

    const product = response.data;
    const parsedImages: string[] = JSON.parse(product.images || "[]");

    return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Back button */}
            <BackButton />

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-6">
                {/* Gallery */}
                <div>
                    <ProductImageGallery
                        images={parsedImages}
                        productName={product.name}
                    />
                </div>

                {/* Details */}
                <div>
                    <PublicProductDetails product={product} />
                </div>
            </div>
        </main>
    );
}
