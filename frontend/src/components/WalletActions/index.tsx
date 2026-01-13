"use client";

import { useState } from "react";
import { ButtonCreate, ButtonRemove, ButtonTransfer } from "@/components/Buttons";
import { Wallet } from "@/utils/data_types/wallet";
import { WalletAdd, WalletTransfer, WalletWithdraw } from "../Sections/WalletSections";

type ActionType = "ADD" | "TRANSFER" | "WITHDRAW" | null;

interface Props {
    wallet: Wallet;
}

export default function WalletActions({ wallet }: Props) {
    const [action, setAction] = useState<ActionType>(null);

    const handleToggle = (type: ActionType) => {
        setAction((prev) => (prev === type ? null : type));
    };

    return (
        <div className="w-full">
            {/* BOTÕES */}
            <div className="flex gap-3">
                <ButtonCreate onClick={() => handleToggle("ADD")} />
                <ButtonTransfer onClick={() => handleToggle("TRANSFER")} />
                <ButtonRemove onClick={() => handleToggle("WITHDRAW")} />
            </div>

            {/* CONTEÚDO EXPANSÍVEL */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out${action ? "max-h-[500px] mt-4" : "max-h-0"}`}>
                {action === "ADD" && <WalletAdd />}
                {action === "TRANSFER" && <WalletTransfer wallet={wallet} />}
                {action === "WITHDRAW" && <WalletWithdraw />}
            </div>
        </div>
    );
};
