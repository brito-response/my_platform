import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const body = await req.json();
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json") && response.status === 201) {
            const usuario = await response.json();
            return NextResponse.json(usuario, { status: 201 });
        }
        return NextResponse.json({ message: "The request contains errors, such as invalid data, incorrect format, or missing required fields." }, { status: 400 });

    } catch (error) {
        throw new Error("Erro ao conectar no backend.");
    }
}