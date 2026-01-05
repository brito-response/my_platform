import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { InjectModel } from "@nestjs/sequelize";
import { JobFrella } from "../entities/jobfrella.entity";

@Injectable()
export class JobFrellaRepository extends BaseRepository<JobFrella> {
    constructor(@InjectModel(JobFrella) private readonly jobFrellaModel: typeof JobFrella) {
        super(jobFrellaModel);
    }

}