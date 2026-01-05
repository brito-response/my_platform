import { Module } from '@nestjs/common';
import { JobfrellasService } from './jobfrellas.service';
import { JobfrellasController } from './jobfrellas.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { JobFrella } from './entities/jobfrella.entity';
import { JobFrellaRepository } from './repository/jobfreela.repository';

@Module({
  imports: [SequelizeModule.forFeature([JobFrella])],
  controllers: [JobfrellasController],
  providers: [JobfrellasService, JobFrellaRepository],
  exports: [JobfrellasService]
})
export class JobfrellasModule { }
