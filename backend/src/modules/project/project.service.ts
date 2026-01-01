import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { BaseService } from 'src/common/base/base.service';
import { Project } from './entities/project.entity';
import { ProjectRepository } from './repository/project.repository';
import { ApiError } from 'src/common/errors/api.error';
import { ProjectPortfolio } from './entities/projectportfolio.entity';
import { InferCreationAttributes } from 'sequelize';
import { ProjectsData } from './dto/projects-data.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService extends BaseService<Project, CreateProjectDto,UpdateProjectDto> {
  constructor(private readonly projectRepository: ProjectRepository) {
    super(projectRepository);
  }

  async createWithrelationship(createProjectDto: CreateProjectDto) {
    const { portfolioId, ...projectData } = createProjectDto;
    const project = await this.projectRepository.create(projectData as InferCreationAttributes<Project>);
    await ProjectPortfolio.create({ projectId: project.projectId, portfolioId });

    return project;
  }

  async addImages(id: string, newImages: string[]) {
    const project = await this.projectRepository.findById(id);
    if (!project) throw new ApiError('Projeto não encontrado', 404);

    const currentImages = Array.isArray(project.images) ? project.images : [];
    project.images = [...currentImages, ...newImages];
    await project.save();

    return project;
  }

  async getReports(): Promise<ProjectsData> {
    return this.projectRepository.getProjectsData();
  }

}
