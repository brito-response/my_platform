import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

interface RouteContext { params: { proposalId: string }; };
export async function POST(req: NextRequest, context: RouteContext) {
  const params = await context.params;
  const { proposalId } = params;

  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("jwt_back");
    const jwt = token?.value ?? "not found";
    if (!jwt) return NextResponse.json({ message: "Token não encontrado." }, { status: 401 });

    const body = await req.json();

    if (body.status && body.status === "ACCEPTED") {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/proposals/${proposalId}/accept`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });

      const res = await response.json();

      if (!response.ok) return NextResponse.json({ message: res.message }, { status: response.status });
      return NextResponse.json(res, { status: response.status });
    }
    return NextResponse.json({ message: "Erro na requisição." }, { status: 400 });

  } catch (err) {
    return NextResponse.json({ message: "Erro ao conectar no backend" }, { status: 500 });
  }
}
