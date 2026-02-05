import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";

// Use type assertion to bypass strict type check for now, as types are in flux in beta
export default NextAuth(authConfig as any).auth;

export const config = {
    matcher: ["/dashboard/:path*"],
};
