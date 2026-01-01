import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decoderTokenToClaims } from "../../decode-claims";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const cookieStore = cookies();
        const token = (await cookieStore).get("jwt_back");
        let jwt = !token ? "not found" : token.value;

        const refreshtoken = (await cookieStore).get("jwt_back_refresh");
        let refreshJwt = !refreshtoken ? "not found" : refreshtoken.value;
        if (!jwt || !refreshJwt)
            return NextResponse.json({ message: "Token não encontrado." }, { status: 401 });

        const user = decoderTokenToClaims(jwt);  // usuario que esta enviando atualização
        const body = await req.json();           // a atualização

        // Atualiza o usuário
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user?.id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            return NextResponse.json({ message: "Erro ao atualizar usuário." }, { status: response.status });
        }

        // Agora pede um novo accessToken atualizado
        const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken: refreshJwt, clientType: "web" }),
        });

        if (!refreshRes.ok) {
            return NextResponse.json({ message: "Erro ao atualizar token." }, { status: refreshRes.status });
        }
        const newTokens = await refreshRes.json();
        (await cookieStore).set("jwt_back", newTokens.accessToken, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 3600, });
        const decoded = decoderTokenToClaims(newTokens.accessToken);
        
        // Retorna tudo pro front (pra atualizar a sessão)
        return NextResponse.json({ user: { id: decoded?.id, name: decoded?.username, email: decoded?.email, image: decoded?.imagem, userStatus: decoded?.userStatus, }, accessToken: newTokens.accessToken }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Erro ao conectar no backend." }, { status: 500 });
    }
}