'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Wallet } from '@/utils/data_types/wallet';

type WalletContextType = {
    wallet: Wallet | null;
    setWallet: (wallet: Wallet) => void;
    debitValue: number;
    setDebitValue: (value: number) => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children, initialWallet }: { children: ReactNode; initialWallet: Wallet; }) => {
    const [wallet, setWallet] = useState<Wallet | null>(initialWallet);
    const [debitValue, setDebitValue] = useState<number>(0);

    return (
        <WalletContext.Provider value={{ wallet, setWallet, debitValue, setDebitValue, }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) throw new Error('useWallet must be used within WalletProvider');
    return context;
};
