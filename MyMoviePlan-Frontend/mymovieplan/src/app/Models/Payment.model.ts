export interface Payment {
    id?: number;
    amount: number;
    paymentDate: Date;
    cardNumber: string;
    cardExpiryMonth: string;
    cardExpiryYear: string;
    cardCVV: string;
}