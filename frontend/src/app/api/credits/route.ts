import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decoderTokenToClaims } from "../decode-claims";
import { JobInput } from "@/utils/data_types/jobs";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const cookieStore = cookies();
        const token = (await cookieStore).get("jwt_back");
        const jwt = token?.value ?? "not found";

        const body = await req.json();
        const user = decoderTokenToClaims(jwt);
        if (user) {
            const objectMounted: JobInput = { ...body, userId: user.id };
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payments/${user.id}/credits`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(objectMounted),
            });
            const contentType = response.headers.get("Content-Type");
            if (contentType && contentType.includes("application/json") && response.status === 201) {
                const job = await response.json();
                return NextResponse.json(job, { status: 201 });
            }
            return NextResponse.json({ message: "Unauthorized error." }, { status: response.status });
        }
        return NextResponse.json({ message: "The request conatin error" }, { status: 400 });
    } catch (error) {
        throw new Error("Erro ao conectar no backend.");
    }
}