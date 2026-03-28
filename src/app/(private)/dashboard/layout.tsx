import type { Metadata } from "next";
import {
    generateTitle,
    generateDescription,
} from "@/lib/layout-metadata";
import { getSessionDetails } from "@/actions/auth/session-details";
import { notFound, redirect } from "next/navigation";
import { DashboardSideBar } from "@/components/private/dashboard/DashboardSideBar";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: generateTitle("Administración de Productos"),
        description: generateDescription(
            "Panel de administración de productos - solo para administradores de la tienda",
        ),
    };
}

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { isAuthenticated, isAdmin } = await getSessionDetails();
    if (!isAuthenticated) redirect("/login");
    if (!isAdmin) notFound();

    return (
        <div className="flex min-h-screen bg-black antialiased">
            <DashboardSideBar />
            <main className="flex-1 overflow-auto">{children}</main>
        </div>
    );
}
