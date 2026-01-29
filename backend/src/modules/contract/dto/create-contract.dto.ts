import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { ContractStatus, PaymentStatus } from "../entities/contract.entity";

export class CreateContractDto {

    @ApiProperty({ description: 'Data de início do contrato', example: '2026-01-01' })
    @IsDateString()
    @IsNotEmpty()
    startDate: Date;

    @ApiProperty({ description: 'Data de término do contrato', example: '2026-12-31' })
    @IsDateString()
    @IsNotEmpty()
    endDate: Date;

    @ApiProperty({ description: 'Status atual do contrato', enum: ContractStatus, example: ContractStatus.ACTIVE })
    @IsEnum(ContractStatus)
    status: ContractStatus;

    @ApiProperty({ description: 'Status do pagamento do contrato', enum: PaymentStatus, example: PaymentStatus.PENDING })
    @IsEnum(PaymentStatus)
    paymentStatus: PaymentStatus;

    @ApiProperty({ description: 'Identificador do job relacionado ao contrato', example: '9c3b1a0f-5d7e-4a8c-9e12-abcdef123456' })
    @IsUUID()
    @IsNotEmpty()
    jobId: string;

};
