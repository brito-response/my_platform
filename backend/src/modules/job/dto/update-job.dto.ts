import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-job.dto';
import { IsArray, IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { StatusJob } from '../entities/job.entity';

export class UpdateJobDto extends PartialType(CreateJobDto) {
    
    @ApiPropertyOptional({ example: 'Novo título do job' })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiPropertyOptional({ example: 'Descrição atualizada do projeto' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({ example: '2026-04-15' })
    @IsDateString()
    @IsOptional()
    deadline?: Date;

    @ApiPropertyOptional({ example: 'https://novo-link.com' })
    @IsString()
    @IsOptional()
    linkProject?: string;

    @ApiPropertyOptional({example: ['https://figma.com/file/novo']})
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    linksReferences?: string[];

    @ApiPropertyOptional({enum: StatusJob,example: StatusJob.IN_PROGRESS})
    @IsEnum(StatusJob)
    @IsOptional()
    status?: StatusJob;

};
