import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { InjectModel } from "@nestjs/sequelize";
import { Proposal, ProposalStatus } from "../entities/proposal.entity";
import { Job } from "src/modules/job/entities/job.entity";
import { User } from "src/modules/user/entities/user.entity";
import { ProposalsData, ProposalStatusCount } from "../dto/proposal-report.dto";
import { Sequelize } from "sequelize-typescript";
import { Transaction } from "sequelize";

@Injectable()
export class ProposalRepository extends BaseRepository<Proposal> {
    constructor(@InjectModel(Proposal) private readonly proposalModel: typeof Proposal) {
        super(proposalModel);
    }

    async findByJob(jobId: string): Promise<Proposal[]> {
        return await this.proposalModel.findAll({
            where: { jobId },
            include: [{ model: User, attributes: ['userId', 'name', 'email', 'photo'] }],
            order: [['createdAt', 'DESC']],
        });
    }

    async findByUser(userId: string): Promise<Proposal[]> {
        return await this.proposalModel.findAll({
            where: { userId },
            include: [{ model: Job, attributes: ['jobId', 'title', 'description', 'budget'] }],
            order: [['createdAt', 'DESC']],
        });
    }

    async findAllProposalsData(): Promise<ProposalsData> {
        const sequelize = this.proposalModel.sequelize as Sequelize;
        const totalProposals = await this.proposalModel.count();

        const proposalsByStatus: ProposalStatusCount[] = [];
        const statuses = Object.values(ProposalStatus);

        for (const status of statuses) {
            const count = await this.proposalModel.count({ where: { status } });
            proposalsByStatus.push({ status, count });
        }

        return { totalProposals, proposalsByStatus } as ProposalsData;
    }

    async findByIdWithTransaction(proposalId: string, transaction: Transaction): Promise<Proposal | null> {
        return await this.proposalModel.findOne({ where: { proposalId }, transaction, lock: transaction.LOCK.UPDATE });
    }

    async findByJobAndUser(jobId: string, userId: string): Promise<Proposal | null> {
        return this.proposalModel.findOne({ where: { jobId, userId } });
    }

}