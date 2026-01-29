import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ContractStatus, PaymentStatus } from '../entities/contract.entity';

export interface ResponseContract {
  contractId: string;
  startDate: Date;
  endDate: Date;
  status: ContractStatus;
  paymentStatus: PaymentStatus;
  jobId: string;
  createdAt: Date;
  updatedAt: Date;
};

@Exclude()
export class ResponseContractDto implements ResponseContract {

  @Expose()
  @ApiProperty({ example: 'c1a2b3d4-5678-4abc-9def-abcdef123456' })
  contractId: string;

  @Expose()
  @ApiProperty({ example: '2026-02-01T00:00:00.000Z' })
  startDate: Date;

  @Expose()
  @ApiProperty({ example: '2026-06-01T00:00:00.000Z' })
  endDate: Date;

  @Expose()
  @ApiProperty({ enum: ContractStatus, example: ContractStatus.ACTIVE })
  status: ContractStatus;

  @Expose()
  @ApiProperty({ enum: PaymentStatus, example: PaymentStatus.PENDING })
  paymentStatus: PaymentStatus;

  @Expose()
  @ApiProperty({ example: 'a7b8c9d0-1234-4abc-9def-abcdef987654' })
  jobId: string;

  @Expose()
  @ApiProperty({ example: '2026-01-28T23:20:21.738Z' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ example: '2026-01-28T23:20:21.738Z' })
  updatedAt: Date;
};
