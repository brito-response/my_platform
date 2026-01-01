import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("jwt_back");
    let jwt = !token ? "not found" : token.value;
    const body = await req.json();
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json") && response.status === 201) {
      const project = await response.json();
      return NextResponse.json(project, { status: 201 });
    }
    return NextResponse.json({ message: "The request contains errors, such as invalid data, incorrect format, or missing required fields." }, { status: 400 });
  } catch (error) {
    throw new Error("Erro ao conectar no backend.");
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("jwt_back");
    let jwt = !token ? "not found" : token.value;
  
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json") && response.status === 200) {
      const projects = await response.json();
      return NextResponse.json(projects, { status: 200 });
    }
    return NextResponse.json({ message: "The request contains errors, such as invalid data, incorrect format, or missing required fields." }, { status: 400 });
  } catch (error) {
    throw new Error("Erro ao conectar no backend.");
  }
}