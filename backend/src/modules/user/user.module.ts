import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRepository } from './repository/user.repository';
import { EmailService } from './email.service';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PortfolioModule } from '../portfolio/portfolio.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), PortfolioModule],
  controllers: [UserController, AuthController],
  providers: [UserService, UserRepository, EmailService, TokenService, AuthService],
  exports:[UserService]
})
export class UserModule { }
