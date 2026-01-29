import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsPositive, IsUUID } from 'class-validator';
import { JobFrellaStatus } from '../entities/jobfrella.entity';

export class CreateJobFrellaDto {
    @ApiProperty({ description: 'Identificador do job relacionado', example: 'b9e21d0f-7c3a-4f8e-8a55-abcdef987654' })
    @IsUUID()
    jobId: string;

    @ApiProperty({ description: 'Identificador do freelancer (usuário) da proposta', example: 'a3f1c9c4-2d5a-4f88-9e11-abcdef123456' })
    @IsUUID()
    freelancerId: string;

    @ApiProperty({ description: 'Identificador da proposta que originou o JobFrella', example: 'c4d5e6f7-1234-4abc-8d9e-abcdef654321' })
    @IsUUID()
    proposalId: string;

    @ApiProperty({ description: 'Valor que o freelancer irá receber', example: 3500 })
    @IsNumber()
    @IsPositive()
    amountToReceive: number;

    @ApiProperty({ description: 'Status do JobFrella', enum: JobFrellaStatus, example: JobFrellaStatus.APPROVED })
    @IsEnum(JobFrellaStatus)
    status: JobFrellaStatus;
};
