"use client";

import { CarClient } from "@/components/CarClient";

export const WalletAdd = () => {
  return (
    <div className="w-full animate-fade-in bg-gray-50 p-4 rounded-xl">
      <h3 className="font-semibold mb-3">Adicionar saldo</h3>
      <div className="flex flex-col gap-3">
        <CarClient carItems={[]} />
      </div>
    </div>
  );
}
