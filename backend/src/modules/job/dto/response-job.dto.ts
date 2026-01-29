import { Exclude, Expose, Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { JobLevel, StatusJob } from '../entities/job.entity';

export interface ResponseJob {
  jobId: string;
  title: string;
  description: string;
  level: JobLevel;
  maxFreelancers: number;
  budget: number;
  deadline: Date;
  linkProject?: string;
  status: StatusJob;
  linksReferences?: string[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

@Exclude()
export class ResponseJobDto implements ResponseJob {

  @Expose()
  @ApiProperty({ example: 'a1b2c3d4-1234-4abc-9def-abcdef123456' })
  jobId: string;

  @Expose()
  @ApiProperty({ example: 'Desenvolvimento de API NestJS' })
  title: string;

  @Expose()
  @ApiProperty({ example: 'Preciso de um backend em NestJS com autenticação JWT' })
  description: string;

  @Expose()
  @ApiProperty({ enum: JobLevel, example: JobLevel.PLENO })
  level: JobLevel;

  @Expose()
  @ApiProperty({ example: 3 })
  maxFreelancers: number;

  @Expose()
  @ApiProperty({ example: 5000 })
  @Transform(({ value }) => Number(value))
  budget: number;

  @Expose()
  @ApiProperty({ example: '2026-03-01T23:59:59.000Z' })
  deadline: Date;

  @Expose()
  @ApiPropertyOptional({ example: 'https://github.com/org/project' })
  linkProject?: string;

  @Expose()
  @ApiProperty({ enum: StatusJob, example: StatusJob.OPEN })
  status: StatusJob;

  @Expose()
  @ApiPropertyOptional({type: [String],example: ['https://figma.com/file/abc', 'https://docs.google.com/doc/xyz']})
  linksReferences?: string[];

  @Expose()
  @ApiProperty({ example: 'b8c1f1d4-7a5c-4b8f-9b1a-123456789abc' })
  userId: string;

  @Expose()
  @ApiProperty({ example: '2026-01-28T23:20:21.738Z' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ example: '2026-01-28T23:20:21.738Z' })
  updatedAt: Date;
};
