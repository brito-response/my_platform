import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { ProposalStatus } from "../entities/proposal.entity";
import { Type } from "class-transformer";

export class CreateProposalDto {
    @ApiProperty({ example: 2500.50, description: 'Valor proposto para o job (em reais)' })
    @IsNumber()
    value: number;

    @ApiProperty({ example: '2025-12-31T23:59:59Z', description: 'Prazo para entrega do job (formato ISO)' })
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    deadline: Date;

    @ApiProperty({ example: 'Olá! Tenho experiência em projetos similares e entrego antes do prazo.', description: 'Mensagem de apresentação do profissional' })
    @IsString()
    message: string;

    @ApiProperty({ enum: ProposalStatus, example: ProposalStatus.PENDING, description: 'Status inicial da proposta' })
    @IsEnum(ProposalStatus)
    @IsOptional() // geralmente o backend define o status inicial (ex: PENDING)
    status?: ProposalStatus;

    @ApiProperty({ example: '9b9a7b62-fd5a-4e12-9c59-d3b3d6e94c67', description: 'ID do usuário que enviou a proposta' })
    @IsUUID()
    userId: string;

    @ApiProperty({ example: 'bff4bda9-6c5f-4e8f-901b-7caa8b07d112', description: 'ID do job ao qual a proposta está vinculada' })
    @IsUUID()
    jobId: string;
}
