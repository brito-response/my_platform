import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export enum PaymentMethod {
    PIX = 'pix',
    CARD = 'card',
    BOLETO = 'boleto',
}
export class CreatePaymentDto {
    @ApiProperty({ example: 150.50, description: 'Valor a ser creditado na carteira', minimum: 1 })
    @IsNumber()
    @IsPositive()
    value: number;

    @ApiProperty({ enum: PaymentMethod, example: PaymentMethod.PIX })
    @IsEnum(PaymentMethod)
    method: PaymentMethod;

    /** 🔐 Apenas para cartão */
    @ApiProperty({ required: false, description: 'Token do cartão retornado pelo gateway' })
    @IsOptional()
    @IsString()
    paymentToken?: string;

    /** 🔐 Parcelamento (cartão) */
    @ApiProperty({ required: false, example: 1, description: 'Número de parcelas' })
    @IsOptional()
    @Min(1)
    numberOfInstallments?: number;
}
