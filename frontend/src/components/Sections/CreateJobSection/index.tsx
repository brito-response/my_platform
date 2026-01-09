'use client';

import { WalletCard } from "@/components/WalletCard";
import { WalletProvider } from "@/contexts/wallet_context";
import { FormRegisterJob } from "@/forms";
import { Wallet } from "@/utils/data_types/wallet";

type CreateJobSectionProps = { walletOfUser: Wallet };

export const CreateJobSection: React.FC<CreateJobSectionProps> = ({ walletOfUser }) => {

    return (<div className="min-w-[90%] h-full p-4">
        <WalletProvider initialWallet={walletOfUser}>
            {walletOfUser && (<WalletCard />)}
            <FormRegisterJob />
        </WalletProvider>
    </div>);

};