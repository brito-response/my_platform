import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CreateJobSection } from "@/components/Sections";
import { HCustom } from "@/components/Texts/HCustom";
import { Session } from "@/utils/data_types/session";
import { Wallet } from "@/utils/data_types/wallet";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function getMyWallet(token: string, userId: string): Promise<Wallet> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/wallets/users/${userId}`, { headers: { Authorization: `Bearer ${token}`, }, cache: 'no-store' });

  if (!response.ok) throw new Error('Erro ao buscar carteira');
  return response.json();
};

export default async function NewJob() {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) redirect("/");
  const walletOfUser = await getMyWallet(session.accessToken, session.user.id);

  return (
    <div className="w-full min-h-screen bg-(--bg-section-100) flex flex-col items-center">
      <HCustom level={2} className="text-center py-3 mb-3">Criar novo Trabalho</HCustom>
      <CreateJobSection walletOfUser={walletOfUser} />
    </div>
  );
}