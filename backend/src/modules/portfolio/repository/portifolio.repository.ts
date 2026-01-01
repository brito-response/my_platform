import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { Portfolio } from "../entities/portfolio.entity";
import { InjectModel } from "@nestjs/sequelize";
import { ApiError } from "src/common/errors/api.error";
import { Project } from "src/modules/project/entities/project.entity";

@Injectable()
export class PortifolioRepository extends BaseRepository<Portfolio> {
    constructor(@InjectModel(Portfolio) private readonly portifolioModel: typeof Portfolio) {
        super(portifolioModel);
    }

    async getLinksOfUser(userId: string): Promise<string[]> {
        const portfolio = await this.portifolioModel.findOne({ where: { userId }, attributes: ['links'] });
        return portfolio?.links ?? [];
    }

    async addLinkToUser(portfolioId: string, link: string): Promise<string[]> {
        const portfolio = await this.portifolioModel.findByPk(portfolioId);

        if (!portfolio) throw new ApiError('Portfolio not found', 404);
        const updatedLinks = [...(portfolio.links ?? []), link];
        await portfolio.update({ links: updatedLinks });

        return updatedLinks;
    }

    async getPortfolioOfUser(userId: string): Promise<Portfolio | null> {
        return this.portifolioModel.findOne({ where: { userId }, include: [{ model: Project, as: 'projects' }] });
    }

    async findByIdWithProjects(portfolioId: string): Promise<Portfolio | null> {
        return await this.portifolioModel.findByPk(portfolioId, { include: [{ model: Project, through: { attributes: [] } }] });
    }

}