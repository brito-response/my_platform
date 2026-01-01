import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { BaseService } from 'src/common/base/base.service';
import { Job, StatusJob } from './entities/job.entity';
import { JobRepository } from './repository/job.repository';
import { ApiError } from 'src/common/errors/api.error';
import { UserService } from '../user/user.service';
import { InferCreationAttributes } from 'sequelize';
import { JobsData } from './dto/job-report.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobService extends BaseService<Job, CreateJobDto, UpdateJobDto> {
  constructor(private readonly jobRepository: JobRepository, private readonly userService: UserService) {
    super(jobRepository);
  }

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const userExists = await this.userService.findOne(createJobDto.userId);

    // ✅ Validação extra: deadline deve ser futura
    const now = new Date();
    if (createJobDto.deadline <= now) throw new ApiError('O prazo final deve ser uma data futura.', 400);

    // ✅ Cria o job com status padrão OPEN
    const jobToCreate = { ...createJobDto, status: createJobDto.status ?? StatusJob.OPEN };

    // ✅ Usa o repositório para criar
    const newJob = await this.jobRepository.create(jobToCreate as InferCreationAttributes<Job>);
    return newJob;
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
