import { RegisterForm } from "@/components/public/auth";
import {
    generateTitle,
    generateDescription,
} from "@/lib/layout-metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: generateTitle("Registro"),
        description: generateDescription(
            "Crea una nueva cuenta para acceder al sistema",
        ),
    };
}

export default function RegisterPage() {
    return (
        <>
            <RegisterForm />
        </>
    );
}
