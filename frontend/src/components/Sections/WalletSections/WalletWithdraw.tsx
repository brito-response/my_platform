"use client";

export const WalletWithdraw = () => {
  return (
    <div className="animate-fade-in bg-gray-50 p-4 rounded-xl">
      <h3 className="font-semibold mb-3">Retirar saldo</h3>

      <input placeholder="Valor" className="input" />
      <input placeholder="Chave Pix ou conta bancária" className="input mt-2" />

      <p className="text-xs text-gray-500 mt-3">
        O valor será creditado em até <strong>3 dias úteis</strong>.
      </p>

      <button className="btn-danger mt-4">
        Solicitar retirada
      </button>
    </div>
  );
}
