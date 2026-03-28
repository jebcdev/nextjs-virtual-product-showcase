import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { nextCookies } from "better-auth/next-js";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter });
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "sqlite", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false, // Set to true if you want to require email verification
        autoSignIn: true, // Automatically sign in the user after registration
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "USER",
                input: true, // ← el usuario no lo puede mandar desde el cliente
            },
        },
    },

    plugins: [nextCookies()],
});
