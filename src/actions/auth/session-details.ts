"use server";

import { Role } from "@/generated/prisma/enums";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/* 

'session' is declared but its value is never read.ts(6133)
const session: {
    session: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        expiresAt: Date;
        token: string;
        ipAddress?: string | null | undefined;
        userAgent?: string | null | undefined;
    };
    user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
        role: string | null | undefined;
    };
} | null
*/
export async function getSessionDetails() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const isAuthenticated = !!session;
    const isAdmin = session?.user.role === Role.ADMIN;
    const isUser = session?.user.role === Role.USER;
    const currentUser = session?.user || null;
    const currentSession = session?.session || null;

    return {
        isAuthenticated,
        isAdmin,
        isUser,
        currentUser,
        currentSession,
    };
}
