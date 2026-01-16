"use client";

import { Wallet } from "@/utils/data_types/wallet";
import { useState } from "react";

export const WalletTransfer = ({ wallet }: { wallet: Wallet }) => {
  const [cpf, setCpf] = useState("");

  return (
    <div className="animate-fade-in bg-gray-50 p-4 rounded-xl">
      <h3 className="font-semibold mb-3">Transferir saldo</h3>

      <input placeholder="CPF do destinatário" value={cpf} onChange={(e) => setCpf(e.target.value)} className="input"/>

      {/* aqui depois você busca a carteira do CPF */}
      <div className="mt-4 text-sm text-gray-600">
        Saldo disponível: R$ {wallet.balance}
      </div>

      <button className="btn-primary mt-4">
        Confirmar transferência 🔄
      </button>
    </div>
  );
}
