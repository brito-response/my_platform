import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { Wallet } from './entities/wallet.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { WalletRepository } from './repository/wallet.repository';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Injectable()
export class WalletService extends BaseService<Wallet,CreateWalletDto, UpdateWalletDto> {
  constructor(private readonly walletRepository: WalletRepository) {
    super(walletRepository);
   }
}
