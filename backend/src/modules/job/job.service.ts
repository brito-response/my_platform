import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { BaseService } from 'src/common/base/base.service';
import { Job, StatusJob } from './entities/job.entity';
import { JobRepository } from './repository/job.repository';
import { ApiError } from 'src/common/errors/api.error';
import { UserService } from '../user/user.service';
import { JobsData } from './dto/job-report.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { WalletService } from '../wallet/wallet.service';
import { Sequelize } from 'sequelize-typescript';
import { InferCreationAttributes, Transaction } from 'sequelize';
import { ProposalService } from '../proposal/proposal.service';
import { ProposalStatus } from '../proposal/entities/proposal.entity';
import { JobfrellasService } from '../jobfrellas/jobfrellas.service';

@Injectable()
export class JobService extends BaseService<Job, CreateJobDto, UpdateJobDto> {
  constructor(private readonly jobRepository: JobRepository, private readonly userService: UserService,
    @Inject(forwardRef(() => WalletService))
    private readonly walletService: WalletService,
    private readonly sequelize: Sequelize,
    private readonly proposalService: ProposalService, private readonly jobfrellasService: JobfrellasService
  ) {
    super(jobRepository);
  }

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const transaction = await this.sequelize.transaction();
    try {
      const user = await this.userService.findOne(createJobDto.userId);

      if (user.typeuser !== 'CLIENT') throw new ApiError('No permission', 403);

      if (createJobDto.deadline <= new Date())
        throw new ApiError('Deadline must be future', 400);

      const job = await this.jobRepository.createWithTransaction({ ...createJobDto, status: createJobDto.status ?? StatusJob.OPEN } as InferCreationAttributes<Job>, transaction);
      await this.walletService.subtractValueTransaction(user.userId, job.budget, transaction);

      await transaction.commit();
      return job;

    } catch (error) {
      await transaction.rollback();
      if (error instanceof ApiError) throw error;
      throw new ApiError(error.message ?? 'Internal error', 500);
    }
  }

  async findContractOfJob(jobId: string): Promise<string> {
    const contractId = await this.jobRepository.findContractIdOfJob(jobId);
    // or !contractId
    if (contractId === undefined) throw new ApiError("this job is not allocated to any freelancer yet, contactId not found.", 404)
    return contractId;
  }

  async getProposalIds(jobId: string): Promise<string[]> {
    const proposalIds = await this.jobRepository.findProposalIdsByJob(jobId);
    return proposalIds;
  }

  async searchJobs(query: string) {
    return await this.jobRepository.searchJobs(query);
  }

  async findByCategory(categoryId: string): Promise<Job[]> {
    return await this.jobRepository.findByCategory(categoryId);
  }

  async findJobsByUser(userId: string): Promise<Job[]> {
    return await this.jobRepository.findAllByUser(userId);
  }

  async getJobWithAllProposals(jobId: string): Promise<Job> {
    const job = await this.jobRepository.getJobByIdWithAllProposals(jobId);
    if (!job) throw new ApiError("Job with this id not found.", 404)
    return job;
  }

  async getReports(): Promise<JobsData> {
    return await this.jobRepository.findAllJobsData();
  }

  async acceptProposal(jobId: string, proposalId: string, clientId: string) {
    const transaction = await this.sequelize.transaction();

    try {
      const job = await this.jobRepository.findByIdWithTransaction(jobId, transaction);

      if (!job) throw new ApiError('Job not found', 404);
      if (job.userId !== clientId) throw new ApiError('No permission', 403);

      if (job.acceptedFreelancersCount >= job.maxFreelancers) throw new ApiError('Freelancer limit reached', 400);

      const proposal = await this.proposalService.getByIdWithTransaction(proposalId, transaction);

      if (!proposal || proposal.jobId !== jobId)
        throw new ApiError('Invalid proposal', 400);

      if (proposal.status !== 'PENDING') throw new ApiError('Proposal already processed', 400);

      const amountToReceive = Number((job.budget / job.maxFreelancers).toFixed(2));
      await this.proposalService.updateWithTransaction(proposalId, { status: ProposalStatus.ACCEPTED }, transaction);

      await this.jobfrellasService.createWithTransaction({ jobId, freelancerId: proposal.userId, proposalId, amountToReceive, status: 'ACCEPTED' }, transaction);

      const newCount = job.acceptedFreelancersCount + 1;
      job.acceptedFreelancersCount = newCount;

      job.status = newCount === job.maxFreelancers ? StatusJob.IN_PROGRESS : job.status;
      job.save();
      await transaction.commit();

    } catch (error) {
      await transaction.rollback();
      throw new ApiError(error, 400);
    }
  }

  async completeJob(jobId: string, clientId: string) {
    const job = await this.jobRepository.findById(jobId);

    if (!job) throw new ApiError('Job not found', 404);
    if (job.userId !== clientId) throw new ApiError('No permission', 403);

    if (job.status !== StatusJob.IN_PROGRESS)
      throw new ApiError('Job not in progress', 400);

    await this.jobRepository.update(jobId, { status: StatusJob.COMPLETED });

  }

  async getByIdWithTransaction(jobId: string, transaction: Transaction): Promise<Job> {
    const job = await this.jobRepository.findByIdWithTransaction(jobId, transaction);
    if (!job) throw new ApiError("Proposal not found", 404);
    return job;
  }


}
