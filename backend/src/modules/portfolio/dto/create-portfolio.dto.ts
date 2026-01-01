import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePortfolioDto {
  @ApiProperty({example: 'Desenvolvimento Web e Mobile',description: 'Título do portfólio que representa a área de atuação do usuário.'})
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({example: 'Portfólio com projetos desenvolvidos em React, NestJS e Flutter.',description: 'Descrição breve sobre o portfólio do usuário.',})
  @IsOptional()
  @IsString()
  description?: string;
}
