import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    pages: {
        signIn: "/dashboard/login",
    },
    callbacks: {
        async session({ session, token }) {
            return session;
        },
        async signIn({ user, account, profile }) {
            return true;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

if (!process.env.NEXTAUTH_SECRET) {
    console.warn("⚠️ NEXTAUTH_SECRET is not defined. Production login may fail.");
}
