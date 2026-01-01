import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Container } from "@/components/Containers";
import { HCustom } from "@/components/Texts/HCustom";
import { FormNewProject } from "@/forms";
import {Portfolio} from "@/utils/data_types/portifolios";
import { Session } from "@/utils/data_types/session";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function getPortifolioOfUser(userId: string, token: string): Promise<Portfolio | null> {
  try {
    const response = await fetch(`http://localhost:3000/users/${userId}/portfolios`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      return null;
    }
    const data: Portfolio = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    return null;
  }
}

export default async function NewProject() {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) redirect("/");
  const { user, accessToken } = session;
  const portfolio: Portfolio | null = await getPortifolioOfUser(user.id, accessToken);
  if (!portfolio) { redirect("/manager") }
  const portfolioId = portfolio?.portfolioId;

  return (
    <Container bgColor="bg-gray-200" >
      <HCustom level={3} className="text-center mb-10">Novo Projeto</HCustom>
      <FormNewProject portfolioId={portfolioId} />
    </Container>
  );
}