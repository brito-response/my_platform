import type { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { JobFrella } from './jobfrella.entity';
import { Proposal } from 'src/modules/proposal/entities/proposal.entity';

@Table({ tableName: "tb_jobsrellasproporsals", timestamps: true })
export class JobFrellaProporsal extends Model<InferAttributes<JobFrellaProporsal>, InferCreationAttributes<JobFrellaProporsal>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare jobFrellaProporsalId: CreationOptional<string>;

    //relationships
    @ForeignKey(() => JobFrella)
    @Column(DataType.UUID)
    declare jobFrellaId: string;

    @ForeignKey(() => Proposal)
    @Column(DataType.UUID)
    declare proporsalId: string;

    @BelongsTo(() => JobFrella)
    declare jobFrella: JobFrella;

    @BelongsTo(() => Proposal)
    declare proposal: Proposal;
}