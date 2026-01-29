import { Exclude, Expose } from "class-transformer";
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

    @ApiProperty({ example: '9c1c5b4a-8a5b-4a0d-9d6c-123456789abc' })
    @Expose()
    walletId: string;

    @ApiProperty({ example: 'Main Wallet' })
    @Expose()
    name: string;

    @ApiProperty({ example: 1500.75 })
    @Expose()
    balance: number;

    @ApiProperty({ example: 200.0 })
    @Expose()
    blockedBalance: number;

    @ApiProperty({ example: 'BRL' })
    @Expose()
    currency: string;

    @ApiProperty({ enum: TypeWalletStatus, example: TypeWalletStatus.ACTIVE })
    @Expose()
    status: TypeWalletStatus;

    @ApiProperty({ example: 0 })
    @Expose()
    version: number;

    @ApiProperty({ example: 'b8c1f1d4-7a5c-4b8f-9b1a-123456789abc' })
    @Expose()
    userId: string;

    @ApiPropertyOptional({ example: '2024-01-01T12:00:00.000Z' })
    @Expose()
    createdAt?: Date;

    @ApiPropertyOptional({ example: '2024-01-01T12:00:00.000Z' })
    @Expose()
    updatedAt?: Date;
    
};