import { generateTitle } from "@/lib/layout-metadata";
import type { Metadata } from "next";
import { getSessionDetails } from "@/actions/auth/session-details";
import { redirect } from "next/navigation";
import { PrivateHeader } from "@/components/private/PrivateHeader";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: generateTitle("Panel Privado"),
        description:
            "Área restringida con rutas protegidas por autenticación",
    };
}

export default async function PrivateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { isAuthenticated, isAdmin, currentUser } =
        await getSessionDetails();
    if (!isAuthenticated) redirect("/login");
    return (
        <>
            <PrivateHeader
                isAdmin={isAdmin}
                currentUser={currentUser}
            />
            <main className="p-1">{children}</main>
        </>
    );
}
