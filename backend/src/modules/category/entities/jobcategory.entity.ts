import type { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Job } from "src/modules/job/entities/job.entity";
import { Category } from "./category.entity";

@Table({ tableName: "tb_jobscategories", timestamps: true })
export class JobCategory extends Model<InferAttributes<JobCategory>, InferCreationAttributes<JobCategory>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare jobcategoryId: CreationOptional<string>;

    //relationships
    @ForeignKey(() => Job)
    @Column(DataType.UUID)
    declare jobId: string;

    @ForeignKey(() => Category)
    @Column(DataType.UUID)
    declare categoryId: string;

    @BelongsTo(() => Job)
    job: Job;

    @BelongsTo(() => Category)
    declare category: Category;
}