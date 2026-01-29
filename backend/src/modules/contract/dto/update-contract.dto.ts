import { PartialType } from '@nestjs/mapped-types';
import { CreateContractDto } from './create-contract.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { ContractStatus, PaymentStatus } from '../entities/contract.entity';

export class UpdateContractDto extends PartialType(CreateContractDto) {
    @ApiPropertyOptional({description: 'Nova data de término do contrato (prorrogação)',example: '2027-01-31'})
    @IsDateString()
    @IsOptional()
    endDate?: Date;

    @ApiPropertyOptional({description: 'Status do contrato',enum: ContractStatus,example: ContractStatus.COMPLETED})
    @IsEnum(ContractStatus)
    @IsOptional()
    status?: ContractStatus;

    @ApiPropertyOptional({description: 'Status do pagamento',enum: PaymentStatus,example: PaymentStatus.PAID})
    @IsEnum(PaymentStatus)
    @IsOptional()
    paymentStatus?: PaymentStatus;
}
