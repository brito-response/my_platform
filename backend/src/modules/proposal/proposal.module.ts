import { forwardRef, Module } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { ProposalController } from './proposal.controller';
import { Proposal } from './entities/proposal.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProposalRepository } from './repository/proposal.repository';
import { JobModule } from '../job/job.module';
import { JobfrellasModule } from '../jobfrellas/jobfrellas.module';

@Module({
  imports: [SequelizeModule.forFeature([Proposal]), forwardRef(() => JobModule), forwardRef(() => JobfrellasModule)],
  controllers: [ProposalController],
  providers: [ProposalService, ProposalRepository],
  exports: [ProposalService]
})
export class ProposalModule { }
