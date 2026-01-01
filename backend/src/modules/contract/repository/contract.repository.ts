import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { InjectModel } from "@nestjs/sequelize";
import { Contract, ContractStatus, PaymentStatus } from "../entities/contract.entity";
import { Op } from "sequelize";
import { ContractsData } from "../dto/contracts-data.dto";

@Injectable()
export class ContractRepository extends BaseRepository<Contract> {
    constructor(@InjectModel(Contract) private readonly contractModel: typeof Contract) {
        super(contractModel);
    }

    async findByJob(jobId: string): Promise<Contract | null> {
        return await this.contractModel.findOne({
            where: { jobId },
            include: { all: true }, // opcional: traz job, users etc.
        });
    }

    async findByUser(userId: string): Promise<Contract[]> {
        return await this.contractModel.findAll({ include: [{ association: 'users', where: { userId }, through: { attributes: [] }, },] });
    }

    async closeContract(id: string): Promise<Contract | null> {
        const contract = await this.contractModel.findByPk(id);
        if (!contract) return null;

        contract.status = ContractStatus.COMPLETED
        await contract.save();

        return contract;
    }

    /** Busca contratos cujo endDate expirou há mais de X dias e ainda estão abertos.*/
    async findExpiredContracts(days: number): Promise<Contract[]> {
        const limitDate = new Date();
        limitDate.setDate(limitDate.getDate() - days);

        return this.contractModel.findAll({
            where: {
                endDate: { [Op.lt]: limitDate },
                status: { [Op.not]: ContractStatus.COMPLETED },
            },
        });
    }

    async findAllContractsData(): Promise<ContractsData> {
        const totalContracts = await this.contractModel.count();
        const totalPaidContracts = await this.contractModel.count({ where: { paymentStatus: PaymentStatus.PAID } });
        const totalCompletedContracts = await this.contractModel.count({ where: { status: ContractStatus.COMPLETED } });
        return { totalContracts, totalPaidContracts, totalCompletedContracts } as ContractsData;
    }

}