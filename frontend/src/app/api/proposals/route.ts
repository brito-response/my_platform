import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decoderTokenToClaims } from "../decode-claims";
import { ProposalInput, ProposalStatus } from "@/utils/data_types/proposals";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("jwt_back");
    let jwt = !token ? "not found" : token.value;

    const user = decoderTokenToClaims(jwt);
    const body = await req.json();
    const formData: ProposalInput = { ...body, status: ProposalStatus.PENDING, userId: user?.id };

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/proposals`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json") && response.status === 201) {
      const project = await response.json();
      return NextResponse.json(project, { status: 201 });
    }
    return NextResponse.json({ message:"You already made a proposal for this job"}, { status: 400 });
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