import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber, IsUUID, IsArray, IsDateString, Min, IsISO8601, IsDate } from 'class-validator';
import { JobLevel, StatusJob } from '../entities/job.entity';
import { Type } from 'class-transformer';

export class CreateJobDto {
    @ApiProperty({ example: 'Desenvolvimento de site institucional', description: 'Título do job que será criado.' })
    @IsNotEmpty({ message: 'O título é obrigatório.' })
    @IsString({ message: 'O título deve ser um texto.' })
    title: string;

    @ApiProperty({ example: 'Criação de um site moderno com painel administrativo.', description: 'Descrição detalhada sobre o job.' })
    @IsNotEmpty({ message: 'A descrição é obrigatória.' })
    @IsString({ message: 'A descrição deve ser um texto.' })
    description: string;

    @ApiProperty({ example: 2500, description: 'Orçamento total disponível para o job (em reais).' })
    @IsNotEmpty({ message: 'O orçamento é obrigatório.' })
    @IsNumber({}, { message: 'O orçamento deve ser um número.' })
    @Min(0, { message: 'O orçamento não pode ser negativo.' })
    budget: number;

    @ApiProperty({ example: '2025-12-20T03:00:00.000Z', description: 'Prazo final (ISO 8601).' })
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    deadline: Date;

    @ApiPropertyOptional({ enum: JobLevel, example: JobLevel.LOW, description: 'Level inicial do job (opcional, padrão: LOW).' })
    @IsOptional()
    @IsString({ message: 'O level deve ser uma string válida.' })
    level?: JobLevel;

    @ApiPropertyOptional({ enum: StatusJob, example: StatusJob.OPEN, description: 'Status inicial do job (opcional, padrão: OPEN).' })
    @IsOptional()
    @IsString({ message: 'O status deve ser uma string válida.' })
    status?: StatusJob;

    @ApiPropertyOptional({ example: ['https://github.com/exemplo/projeto', 'https://dribbble.com/exemplo/design',], description: 'Links de referência relacionados ao job (opcional, pode iniciar vazio).' })
    @IsOptional()
    @IsArray({ message: 'Os links devem estar em formato de array.' })
    @IsString({ each: true, message: 'Cada link deve ser uma string.' })
    linksReferences?: string[];

    @ApiProperty({ example: 'f64a0d9b-3a55-44dc-b2c7-382b273a2b88', description: 'Identificador do usuário (UUID) que criou o job.' })
    @IsNotEmpty({ message: 'O ID do usuário é obrigatório.' })
    @IsUUID('4', { message: 'O ID do usuário deve ser um UUID válido.' })
    userId: string;
}
