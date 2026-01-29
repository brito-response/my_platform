import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript"
import { Job } from "src/modules/job/entities/job.entity";
import { Proposal } from "src/modules/proposal/entities/proposal.entity";
import { User } from "src/modules/user/entities/user.entity";
import { JobFrellaProporsal } from "./jobfrella_proporsal.entity";

export enum JobFrellaStatus { PENDING = "PENDING", APPROVED = "APPROVED", REJECTED = "REJECTED" };

@Table({ tableName: "tb_jobfrellas", timestamps: true })
export class JobFrella extends Model<InferAttributes<JobFrella>, InferCreationAttributes<JobFrella>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare jobFrellaId: CreationOptional<string>;

    @Column(DataType.FLOAT)
    declare amountToReceive: number;

    @Column({ type: DataType.ENUM(...Object.values(JobFrellaStatus)), allowNull: false, defaultValue: JobFrellaStatus.PENDING, })
    declare status: JobFrellaStatus;

    
    // relationships 
    @ForeignKey(() => User)
    @Column(DataType.UUID)
    declare userId: string;

    @BelongsTo(() => User)
    declare user?: User;

    @ForeignKey(() => Job)
    @Column(DataType.UUID)
    declare jobId: string;

    @BelongsTo(() => Job)
    declare job?: Job;

    @BelongsToMany(() => Proposal, () => JobFrellaProporsal)
    declare proporsals: Proposal[]

}
