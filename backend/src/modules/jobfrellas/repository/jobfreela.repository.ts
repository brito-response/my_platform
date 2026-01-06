import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { InjectModel } from "@nestjs/sequelize";
import { JobFrella } from "../entities/jobfrella.entity";
import { Transaction } from "sequelize";

@Injectable()
export class JobFrellaRepository extends BaseRepository<JobFrella> {
    constructor(@InjectModel(JobFrella) private readonly jobFrellaModel: typeof JobFrella) {
        super(jobFrellaModel);
    }

    async findByIdWithTransaction(jobFrellaId: string, transaction: Transaction): Promise<JobFrella | null> {
            return await this.jobFrellaModel.findOne({
                where: { jobFrellaId },
                transaction,
                lock: transaction.LOCK.UPDATE,
            });
        }
}