import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { TypeWalletStatus, Wallet } from './entities/wallet.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { WalletRepository } from './repository/wallet.repository';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ApiError } from 'src/common/errors/api.error';
import { Transaction } from 'sequelize';

@Injectable()
export class WalletService extends BaseService<Wallet, CreateWalletDto, UpdateWalletDto> {
  constructor(private readonly walletRepository: WalletRepository) {
    super(walletRepository);
  }

  async subtractValueTransaction(userId: string, amount: number, transaction: Transaction): Promise<Wallet> {
    const wallet = await this.walletRepository.findOneByUserId(userId, transaction);

    if (!wallet)
      throw new ApiError('Wallet not found', 404);
    if (wallet.status !== TypeWalletStatus.ACTIVE)
      throw new ApiError('Wallet is not active', 403);
    if (Number(wallet.balance) < amount)
      throw new ApiError('Insufficient balance', 400);

    const newBalance = Number(wallet.balance) - amount;
    const [affected, [updatedWallet]] = await this.walletRepository.updateWithTransaction(wallet.walletId, { balance: newBalance, version: wallet.version + 1, }, transaction);

    if (!affected)
      throw new ApiError('Wallet update conflict', 409);

    return updatedWallet;
  }
}
