import {
    generateTitle,
    generateDescription,
} from "@/lib/layout-metadata";
import type { Metadata } from "next";
import { getSessionDetails } from "@/actions/auth/session-details";
import { UserProfile } from "@/components/private/profile/UserProfile";
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: generateTitle("Mi Perfil"),
        description: generateDescription(
            "Visualiza y administra tu perfil de cliente, datos personales y preferencias de compra",
        ),
    };
}

export default async function ProfilePage() {
    const { currentUser } = await getSessionDetails();
    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-3xl font-bold">Mi Perfil</h1>
                <p className="text-muted-foreground">
                    Administra tu información personal y preferencias
                </p>
            </div>
            <UserProfile user={currentUser!} />
        </div>
    );
}
