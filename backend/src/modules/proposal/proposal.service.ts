import { Injectable } from '@nestjs/common';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { BaseService } from 'src/common/base/base.service';
import { Proposal, ProposalStatus } from './entities/proposal.entity';
import { ProposalRepository } from './repository/proposal.repository';
import { ApiError } from 'src/common/errors/api.error';
import { ProposalsData } from './dto/proposal-report.dto';

@Injectable()
export class ProposalService extends BaseService<Proposal, CreateProposalDto> {
  constructor(private readonly proposalRepository: ProposalRepository) {
    super(proposalRepository);
  }

  async findByJob(jobId: string): Promise<Proposal[]> {
    return await this.proposalRepository.findByJob(jobId);
  }

  async findByUser(userId: string): Promise<Proposal[]> {
    return await this.proposalRepository.findByUser(userId);
  }

  async acceptProposal(id: string): Promise<Proposal> {
    const proposal = await this.proposalRepository.findOne(id);
    if (!proposal) throw new ApiError('Proposal not found', 404);

    proposal.status = ProposalStatus.ACCEPTED;
    await proposal.save();

    return proposal;
  }

  async getReports(): Promise<ProposalsData> {
      return await this.proposalRepository.findAllProposalsData();
    }
}
