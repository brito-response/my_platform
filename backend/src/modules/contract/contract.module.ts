import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { Contract } from './entities/contract.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContractRepository } from './repository/contract.repository';

@Module({
  imports: [SequelizeModule.forFeature([Contract])],
  controllers: [ContractController],
  providers: [ContractService, ContractRepository],
})
export class ContractModule { }
