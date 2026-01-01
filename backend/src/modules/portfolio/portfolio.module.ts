import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Portfolio } from './entities/portfolio.entity';
import { PortifolioRepository } from './repository/portifolio.repository';

@Module({
  imports: [SequelizeModule.forFeature([Portfolio])],
  controllers: [PortfolioController],
  providers: [PortfolioService, PortifolioRepository],
  exports:[PortfolioService]
})
export class PortfolioModule { }
