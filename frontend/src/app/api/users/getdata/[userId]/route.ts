import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface RouteContext { params: { userId: string }; };
export async function POST(req: NextRequest, context: RouteContext): Promise<NextResponse> {

  const params = await context.params;
  const { userId } = params;
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("jwt_back");
    let jwt = !token ? "not found" : token.value;
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`
      },
    });

    if (response.status === 200) {
      const user = await response.json();
      return NextResponse.json(user, { status: 200 });
    }
    return NextResponse.json({ message: "user not exists" }, { status: 404 });
  } catch (error) {
    throw new Error("Erro ao conectar no backend.");
  }
}