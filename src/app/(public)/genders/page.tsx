import {
    generateDescription,
    generateTitle,
} from "@/lib/layout-metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: generateTitle("Géneros"),
        description: generateDescription(
            "Explora nuestra amplia variedad de géneros de productos, desde moda y tecnología hasta hogar y más. Encuentra lo que necesitas con facilidad.",
        ),
    };
}

export default function PublicGendersPage() {
    return (
        <>
            <main>
                <h1>Géneros</h1>
            </main>
        </>
    );
}
