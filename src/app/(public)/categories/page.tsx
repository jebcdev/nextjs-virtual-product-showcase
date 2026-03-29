import { generateDescription, generateTitle } from "@/lib/layout-metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: generateTitle("Categorías"),
    description:generateDescription(
      "Explora nuestra amplia variedad de categorías de productos, desde moda y tecnología hasta hogar y más. Encuentra lo que necesitas con facilidad.",
    ),
  };
}

export default function PublicCategoriesPage() {
  return (
    <>
      <main>
        <h1>
            Categorías
        </h1>
        
      </main>
    </>
  );
}