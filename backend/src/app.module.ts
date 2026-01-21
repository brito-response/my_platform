import { join } from 'path';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { JobModule } from './modules/job/job.module';
import { ProposalModule } from './modules/proposal/proposal.module';
import { ContractModule } from './modules/contract/contract.module';
import { PaymentModule } from './modules/payment/payment.module';
import { MessageModule } from './modules/message/message.module';
import { ReviewModule } from './modules/review/review.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CategoryModule } from './modules/category/category.module';
import { ProjectModule } from './modules/project/project.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { WalletModule } from './modules/wallet/wallet.module';
import { JobfrellasModule } from './modules/jobfrellas/jobfrellas.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'uploads'), serveRoot: '/uploads' }),
    DatabaseModule, UserModule, PortfolioModule, JobModule, ProposalModule, ContractModule, PaymentModule, MessageModule, ReviewModule, CategoryModule, ProjectModule, WalletModule, JobfrellasModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
