import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { JobFrella } from './entities/jobfrella.entity';
import { JobFrellaRepository } from './repository/jobfreela.repository';
import { InferCreationAttributes, Transaction } from 'sequelize';
import { ApiError } from 'src/common/errors/api.error';
import { CreateJobFrellaDto, UpdateJobfrellaDto } from './dto';

@Injectable()
export class JobfrellasService extends BaseService<JobFrella, CreateJobFrellaDto, UpdateJobfrellaDto> {
  constructor(private readonly jobfrellaRepository: JobFrellaRepository) {
    super(jobfrellaRepository);
  }

  async createWithTransaction(dto: CreateJobFrellaDto, transaction: Transaction): Promise<JobFrella> {
    //TODO: possible errors
    const data: Omit<InferCreationAttributes<JobFrella>, 'jobFrellaId' | 'proporsals'> = {
      jobId: dto.jobId, userId: dto.freelancerId, amountToReceive: dto.amountToReceive, status: dto.status
    };
    const jobfreela = await this.jobfrellaRepository.createWithTransaction(data as InferCreationAttributes<JobFrella>, transaction);
    if (!jobfreela) throw new ApiError("error in creation", 400);
    return jobfreela;
  }

  async getByIdWithTransaction(jobFrellaId: string, transaction: Transaction): Promise<JobFrella> {
    const job = await this.jobfrellaRepository.findByIdWithTransaction(jobFrellaId, transaction);
    if (!job) throw new ApiError("Proposal not found", 404);
    return job;
  }
}
