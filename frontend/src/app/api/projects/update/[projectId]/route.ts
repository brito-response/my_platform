import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

interface RouteContext { params: { projectId: string }; };

export async function POST(req: NextRequest, context: RouteContext) {
  const params = await context.params;
  const { projectId } = params;

  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("jwt_back");
    const jwt = token?.value ?? "not found";

    const formData = await req.formData();
    const backendForm = new FormData();
    formData.getAll("images").forEach(file => backendForm.append("images", file));

    const init: RequestInit & { duplex?: 'half' } = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      body: backendForm,
      duplex: "half",
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${projectId}/images`, init);
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });

  } catch (err) {
    console.error("Erro no route handler:", err);
    return NextResponse.json({ message: "Erro ao conectar no backend" }, { status: 500 });
  }
}
