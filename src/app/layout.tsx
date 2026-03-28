import type { Metadata } from "next";
import "./globals.css";
import {
    generateDescription,
    generateTitle,
} from "@/lib/layout-metadata";
import { Merriweather, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

const merriweather = Merriweather({
    subsets: ["latin"],
    variable: "--font-serif",
});

export const metadata: Metadata = {
    title: generateTitle("Sistema de Autenticación"),
    description: generateDescription(
        "Proyecto educativo de autenticación y autorización con Next.js",
    ),
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    console.log(process.env.NEXT_PUBLIC_APP_NAME);
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
                {children}
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
