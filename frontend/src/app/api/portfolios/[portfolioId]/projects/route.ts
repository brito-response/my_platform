import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

interface RouteContext { params: { porfolioId: string }; };

export async function GET(req: NextRequest, context: RouteContext) {
    const params = await context.params;
    const { porfolioId } = params;

    try {
        const cookieStore = cookies();
        const token = (await cookieStore).get("jwt_back");
        const jwt = token?.value ?? "not found";

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/portfolios/${porfolioId}/projects`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        });
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });

    } catch (err) {
        console.error("Erro no route handler:", err);
        return NextResponse.json({ message: "Erro ao conectar no backend" }, { status: 500 });
    }
}
