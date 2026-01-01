import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from 'src/modules/category/entities/category.entity';
import { JobCategory } from 'src/modules/category/entities/jobcategory.entity';
import { Contract } from 'src/modules/contract/entities/contract.entity';
import { UserContract } from 'src/modules/contract/entities/usercontract.entity';
import { Job } from 'src/modules/job/entities/job.entity';
import { Message } from 'src/modules/message/entities/message.entity';
import { UserMessage } from 'src/modules/message/entities/usuariomessage.entity';
import { Payment } from 'src/modules/payment/entities/payment.entity';
import { Portfolio } from 'src/modules/portfolio/entities/portfolio.entity';
import { Project } from 'src/modules/project/entities/project.entity';
import { ProjectPortfolio } from 'src/modules/project/entities/projectportfolio.entity';
import { Proposal } from 'src/modules/proposal/entities/proposal.entity';
import { Review } from 'src/modules/review/entities/review.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Wallet } from 'src/modules/wallet/entities/wallet.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'platform_rdf',
      models: [User, Review, Proposal, Portfolio, Payment, Message, Job, Contract, Category, UserMessage, UserContract, JobCategory, Project, ProjectPortfolio,Wallet],
      autoLoadModels: true,
      synchronize: true,
    }),
  ]
})
export class DatabaseModule { }
