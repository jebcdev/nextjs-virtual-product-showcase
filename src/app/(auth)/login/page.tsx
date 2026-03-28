import { LoginForm } from "@/components/public/auth";
import {
    generateTitle,
    generateDescription,
} from "@/lib/layout-metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: generateTitle("Iniciar sesión"),
        description: generateDescription(
            "Accede a tu cuenta con correo y contraseña",
        ),
    };
}

export default function LoginPage() {
    return (
        <>
            <LoginForm />
        </>
    );
}
