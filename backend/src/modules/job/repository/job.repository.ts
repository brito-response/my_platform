import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { InjectModel } from "@nestjs/sequelize";
import { Job, JobLevel, StatusJob } from "../entities/job.entity";
import { Contract } from "src/modules/contract/entities/contract.entity";
import { col, fn, Op, Sequelize, Transaction } from "sequelize";
import { Proposal } from "src/modules/proposal/entities/proposal.entity";
import { JobLevelStats, JobsData } from "../dto/job-report.dto";

@Injectable()
export class JobRepository extends BaseRepository<Job> {
    constructor(@InjectModel(Job) private readonly jobModel: typeof Job) {
        super(jobModel);
    }

    async findContractIdOfJob(jobId: string): Promise<string | undefined> {
        const job = await this.jobModel.findOne({ where: { jobId }, include: [{ model: Contract, attributes: ['contractId'] }] });
        return job?.contract?.contractId;
    }

    async findProposalIdsByJob(jobId: string): Promise<string[]> {
        const job = await this.jobModel.findOne({ where: { jobId }, include: [{ association: 'proporsals', attributes: ['proposalId'] }] });
        return job?.proposals?.map(p => p.proposalId) ?? [];
    }

    async searchJobs(query: string): Promise<Job[]> {
        return await this.jobModel.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.iLike]: `%${query}%` } }, // busca no título
                    { description: { [Op.iLike]: `%${query}%` } } // busca na descrição
                ]
            }
        });
    }

    async findByCategory(categoryId: string): Promise<Job[]> {
        return await this.jobModel.findAll({
            include: [
                {
                    association: 'categories', // nome do relacionamento
                    where: { id: categoryId }, // filtra pela categoria
                    through: { attributes: [] }, // opcional: remove dados da tabela intermediária
                },
            ],
        });
    }

    async findAllByUser(userId: string): Promise<Job[]> {
        return await this.jobModel.findAll({
            where: { userId },
            include: [
                { association: Job.associations.categories },
                { association: Job.associations.proporsals },
                { association: Job.associations.contract },
            ],
        });
    }

    async getJobByIdWithAllProposals(jobId: string): Promise<Job | null> {
        const job = await this.jobModel.findOne({
            where: { jobId },
            include: [
                {
                    model: Proposal, // ✅ use o model direto, não "association"
                    attributes: ['proposalId', 'value', 'deadline', 'status', 'message'],
                },
            ],
        });

        return job;
    }

    async findAllJobsData(): Promise<JobsData> {
        const sequelize = this.jobModel.sequelize as Sequelize;
        const totalJobs = await this.jobModel.count();
        const totalCompletedJobs = await this.jobModel.count({ where: { status: StatusJob.COMPLETED } });

        const levels = Object.values(JobLevel);
        const jobsByLevel: JobLevelStats[] = [];

        for (const level of levels) {
            const count = await this.jobModel.count({ where: { level } });
            const avgResult = await this.jobModel.findOne({ attributes: [[fn("AVG", col("budget")), "averageBudget"]], where: { level }, raw: true });
            const averageBudget = Number(avgResult?.["averageBudget"] ?? 0);
            jobsByLevel.push({ level, count, averageBudget });
        }

        const totalProposals = await Proposal.count();
        const averageProposalsPerJob = totalJobs > 0 ? totalProposals / totalJobs : 0;

        return { totalJobs, totalCompletedJobs, jobsByLevel, averageProposalsPerJob } as JobsData;
    }

    async findByIdWithTransaction(jobId: string, transaction: Transaction): Promise<Job | null> {
        return await this.jobModel.findOne({
            where: { jobId },
            transaction,
            lock: transaction.LOCK.UPDATE,
        });
    }

    async findById(jobId: string): Promise<Partial<Job> | null> {
        const job = await this.jobModel.findByPk(jobId);
        if (!job) return null;
        return job.get({ plain: true }) as Partial<Job>;
    }

}