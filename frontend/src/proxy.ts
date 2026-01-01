import { NextRequest, NextResponse } from "next/server";
import { decoderTokenToClaims } from "./app/api/decode-claims";

const adminRoutes = ["/admin", "/usuarios", "/dashboard/admin", "/settings"];
const freelancerRoutes = ["/artesao", "/messages", "/atelie", "/minha-loja"];

/**
   ADMIN = 'ADMIN',
   CLIENT = 'CLIENT',
   FREELANCER = 'FREELANCER',
 */

export const config = {
    matcher: [
        // All Path admin:
        "/admin/:path*", "/usuarios/:path*", "/settings", "/settings/:path*", "/dashboard/admin/:path*", "/config/admin/:path*", "/analisar",
        // All Path artesão:
        "/artesao/:path*", "/meus-produtos/:path*", "/messages", "/messages/:path*", "/atelie", "/atelie/:path*", "/minha-loja/:path*"
    ]
};

export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;
    console.log(`proxy atived for: ${path}`);

    const isAdminRoute = adminRoutes.some(route => path.startsWith(route));
    const isFreelancerRoute = freelancerRoutes.some(route => path.startsWith(route));

    const token = request.cookies.get("jwt_back")?.value;

    if (!token) return NextResponse.redirect(new URL("/manager?error=not_has_token", request.url));

    const claims = decoderTokenToClaims(token);
    if (!claims) return NextResponse.redirect(new URL("/manager?error=invalid_token", request.url));


    const isAdmin = claims.roles === "ADMIN";
    if (isAdminRoute && !isAdmin) {return NextResponse.redirect(new URL("/manager?error=invalid_role", request.url));};

    const isFreelancer = claims.roles === "FREELANCER";
    if (isFreelancerRoute && !isFreelancer) {return NextResponse.redirect(new URL("/manager?error=invalid_role", request.url));};

    return NextResponse.next();
}
