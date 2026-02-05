import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

const handler = NextAuth(authConfig as any);

export const { GET, POST } = handler;
