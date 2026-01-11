import { forwardRef, Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { Job } from './entities/job.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { JobRepository } from './repository/job.repository';
import { UserModule } from '../user/user.module';
import { WalletModule } from '../wallet/wallet.module';
import { ProposalModule } from '../proposal/proposal.module';
import { JobfrellasModule } from '../jobfrellas/jobfrellas.module';

@Module({
  imports: [SequelizeModule.forFeature([Job]), UserModule, forwardRef(() => WalletModule), forwardRef(() => ProposalModule), JobfrellasModule],
  controllers: [JobController],
  providers: [JobService, JobRepository],
  exports: [JobService]
})
export class JobModule { }
