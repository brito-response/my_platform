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

export type {Customer, ChargeItem };
