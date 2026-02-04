import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";

export default auth((req: any) => {
    const isLoggedIn = !!req.auth;
    const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard");
    const isLoginPage = req.nextUrl.pathname === "/dashboard/login";

    if (isDashboardPage && !isLoggedIn && !isLoginPage) {
        return Response.redirect(new URL("/dashboard/login", req.nextUrl.origin));
    }
});

export const config = {
    matcher: ["/dashboard/:path*"],
};
