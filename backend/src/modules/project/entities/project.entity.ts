import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { BelongsToMany, Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ProjectPortfolio } from "./projectportfolio.entity";
import { Portfolio } from "src/modules/portfolio/entities/portfolio.entity";

@Table({ tableName: 'tb_projects', timestamps: true })
export class Project extends Model<InferAttributes<Project>, InferCreationAttributes<Project>> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare projectId: CreationOptional<string>;

  @Column(DataType.STRING)
  declare title: string;

  @Column(DataType.TEXT)
  declare description: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false, defaultValue: [] })
  declare images: string[];

  @Column({ type: DataType.STRING})
  declare link: string;

  @Column(DataType.BOOLEAN)
  declare favorite: CreationOptional<boolean>;

  //relationships (no atributes use "?"" e no CreationOptional)
  @BelongsToMany(() => Portfolio, () => ProjectPortfolio)
  declare portfolios?: ProjectPortfolio[];

}