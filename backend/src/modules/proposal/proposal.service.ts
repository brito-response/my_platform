import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { BaseService } from 'src/common/base/base.service';
import { Proposal, ProposalStatus } from './entities/proposal.entity';
import { ProposalRepository } from './repository/proposal.repository';
import { ApiError } from 'src/common/errors/api.error';
import { UpdateProposalDto } from './dto/update-proposal.dto';
import { Transaction } from 'sequelize';
import { JobService } from '../job/job.service';
import { Sequelize } from 'sequelize-typescript';
import { JobfrellasService } from '../jobfrellas/jobfrellas.service';
import { JobFrellaStatus } from '../jobfrellas/entities/jobfrella.entity';
import { ProposalsData } from './dto/response-proposal-reports.dto';

@Injectable()
export class ProposalService extends BaseService<Proposal, CreateProposalDto, UpdateProposalDto> {
  constructor(private readonly proposalRepository: ProposalRepository,
    @Inject(forwardRef(() => JobService))
    private readonly jobService: JobService,
    private readonly sequelize: Sequelize,
    @Inject(forwardRef(() => JobfrellasService))
    private readonly jobFrellasService:JobfrellasService
  ) {
    super(proposalRepository);
  }

  async createForCustomProblem(createProposalDto: CreateProposalDto): Promise<Proposal> {
    const exists = await this.proposalRepository.findByJobAndUser(createProposalDto.jobId, createProposalDto.userId);
    if (exists) throw new ApiError('You already made a proposal for this job', 400);
    return await this.create(createProposalDto);
  }

  async findByJob(jobId: string): Promise<Proposal[]> {
    return await this.proposalRepository.findByJob(jobId);
  }

  async findByUser(userId: string): Promise<Proposal[]> {
    return await this.proposalRepository.findByUser(userId);
  }

  async acceptProposal(id: string): Promise<Proposal> {
    return await this.sequelize.transaction(async (transaction) => {
      const proposal = await this.proposalRepository.findByIdWithTransaction(id, transaction);
      if (!proposal) throw new ApiError('Proposal not found', 404);
      if (proposal.status === ProposalStatus.ACCEPTED) return proposal;

      const job = await this.jobService.getByIdWithTransaction(proposal.jobId, transaction);

      const acceptedCount = await this.jobService.countAcceptedProposals(proposal.jobId, transaction);

      if (acceptedCount >= job.maxFreelancers) throw new ApiError('you have already accepted the maximum number of proposals for this job.', 400);
      
      const amountToReceive = Number((job.budget / job.maxFreelancers).toFixed(2));
      await this.jobFrellasService.createWithTransaction({ jobId:job.jobId, freelancerId: proposal.userId, proposalId:proposal.proposalId, amountToReceive, status: JobFrellaStatus.APPROVED }, transaction);

      proposal.status = ProposalStatus.ACCEPTED;
      await proposal.save({ transaction });

      return proposal;
    });
  }

  async getReports(): Promise<ProposalsData> {
    return await this.proposalRepository.findAllProposalsData();
  }

  async getByIdWithTransaction(proposalId: string, transaction: Transaction): Promise<Proposal> {
    const proposal = await this.proposalRepository.findByIdWithTransaction(proposalId, transaction);
    if (!proposal) throw new ApiError("Proposal not found", 404);
    return proposal;
  }

  async updateWithTransaction(proposalId: string, data: Partial<Proposal>, transaction: Transaction): Promise<Proposal> {
    const proposal = await this.proposalRepository.findByIdWithTransaction(proposalId, transaction);
    if (!proposal) throw new Error('Proposal not found');

    await proposal.update(data, { transaction });
    return proposal;
  }
}
