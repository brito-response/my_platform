import { Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { BaseService } from 'src/common/base/base.service';
import { Contract, ContractStatus } from './entities/contract.entity';
import { ContractRepository } from './repository/contract.repository';
import { ApiError } from 'src/common/errors/api.error';
import { ContractsData } from './dto/contracts-data.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Injectable()
export class ContractService extends BaseService<Contract, CreateContractDto, UpdateContractDto> {
  constructor(private readonly contractRepository: ContractRepository) {
    super(contractRepository);
  }

  async findByJob(jobId: string): Promise<Contract> {
    const contract = await this.contractRepository.findByJob(jobId);
    if (!contract) throw new ApiError("No contract found for this job", 404);
    return contract;
  }

  async findByUser(userId: string): Promise<Contract[]> {
    return await this.contractRepository.findByUser(userId);
  }

  async closeContract(id: string): Promise<Contract> {
    const contract = await this.contractRepository.closeContract(id);
    if (!contract) throw new ApiError("Contract not found", 404);
    return contract;
  }

  /**
   * Fecha contratos automaticamente após X dias do término sem ação.
   * @param days número de dias após o término
   */
  async autoCloseContracts(days = 7) {
    const contracts = await this.contractRepository.findExpiredContracts(days);

    for (const contract of contracts) {
      contract.status = ContractStatus.COMPLETED;
      await contract.save();
    }

    return { closed: contracts.length };
  }

  async getReports(): Promise<ContractsData> {
    return await this.contractRepository.findAllContractsData();
  }
}
