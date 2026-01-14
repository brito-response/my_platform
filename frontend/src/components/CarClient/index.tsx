"use client";

import { useState, useMemo } from "react";
import { CreditCard, QrCode } from "lucide-react";
import { HCustom } from "../Texts/HCustom";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


type CardItemResponse = { payment_token: string; card_mask: string; brand: string; };
type CarClientProps = { addValue: number };
export const CarClient: React.FC<CarClientProps> = ({ addValue }) => {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState<"card" | "pix" | "boleto">("card");

    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardExp, setCardExp] = useState("");
    const [cardCvv, setCardCvv] = useState("");
    const [isCvvFocused, setIsCvvFocused] = useState(false);
    const [installmentsSelected, setInstallmentsSelected] = useState(1);
    const [pixQrCodeUrl, setPixQrCodeUrl] = useState<string>("imagem/default");
    const [pixCopyPaste, setPixCopyPaste] = useState<string>("");

    const installments = useMemo(() => {
        const max = 12;
        const list = [];
        for (let i = 1; i <= max; i++) {
            list.push({ quantity: i, value: addValue / i });
        }
        return list;
    }, [addValue]);

    function detectCardBrand(cardNumber: string): "visa" | "mastercard" | "amex" | "elo" | "hipercard" | "discover" | "diners" | null {
        const number = cardNumber.replace(/\D/g, "");

        if (/^4/.test(number)) return "visa";
        if (/^5[1-5]/.test(number) || /^2(2[2-9]|[3-6]|7[01])/.test(number)) return "mastercard";
        if (/^3[47]/.test(number)) return "amex";
        if (/^(4011|4312|4389|4514|4576|5041|5067|5090|6277|6362|6363)/.test(number)) return "elo";
        if (/^(606282|3841)/.test(number)) return "hipercard";
        if (/^6(011|5)/.test(number)) return "discover";
        if (/^3(0[0-5]|[68])/.test(number)) return "diners";
        return null;
    }

    const handleCheckout = async () => {
        let paymentToken = null;
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cars`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ walletId: 1, value: addValue }),
            });
            const order = await response.json();

            if (paymentMethod === "card") {
                // @ts-ignore
                const checkout = new window.EfiCheckout({ sandbox: true }); // false em produção
                const [month, year] = cardExp.split("/");

                const result: CardItemResponse = await checkout.createPaymentToken({ brand: detectCardBrand(cardNumber) ?? "undefined brand", number: cardNumber.replace(/\s/g, ""), cvv: cardCvv, expiration_month: month, expiration_year: `20${year}`, holder_name: cardName });
                if (!result?.payment_token) {
                    toast.error("Erro ao gerar token do cartão");
                    return;
                }
                paymentToken = result.payment_token;

                const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({}),
                });

                if (res.ok) {
                    toast.success("Pedido realizado com sucesso!");
                    router.push("/manager");
                }
                else toast.error("Erro ao realizar o pedido");
            }

            else if (paymentMethod === "pix") {
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ }),
                });
                if (res.ok) {
                    toast.success("Pedido realizado com sucesso!");
                    router.push("/manager");
                }
            }

            else if (paymentMethod === "boleto") {

            }
            else { toast.warn("método de pagamento não selecionado.") }
        } catch {
            toast.error("Erro ao realizar o pedido.");
        }
    };

    return (
        <div className="w-full h-full">
            <HCustom level={5} className="my-5">Resumo</HCustom>
            <div className="text-(--text-color) flex justify-between text-lg font-semibold mb-6">
                <span>Total:</span>
                <span className="text-blue-600">R$ {addValue.toFixed(2)}</span>
            </div>
            <HCustom level={6} className="my-5">Forma de pagamento</HCustom>
            <div className="space-y-3">
                {
                    [
                        { id: "card", label: "Cartão de Crédito", icon: <CreditCard /> },
                        { id: "pix", label: "QR Code Pix", icon: <QrCode /> }
                    ].map((method) => (
                        <button key={method.id} onClick={() => setPaymentMethod(method.id as any)} className={`w-full text-(--text-color) flex items-center gap-3 p-3 rounded-lg border transition ${paymentMethod === method.id ? "border-blue-600 bg-blue-400" : "border-gray-300 hover:bg-gray-100"}`}>
                            {method.icon} {method.label}
                        </button>
                    ))}
            </div>

            {/* FORM CARTÃO */}
            {paymentMethod === "card" && (
                <div className="mt-8">

                    {/* CARTÃO BONITO */}
                    <div className="w-full flex justify-center mb-6">
                        <div className="relative w-80 h-48 perspective">
                            <div className={`relative w-full h-full rounded-2xl shadow-xl transition-transform duration-700 ${isCvvFocused ? "rotate-y-180" : ""}`} style={{ transformStyle: "preserve-3d" }}>

                                {/* Frente */}
                                <div className="absolute inset-0 bg-linear-to-br from-blue-600 to-blue-400 rounded-2xl text-white p-5 flex flex-col justify-between" style={{ backfaceVisibility: "hidden" }}>
                                    <div className="text-lg tracking-widest">
                                        {cardNumber || "**** **** **** ****"}
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <div><div className="opacity-70">Nome</div><div className="uppercase">{cardName || "SEU NOME"}</div>
                                        </div>
                                        <div>
                                            <div className="opacity-70">Validade</div>
                                            <div>{cardExp || "MM/AA"}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Verso */}
                                <div className="absolute inset-0 bg-gray-800 rounded-2xl p-5 text-white rotate-y-180" style={{ backfaceVisibility: "hidden" }}>
                                    <div className="bg-black h-10 mt-5"></div>
                                    <div className="mt-6">
                                        <div className="text-xs opacity-70">CVV</div>
                                        <div className="bg-white text-black w-20 p-2 rounded text-center">
                                            {cardCvv || "***"}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* CAMPOS DO FORM */}
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Número do Cartão</label>
                            <input maxLength={19} value={cardNumber} onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim())}
                                onFocus={() => setIsCvvFocused(false)} className="w-full mt-1 p-3 border rounded-lg focus:outline-blue-600" placeholder="1111 2222 3333 4444"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Nome Impresso</label>
                            <input value={cardName} onChange={(e) => setCardName(e.target.value.toUpperCase())} onFocus={() => setIsCvvFocused(false)}
                                className="w-full mt-1 p-3 border rounded-lg focus:outline-blue-600"
                                placeholder="SEU NOME"
                            />
                        </div>

                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="text-sm font-medium text-gray-700">Validade</label>
                                <input maxLength={5} value={cardExp} onChange={(e) => setCardExp(e.target.value.replace(/\D/g, "").replace(/(\d{2})(\d{1,2})/, "$1/$2"))} onFocus={() => setIsCvvFocused(false)} className="w-full mt-1 p-3 border rounded-lg focus:outline-blue-600" placeholder="MM/AA" />
                            </div>

                            <div className="w-1/2">
                                <label className="text-sm font-medium text-gray-700">CVV</label>
                                <input maxLength={3} value={cardCvv} onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))} onFocus={() => setIsCvvFocused(true)} className="w-full mt-1 p-3 border rounded-lg focus:outline-blue-600" placeholder="123" />
                            </div>
                        </div>
                    </div>

                    {/* 🔥 PARCELAMENTO */}
                    <div className="mt-6">
                        <label className="text-sm font-medium text-gray-700">Parcelamento</label>
                        <select value={installmentsSelected} onChange={(e) => setInstallmentsSelected(Number(e.target.value))} className="w-full mt-1 p-3 border rounded-lg focus:outline-blue-600">
                            {installments.map((p) => (
                                <option key={p.quantity} value={p.quantity}>
                                    {p.quantity}x de R$ {p.value.toFixed(2)}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>
            )}

            {/* FORM pix */}
            {paymentMethod === "pix" && (
                <div className="mt-8 space-y-6">

                    {/* QR CODE */}
                    <div className="flex flex-col items-center">
                        <div className="p-4 border rounded-xl shadow bg-white">
                            <img
                                src={pixQrCodeUrl}
                                alt="QR Code Pix"
                                className="w-56 h-56"
                            />
                        </div>

                        <p className="mt-3 text-sm text-gray-600 text-center">
                            Escaneie o QR Code com o app do seu banco
                        </p>
                    </div>

                    {/* COPIA E COLA */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            PIX copia e cola
                        </label>

                        <div className="flex gap-2 mt-1">
                            <textarea
                                readOnly
                                value={pixCopyPaste}
                                rows={3}
                                className="w-full p-3 border rounded-lg resize-none text-sm focus:outline-none"
                            />

                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(pixCopyPaste);
                                    toast.success("Código PIX copiado!");
                                }}
                                className="px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                            >
                                Copiar
                            </button>
                        </div>
                    </div>

                    <div className="text-sm text-gray-500 text-center">
                        Após o pagamento, a confirmação pode levar alguns segundos.
                    </div>

                </div>
            )}


            <button onClick={handleCheckout} className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
                Finalizar Pedido
            </button>
        </div>
    );
};
