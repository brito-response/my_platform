import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Portfolio } from "src/modules/portfolio/entities/portfolio.entity";
import { Project } from "./project.entity";

@Table({ tableName: 'tb_projectsportfolios', timestamps: true })
export class ProjectPortfolio extends Model<InferAttributes<ProjectPortfolio>, InferCreationAttributes<ProjectPortfolio>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare projectportifolioId: CreationOptional<string>;


    //relationships (no atributes use "?"" e no CreationOptional)

    @ForeignKey(() => Project)
    @Column(DataType.UUID)
    declare projectId: string;

    @ForeignKey(() => Portfolio)
    @Column(DataType.UUID)
    declare portfolioId: string;

    @BelongsTo(() => Project)
    declare project?: Project;

    @BelongsTo(() => Portfolio)
    declare portfolio?: Portfolio;

}
