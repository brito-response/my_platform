import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from './entities/project.entity';
import { ProjectRepository } from './repository/project.repository';

@Module({
  imports: [SequelizeModule.forFeature([Project])],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository],
})
export class ProjectModule { }
