import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface RouteContext { params: { jobId: string }; };
export async function POST(req: NextRequest, context: RouteContext): Promise<NextResponse> {
    const params = await context.params;
    const { jobId } = params;

    try {
        const cookieStore = cookies();
        const token = (await cookieStore).get("jwt_back");
        const jwt = token?.value ?? "not found";

        const jobupdate = await req.json();
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/${jobId}/link-project`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jobupdate),
        });
        const data = await response.json();
        return NextResponse.json(data, { status: response.status });

    } catch (err) {
        console.error("Erro no route handler:", err);
        return NextResponse.json({ message: "Erro ao conectar no backend" }, { status: 500 });
    }
}