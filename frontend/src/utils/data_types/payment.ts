export enum PaymentMethod {
    CARD = "card",
    PIX = "pix",
    BOLETO = "boleto",
}

export interface PaymentInput {
    value: number;
    method: PaymentMethod;
    paymentToken?: string | undefined;
    numberOfInstallments?: number | undefined;
};

export interface PaymentOut {
    paymentId:string;
    type: 'pix' | 'card';
    status: 'approved';
    qrCodeImage?: string;
    copyPaste?: string;
};

export interface EfiWebhookInput {
    evento: string;
    data: {
        id?: number;
        txid?: string;
        status?: string;
        valor?: string;
        charge_id?: string;
        payment?: any;
    };
}
