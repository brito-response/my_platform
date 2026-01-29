import { Injectable } from '@nestjs/common';
import { CreateJobfrellaDto } from './dto/create-jobfrella.dto';
import { UpdateJobfrellaDto } from './dto/update-jobfrella.dto';
import { BaseService } from 'src/common/base/base.service';
import { JobFrella } from './entities/jobfrella.entity';
import { JobFrellaRepository } from './repository/jobfreela.repository';
import { InferCreationAttributes, Transaction } from 'sequelize';
import { ApiError } from 'src/common/errors/api.error';
import { ResponseJobfrella } from './dto/response-jobfrella.dto';

@Injectable()
export class JobfrellasService extends BaseService<JobFrella, CreateJobfrellaDto, UpdateJobfrellaDto, ResponseJobfrella> {
  constructor(private readonly jobfrellaRepository: JobFrellaRepository) {
    super(jobfrellaRepository, (jobfreela) => jobfreela.toJSON());
  }

  async createWithTransaction(jobfrella: CreateJobfrellaDto, transaction: Transaction) {
    const jobfreela = await this.jobfrellaRepository.createWithTransaction(jobfrella as InferCreationAttributes<JobFrella>, transaction);
    if (!jobfreela) throw new ApiError("error in creation", 400);
    return jobfreela;
  }

  async getByIdWithTransaction(jobFrellaId: string, transaction: Transaction): Promise<JobFrella> {
    const job = await this.jobfrellaRepository.findByIdWithTransaction(jobFrellaId, transaction);
    if (!job) throw new ApiError("Proposal not found", 404);
    return job;
  }
}
