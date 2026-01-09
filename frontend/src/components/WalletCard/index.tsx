'use client';

import { useWallet } from '@/contexts/wallet_context';
import { WalletIcon } from 'lucide-react';

export const WalletCard = () => {
    const { wallet, debitValue } = useWallet();

    if (!wallet) return null;

    const calcValue = (saldo: number, valuedebit: number) => saldo - valuedebit;

    return (
        <div className="flex flex-col gap-4 p-6 bg-(--background) rounded-md w-full max-w-[80%] mx-auto mb-3">
            <div className="flex gap-4">
                <WalletIcon />
                <h2 className="text-xl font-semibold">
                    Estado da sua Carteira ao criar o Job
                </h2>
            </div>

            <div className="flex justify-between">
                <span>Saldo disponível</span>
                <span className="text-2xl font-bold">
                    R$ {wallet.balance}
                </span>
            </div>

            <div className="flex justify-between">
                <span>Valor a ser retirado</span>
                <span className="text-2xl font-bold text-red-600">
                    R$ {debitValue}
                </span>
            </div>

            {calcValue(wallet.balance, debitValue) >= 0 && debitValue >= 0 ? (
                <div className="flex justify-between">
                    <span>Saldo final</span>
                    <span className="text-2xl font-bold text-green-600">
                        R$ {wallet.balance - debitValue}
                    </span>
                </div>) : (
                <div className="flex justify-between">
                    <span>Saldo final</span>
                    <span className="text-2xl font-bold text-red-600">
                        R$ {wallet.balance - debitValue}
                    </span>
                </div>)}


            <div className="flex justify-between">
                <span>Status</span>
                <span className={wallet.status === 'ACTIVE' ? 'text-green-600' : 'text-red-500'} >
                    {wallet.status}
                </span>
            </div>
        </div>
    );
};
