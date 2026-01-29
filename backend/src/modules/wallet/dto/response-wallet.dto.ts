import { Exclude, Expose, Transform } from "class-transformer";
import { TypeWalletStatus } from "../entities/wallet.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export interface ResponseWallet {
    walletId: string;
    name: string;
    balance: number;
    blockedBalance: number;
    currency: string;
    status: TypeWalletStatus;
    version: number;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
};

@Exclude()
export class ResponseWalletDto implements ResponseWallet {

    @Expose()
    @ApiProperty({ example: '9c1c5b4a-8a5b-4a0d-9d6c-123456789abc' })
    walletId: string;

    @Expose()
    @ApiProperty({ example: 'Main Wallet' })
    name: string;

    @Expose()
    @ApiProperty({ example: 1500.75 })
    @Transform(({ value }) => Number(value))
    balance: number;

    @Expose()
    @ApiProperty({ example: 200.0 })
    @Transform(({ value }) => Number(value))
    blockedBalance: number;

    @Expose()
    @ApiProperty({ example: 'BRL' })
    currency: string;

    @Expose()
    @ApiProperty({ enum: TypeWalletStatus, example: TypeWalletStatus.ACTIVE })
    status: TypeWalletStatus;

    @Expose()
    @ApiProperty({ example: 0 })
    version: number;

    @Expose()
    @ApiProperty({ example: 'b8c1f1d4-7a5c-4b8f-9b1a-123456789abc' })
    userId: string;

    @Expose()
    @ApiPropertyOptional({ example: '2024-01-01T12:00:00.000Z' })
    createdAt?: Date;

    @Expose()
    @ApiPropertyOptional({ example: '2024-01-01T12:00:00.000Z' })
    updatedAt?: Date;
    
};