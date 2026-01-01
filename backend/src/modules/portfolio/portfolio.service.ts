import { Injectable } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { BaseService } from 'src/common/base/base.service';
import { Portfolio } from './entities/portfolio.entity';
import { PortifolioRepository } from './repository/portifolio.repository';
import { RegisterLinkDto } from './dto/register-link-portfolio.dto';
import { ApiError } from 'src/common/errors/api.error';
import { Project } from '../project/entities/project.entity';

@Injectable()
export class PortfolioService extends BaseService<Portfolio, CreatePortfolioDto> {
  constructor(private readonly portifolioRepository: PortifolioRepository) {
    super(portifolioRepository);
  }

  async getlinksOfUser(id: string): Promise<String[]> {
    return await this.portifolioRepository.getLinksOfUser(id);
  }

  async saveLinkToUser(portifolioId: string, linkObj: RegisterLinkDto): Promise<string[]> {
    const portfolio = await this.findOne(portifolioId);
    if (!portfolio) throw new ApiError("this is portfolio not exists", 404);
    return await this.portifolioRepository.addLinkToUser(portifolioId, linkObj.link);
  }

  async updateBanner(portfolioId: string, userId: string, bannerPath: string) {
    const portfolio = await this.portifolioRepository.findOne(portfolioId);

    if (!portfolio) throw new ApiError('Portfólio não encontrado', 404);

    // 🔒 segurança: garante que o usuário é dono do portfólio
    if (portfolio.userId !== userId) throw new ApiError('Você não tem permissão para alterar este portfólio', 401);

    const [_, [updated]] = await this.portifolioRepository.update(portfolioId, { banner: bannerPath });

    return updated;
  }

  async getPortfolioOfUser(userId: string): Promise<Portfolio> {
    const portfolio = await this.portifolioRepository.getPortfolioOfUser(userId);
    if (!portfolio) throw new ApiError('Portfólio não encontrado', 404);
    return portfolio;
  }

  async findProjectsByPortfolioId(portfolioId: string): Promise<Project[]> {
    const portfolio = await this.portifolioRepository.findByIdWithProjects(portfolioId);
    if (!portfolio) throw new ApiError('Portfólio não encontrado', 404);

    return portfolio.projects ?? [];
  }

}
