import { PartialType } from '@nestjs/swagger';
import { CreateJobfrellaDto } from './create-jobfrella.dto';

export class UpdateJobfrellaDto extends PartialType(CreateJobfrellaDto) {}
