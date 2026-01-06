import { Module } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { ProposalController } from './proposal.controller';
import { Proposal } from './entities/proposal.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProposalRepository } from './repository/proposal.repository';

@Module({
  imports: [SequelizeModule.forFeature([Proposal])],
  controllers: [ProposalController],
  providers: [ProposalService, ProposalRepository],
  exports:[ProposalService]
})
export class ProposalModule { }
