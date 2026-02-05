import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

const { handlers } = NextAuth(authConfig as any);

export const { GET, POST } = handlers;
