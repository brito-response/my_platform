interface ChargeItem {
    name: string;
    value: number; // em centavos
    amount: number;
}

interface Customer {
    name: string;
    cpf: string;
    email: string;
    phone_number: string;
}

interface PaymentResponse {
    paymentId:string;
    type: 'pix' | 'card';
    status: 'approved';
    qrCodeImage?: string;
    copyPaste?: string;
}

export type { Customer, ChargeItem, PaymentResponse };
