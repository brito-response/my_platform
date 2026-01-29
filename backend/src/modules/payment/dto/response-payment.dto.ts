import { Exclude, Expose, Transform } from 'class-transformer';
import { PaymentMethod, TransactionStatus } from '../entities/payment.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export interface ResponsePayment {
    paymentId: string;
    amount: number;
    method: PaymentMethod | null;
    transaction_status: TransactionStatus;
    numberOfInstallments?: number;
    paymentsMonths: boolean[];
    chargeId?: string;
    txId?: string;
    locId?: string;
    qrCode?: string;
    imageQrCode?: string;
    code: string;
    datePayment?: Date;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};

@Exclude()
export class ResponsePaymentDto implements ResponsePayment {

    @Expose()
    @ApiProperty({ example: '5f4e8c2a-7c2d-4d5a-9f2b-123456789abc' })
    paymentId: string;

    @Expose()
    @ApiProperty({ example: 199.90, description: 'Payment amount' })
    @Transform(({ value }) => Number(value))
    amount: number;

    @Expose()
    @ApiPropertyOptional({ enum: PaymentMethod, example: PaymentMethod.PIX, nullable: true })
    method: PaymentMethod | null;

    @Expose()
    @ApiProperty({ enum: TransactionStatus, example: TransactionStatus.APPROVED })
    transaction_status: TransactionStatus;

    @Expose()
    @ApiPropertyOptional({ example: 3 })
    numberOfInstallments?: number;

    @Expose()
    @ApiProperty({ type: [Boolean], example: [true, true, false, false, false, false, false, false, false, false, false, false] })
    paymentsMonths: boolean[];

    @Expose()
    @ApiPropertyOptional({ example: 'ch_1Nabc123' })
    chargeId?: string;

    @Expose()
    @ApiPropertyOptional({ example: 'tx_123456' })
    txId?: string;

    @Expose()
    @ApiPropertyOptional({ example: 'loc_987654' })
    locId?: string;

    @Expose()
    @ApiPropertyOptional({ example: '00020126360014BR.GOV.BCB.PIX...' })
    qrCode?: string;

    @Expose()
    @ApiPropertyOptional({ example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...' })
    imageQrCode?: string;

    @Expose()
    @ApiProperty({ example: 'PAY-2026-0001' })
    code: string;

    @Expose()
    @ApiPropertyOptional({ example: '2026-01-28T23:20:21.738Z' })
    datePayment?: Date;

    @Expose()
    @ApiProperty({ example: 'b8c1f1d4-7a5c-4b8f-9b1a-123456789abc' })
    userId: string;

    @Expose()
    @ApiProperty({ example: '2026-01-28T23:20:21.738Z' })
    createdAt: Date;

    @Expose()
    @ApiProperty({ example: '2026-01-28T23:20:21.738Z' })
    updatedAt: Date;
}