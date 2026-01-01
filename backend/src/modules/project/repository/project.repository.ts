import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { InjectModel } from "@nestjs/sequelize";
import { Project } from "../entities/project.entity";
import { ProjectsData } from "../dto/projects-data.dto";

@Injectable()
export class ProjectRepository extends BaseRepository<Project> {
    constructor(@InjectModel(Project) private readonly projectModel: typeof Project) {
        super(projectModel);
    }

    async findById(id: string): Promise<Project | null> {
        return await this.projectModel.findByPk(id);
    }

    async getProjectsData(): Promise<ProjectsData> {
        const totalProjects = await this.projectModel.count();
        return { totalProjects } as ProjectsData;
    }

}