import type { Metadata } from "next";
import {
    generateTitle,
    generateDescription,
} from "@/lib/layout-metadata";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: generateTitle("Administración"),
        description: generateDescription(
            "Panel de administración - gestión de productos, inventario y pedidos",
        ),
    };
}

export default async function DashboardPage() {
    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-3xl font-bold">
                    Administración de Productos
                </h1>
                <p className="text-muted-foreground">
                    Gestiona el catálogo de productos y pedidos
                </p>
            </div>
            
        </div>
    );
}
