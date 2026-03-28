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
            "Visualiza y administra tu perfil de usuario",
        ),
    };
}

export default async function ProfilePage() {
    const { currentUser } = await getSessionDetails();
    return (
        <>
            <main>
                <UserProfile user={currentUser!} />
            </main>
        </>
    );
}
