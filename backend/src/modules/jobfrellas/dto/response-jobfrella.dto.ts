import { Exclude, Expose, Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { JobFrellaStatus } from '../entities/jobfrella.entity';

export interface ResponseJobFrella {
  jobFrellaId: string;
  amountToReceive: number;
  status: JobFrellaStatus;
  userId: string;
  jobId: string;
  createdAt: Date;
  updatedAt: Date;
};

@Exclude()
export class ResponseJobFrellaDto implements ResponseJobFrella {

  @Expose()
  @ApiProperty({ example: '9a7c2d4e-1f23-4a9b-b123-abcdef123456' })
  jobFrellaId: string;

  @Expose()
  @ApiProperty({ example: 1500.75 })
  @Transform(({ value }) => Number(value))
  amountToReceive: number;

  @Expose()
  @ApiProperty({ enum: JobFrellaStatus, example: JobFrellaStatus.PENDING })
  status: JobFrellaStatus;

  @Expose()
  @ApiProperty({ example: 'b8c1f1d4-7a5c-4b8f-9b1a-123456789abc' })
  userId: string;

  @Expose()
  @ApiProperty({ example: 'c7a2e9d1-8b4e-4a1f-9c2d-abcdef987654' })
  jobId: string;

  @Expose()
  @ApiProperty({ example: '2026-01-28T23:20:21.738Z' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ example: '2026-01-28T23:20:21.738Z' })
  updatedAt: Date;
};