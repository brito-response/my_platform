import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateJobFrellaDto } from './create-jobfrella.dto';
import { JobFrellaStatus } from '../entities/jobfrella.entity';
import { IsEnum } from 'class-validator';

export class UpdateJobfrellaDto extends PartialType(CreateJobFrellaDto) {

    @ApiProperty({ description: 'Status do vínculo do freelancer com o job', enum: JobFrellaStatus, example: JobFrellaStatus.APPROVED })
    @IsEnum(JobFrellaStatus)
    status: JobFrellaStatus;
    
};
