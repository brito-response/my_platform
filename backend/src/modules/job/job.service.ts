import { Injectable } from '@nestjs/common';
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
import { InferCreationAttributes } from 'sequelize';

@Injectable()
export class JobService extends BaseService<Job, CreateJobDto, UpdateJobDto> {
  constructor(private readonly jobRepository: JobRepository, private readonly userService: UserService, private readonly walletService: WalletService, private readonly sequelize: Sequelize) {
    super(jobRepository);
  }

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const transaction = await this.sequelize.transaction();

    try {
      const user = await this.userService.findOne(createJobDto.userId);

      if (user.typeuser !== 'CLIENT')
        throw new ApiError('No permission', 403);

      if (createJobDto.deadline <= new Date())
        throw new ApiError('Deadline must be future', 400);

      const job = await this.jobRepository.createWithTransaction({ ...createJobDto, status: createJobDto.status ?? StatusJob.OPEN } as InferCreationAttributes<Job>, transaction);
      await this.walletService.subtractValueTransaction(user.id, job.budget, transaction);

      await transaction.commit();
      return job;

    } catch (error) {
      await transaction.rollback();
      throw new ApiError(error.toString(), 400);
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

}
