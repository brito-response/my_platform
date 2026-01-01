import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'Meu projeto incrível' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Um projeto para portfólio pessoal' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'https://github.com/meuprojeto' })
  @IsUrl()
  @IsNotEmpty()
  link: string;
  
  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  favorite?: boolean;

  @ApiProperty({ example: 'b3c2486f-4aa5-4817-94bd-22a27c3dcfa6' })
  @IsUUID()
  @IsNotEmpty()
  portfolioId: string;
}