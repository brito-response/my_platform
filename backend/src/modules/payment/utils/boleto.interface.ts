interface BankingBilletCustomer {
    name: string;
    cpf: string;
    email: string;
    phone_number: string;
}

interface BankingBilletAddress {
    street: string;
    number: string;
    neighborhood: string;
    zipcode: string;
    city: string;
    complement: string;
    state: string; // UF (ex: MG)
}

interface BankingBilletPayment {
    customer: BankingBilletCustomer;
    address: BankingBilletAddress;
    expire_at: string; // YYYY-MM-DD
    configurations: BankingBilletConfigurations;
    message: string;
}

interface BankingBilletInterest {
    value: number; // juros em centavos
    type: 'daily' | 'monthly';
}

interface BankingBilletConfigurations {
    days_to_write_off: number;
    fine: number; // multa em centavos
    interest: BankingBilletInterest;
}

interface BankingBilletPaymentPayload {
    payment: {
        banking_billet: BankingBilletPayment;
    };
}

// RESPONSE

enum BankingBilletStatus {
    WAITING = 'waiting',
    PAID = 'paid',
    CANCELED = 'canceled',
    EXPIRED = 'expired',
}

enum PaymentMethod {
    BANKING_BILLET = 'banking_billet',
}

interface BankingBilletPdf {
    charge: string; // link do PDF
}

interface BankingBilletPix {
    qrcode: string;        // copia e cola (BR Code)
    qrcode_image: string; // base64 image
}

interface BankingBilletResponseData {
    barcode: string;
    pix: BankingBilletPix;
    link: string;
    billet_link: string;
    pdf: BankingBilletPdf;
    expire_at: string; // YYYY-MM-DD
    charge_id: number;
    status: BankingBilletStatus;
    total: number; // centavos
    payment: PaymentMethod;
}

interface BankingBilletResponse {
    code: number;
    data: BankingBilletResponseData;
}


//others
interface AddressItem {
    street: string;
    number: string;
    neighborhood: string;
    zipcode: string;
    city: string;
    complement: string;
    state: string; // UF (ex: MG)
}
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

interface BoletoChargePayload {
    items: ChargeItem[];
    customer: Customer;
    address: AddressItem;
    expireAt: string;
}

export type { AddressItem, BoletoChargePayload, BankingBilletPaymentPayload, BankingBilletResponse };