import type { Metadata } from "next";
import { PublicHeader } from "@/components/public/PublicHeader";
import {
    generateDescription,
    generateTitle,
} from "@/lib/layout-metadata";
import { getSessionDetails } from "@/actions/auth/session-details";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: generateTitle("Vitrina Virtual"),
        description: generateDescription(
            "Descubre nuestros productos y servicios en línea",
        ),
    };
}

export default async function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { isAuthenticated, isAdmin, currentUser } =
        await getSessionDetails();
    return (
        <main className="antialiased">
            <PublicHeader
                isAuthenticated={isAuthenticated}
                isAdmin={isAdmin}
                currentUser={currentUser}
            />
            <div className="p-1">{children}</div>
        </main>
    );
}
