import { forwardRef, Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wallet } from './entities/wallet.entity';
import { WalletRepository } from './repository/wallet.repository';
import { JobModule } from '../job/job.module';
import { JobfrellasModule } from '../jobfrellas/jobfrellas.module';

@Module({
  imports: [SequelizeModule.forFeature([Wallet]), forwardRef(() => JobModule), JobfrellasModule],
  controllers: [WalletController],
  providers: [WalletService, WalletRepository],
  exports: [WalletService],
})
export class WalletModule { }
