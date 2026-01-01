import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { Wallet } from './entities/wallet.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { WalletRepository } from './repository/wallet.repository';

@Injectable()
export class WalletService extends BaseService<Wallet,CreateWalletDto> {
  constructor(private readonly walletRepository: WalletRepository) {
    super(walletRepository);
   }
}
