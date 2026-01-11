import { NextRequest, NextResponse } from "next/server";
import { decoderTokenToClaims } from "./app/api/decode-claims";

type Role = "ADMIN" | "CLIENT" | "FREELANCER";

// Arrays com as rotas que cada papel pode acessar
const adminRoutes = ["/admin", "/usuarios", "/dashboard/admin", "/settings", "/jobs/view"];
const clientRoutes = ["/jobs/view"];
const freelancerRoutes = ["/artesao", "/messages", "/atelie", "/minha-loja"];

//configuração para proxy saber, "que só executa ele nessa rotas listadas aqui", isso meio que evita rodar em todoas as rotas da aplicação.
export const config = {
    matcher: [
        "/admin/:path*", "/usuarios/:path*", "/settings", "/settings/:path*", "/jobs/view", "/jobs/view/:path*", "/messages", "/messages/:path*"
    ]
};

function canAccessRoute(path: string, role: Role) {
    switch (role) {
        case "ADMIN":
            return (adminRoutes.some(r => path.startsWith(r)) || clientRoutes.some(r => path.startsWith(r)) || freelancerRoutes.some(r => path.startsWith(r)));

        case "CLIENT":
            return clientRoutes.some(r => path.startsWith(r));

        case "FREELANCER":
            return freelancerRoutes.some(r => path.startsWith(r));

        default:
            return false;
    };
};

export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const token = request.cookies.get("jwt_back")?.value;
    if (!token) {
        return NextResponse.redirect(new URL("/manager?error=not_has_token", request.url));
    }

    const claims = decoderTokenToClaims(token);
    if (!claims) {
        return NextResponse.redirect(new URL("/manager?error=invalid_token", request.url));
    }

    const role = claims.roles as Role;
    const hasAccess = canAccessRoute(path, role);

    if (!hasAccess) {
        return NextResponse.redirect(new URL("/manager?error=invalid_role", request.url));
    }

    return NextResponse.next();
}

