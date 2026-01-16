import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decoderTokenToClaims } from "../../decode-claims";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const cookieStore = cookies();
        const token = (await cookieStore).get("jwt_back");
        const jwt = token?.value ?? "not found";

        const body = await req.json();
        const user = decoderTokenToClaims(jwt);

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payments/${body.paymentId}/verify`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });
        if (response.status === 200) {
            const confirmado = await response.json();
            return NextResponse.json(confirmado, { status: 200 });
        }
        return NextResponse.json({ message: "Unauthorized error." }, { status: response.status });
    } catch (error) {
        throw new Error("Erro ao conectar no backend.");
    }
}