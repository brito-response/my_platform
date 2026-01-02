import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { Job } from './entities/job.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { JobRepository } from './repository/job.repository';
import { UserModule } from '../user/user.module';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [SequelizeModule.forFeature([Job]), UserModule, WalletModule],
  controllers: [JobController],
  providers: [JobService, JobRepository],
})
export class JobModule { }
