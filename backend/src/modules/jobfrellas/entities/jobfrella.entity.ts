import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript"

@Table({tableName:"tb_jobfrellas",timestamps:true})
export class JobFrella extends Model<InferAttributes<JobFrella>, InferCreationAttributes<JobFrella>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare jobId: CreationOptional<string>;


    // relationships 

    
}
