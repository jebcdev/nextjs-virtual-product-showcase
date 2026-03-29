import {
    generateDescription,
    generateTitle,
} from "@/lib/layout-metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: generateTitle("Productos por Género"),
        description: generateDescription(
            "Explora nuestra amplia gama de productos organizados por géneros para encontrar exactamente lo que necesitas",
        ),
    };
}

interface IProps {
    params: Promise<{ slug: string }>;
}

export default async function PublicProductByGenderPage(
    { params }: IProps,
) {
    const { slug } = await params;
    return (
        <>
            <main>
                <h1>{slug}</h1>
            </main>
        </>
    );
}
