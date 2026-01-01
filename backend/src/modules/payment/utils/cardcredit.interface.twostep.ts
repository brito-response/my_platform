interface ItemsPayload {
    items: ItemPayload[];
}

interface ItemPayload {
    name: string;
    value: number;
    amount: number;
}

// twostep
interface CreditCardCustomer {
    name: string;
    cpf: string;
    email: string;
    phone_number: string;
}

interface CreditCardPayment {
    customer: CreditCardCustomer;
    installments: number;
    payment_token: string;
}

interface CreditCardPaymentPayload {
    payment: {
        credit_card: CreditCardPayment;
    };
}

// RESPONSES

enum ChargeStatus {
    NEW = 'new',
    WAITING = 'waiting',
    PAID = 'paid',
    CANCELED = 'canceled',
}

interface ChargeCreationData {
    charge_id: string;
    status: ChargeStatus;
    total: number;
    custom_id: string | null;
    created_at: string;  // data/hora (string no formato da API)
}

interface ChargeCreationResponse {
    code: number;
    data: ChargeCreationData;
}


export type { ItemsPayload, ItemPayload, CreditCardPaymentPayload, ChargeCreationResponse };