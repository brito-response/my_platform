interface ItemCreditCard {
    name: string;
    value: number;
    amount: number
}

interface Customer {
    name: string;
    cpf: string;
    email: string;
    phone_number: string;
}
interface Credit_Card {
    customer: Customer;
    installments: number;
    payment_token: string;

}

interface Payment {
    credit_card: Credit_Card;
}

interface CreditCardCreateChargeRequest {
    items: ItemCreditCard[];
    payment: Payment;
}


// RESPONSE
enum CreditCardPaymentStatus {
    APPROVED = 'approved',
    AUTHORIZED = 'authorized',
    DECLINED = 'declined',
    CANCELED = 'canceled',
    REFUNDED = 'refunded',
    WAITING = 'waiting'
}

interface CreditCardPaymentData {
    installments: number;
    installment_value: number; // valor em centavos
    charge_id: string;
    status: CreditCardPaymentStatus;
    total: number; // valor total em centavos
    payment: PaymentMethod;
}

interface CreditCardChangePaymentResponse {
    code: number;
    data: CreditCardPaymentData;
}

enum PaymentMethod {
    CREDIT_CARD = 'credit_card',
}

export type { ItemCreditCard, Customer, Credit_Card, CreditCardCreateChargeRequest, CreditCardChangePaymentResponse };