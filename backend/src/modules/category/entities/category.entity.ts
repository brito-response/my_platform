import type { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { BelongsToMany, Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Job } from "src/modules/job/entities/job.entity";
import { JobCategory } from "./jobcategory.entity";

@Table({ tableName: "tb_categories", timestamps: true })
export class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare categoryId: CreationOptional<string>;

    @Column(DataType.STRING)
    declare name: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    declare description: string | null;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
    declare isActive: boolean;

    //relationships
    @BelongsToMany(() => Job, () => JobCategory)
    declare jobs: Job[]
}
