import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export interface ResponseCategory {
  categoryId: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

@Exclude()
export class ResponseCategoryDto implements ResponseCategory {

  @Expose()
  @ApiProperty({ example: 'f3a1b2c4-1234-4abc-9def-abcdef123456' })
  categoryId: string;

  @Expose()
  @ApiProperty({ example: 'Desenvolvimento Web' })
  name: string;

  @Expose()
  @ApiPropertyOptional({ example: 'Projetos relacionados a desenvolvimento web', nullable: true })
  description: string | null;

  @Expose()
  @ApiProperty({ example: true })
  isActive: boolean;

  @Expose()
  @ApiProperty({ example: '2026-01-28T23:20:21.738Z' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ example: '2026-01-28T23:20:21.738Z' })
  updatedAt: Date;
};
