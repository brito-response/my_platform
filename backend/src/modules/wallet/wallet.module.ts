import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wallet } from './entities/wallet.entity';
import { WalletRepository } from './repository/wallet.repository';

@Module({
  imports:[SequelizeModule.forFeature([Wallet])],
  controllers: [WalletController],
  providers: [WalletService, WalletRepository],
  exports:[WalletService],
})
export class WalletModule { }
