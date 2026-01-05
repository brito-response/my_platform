import { Injectable } from '@nestjs/common';
import { CreateJobfrellaDto } from './dto/create-jobfrella.dto';
import { UpdateJobfrellaDto } from './dto/update-jobfrella.dto';
import { BaseService } from 'src/common/base/base.service';
import { JobFrella } from './entities/jobfrella.entity';
import { JobFrellaRepository } from './repository/jobfreela.repository';

@Injectable()
export class JobfrellasService  extends BaseService<JobFrella, CreateJobfrellaDto, UpdateJobfrellaDto> {
  constructor(private readonly jobfrellaRepository: JobFrellaRepository) {
    super(jobfrellaRepository);
  }
}
