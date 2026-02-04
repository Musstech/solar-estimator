import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Google({
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
});
