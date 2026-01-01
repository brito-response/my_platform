import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decoderTokenToClaims } from "../../decode-claims";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("jwt_back");
    const jwt = token?.value ?? "not found";
    const backendForm = new FormData();

    const formData = await req.formData();
    const photo = formData.get("photo");

    if (photo && photo instanceof Blob) {
      backendForm.append("photo", photo);
    } else {
      return NextResponse.json({ message: "Nenhuma foto enviada" }, { status: 400 });
    }
    const user = decoderTokenToClaims(jwt);
    const init: RequestInit & { duplex?: 'half' } = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      body: backendForm,
      duplex: "half",
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user?.id}/photo`, init);
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });

  } catch (err) {
    console.error("Erro no route handler:", err);
    return NextResponse.json({ message: "Erro ao conectar no backend" }, { status: 500 });
  }
}
