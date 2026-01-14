"use client";

import { CarClient } from "@/components/CarClient";
import { useState } from "react";

export const WalletAdd = () => {
  const [money, setMoney] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < 0) return;
    setMoney(value);
  };

  return (
    <div className="w-full animate-fade-in bg-gray-50 p-4 rounded-xl">
      <h3 className="font-semibold mb-3">Adicionar saldo</h3>

      <input type="number" min={0} step="0.50" value={money} onChange={handleChange} placeholder="Digite o valor" className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <p className="text-sm text-gray-600 mt-2">
        Valor para adição: <strong>R$ {money.toFixed(2)}</strong>
      </p>

      <div className="flex flex-col gap-3 mt-4">
        <CarClient addValue={money} />
      </div>
    </div>
  );
};
