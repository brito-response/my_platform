import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({ description: 'Nome da categoria', example: 'Tecnologia', })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({ description: 'Descrição da categoria', example: 'Categorias relacionadas a vagas de tecnologia', })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({ description: 'Define se a categoria está ativa', example: true, default: true, })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
