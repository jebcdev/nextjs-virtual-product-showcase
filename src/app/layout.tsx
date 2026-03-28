import type { Metadata } from "next";
import "./globals.css";
import {
    generateDescription,
    generateTitle,
} from "@/lib/layout-metadata";
import { Merriweather, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import TanStackQueryProvider from "@/components/providers/TanStackQueryProvider";

const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

const merriweather = Merriweather({
    subsets: ["latin"],
    variable: "--font-serif",
});

export const metadata: Metadata = {
    title: generateTitle("Vitrina Virtual de Productos"),
    description: generateDescription(
        "Explora y descubre nuestro catálogo completo de productos en línea",
    ),
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return (
        <html
            lang="en"
            className={cn(
                "dark",
                "h-full",
                "antialiased",
                "p-0.5",
                merriweather.variable,
                "font-mono",
                geistMono.variable,
            )}
        >
            <body className="min-h-full flex flex-col">
                <TanStackQueryProvider>{children}</TanStackQueryProvider>
                <Toaster
                    duration={2000}
                    position="top-right"
                    richColors
                    closeButton
                    theme="dark"
                />
            </body>
        </html>
    );
}
