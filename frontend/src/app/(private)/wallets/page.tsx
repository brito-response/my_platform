import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { HCustom } from "@/components/Texts";
import WalletActions from "@/components/WalletActions";
import { Session } from "@/utils/data_types/session";
import { Wallet } from "@/utils/data_types/wallet";
import { WalletIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function getMyWallet(token: string, userId: string): Promise<Wallet> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/wallets/users/${userId}`, { headers: { Authorization: `Bearer ${token}`, }, cache: 'no-store' });

    if (!response.ok) throw new Error('Erro ao buscar carteira');
    return response.json();
};

export default async function WalletPage() {
    const session: Session | null = await getServerSession(authOptions);
    if (!session) redirect("/");
    const walletOfUser = await getMyWallet(session.accessToken, session.user.id);

    return (
        <div className="w-full min-h-screen bg-(--bg-section-100) flex flex-col items-center">
            <HCustom level={2} className="text-center py-3 mb-3">Sua carteira</HCustom>
            <div className="flex flex-col gap-4 p-6 bg-(--background) rounded-md w-full max-w-[80%] mx-auto mb-3">
                <div className="flex gap-4">
                    <WalletIcon />
                    <h2 className="text-xl font-semibold">Informações</h2>
                </div>

                <div className="flex justify-between">
                    <span>Status</span>
                    <span className={walletOfUser.status === 'ACTIVE' ? 'text-green-600' : 'text-red-500'} >
                        {walletOfUser.status}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>Tem um saldo disponível de : </span>
                    <span className="text-2xl font-bold">R$ {walletOfUser.balance}</span>
                </div>

                <div className="flex flex-col items-center py-3 gap-y-5 justify-between">
                    <span>Gerenciar : </span>
                    <div className="flex justify-around gap-3">
                        <WalletActions wallet={walletOfUser} />
                    </div>
                </div>

            </div>
        </div>
    );

};