import type { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Project } from 'src/modules/project/entities/project.entity';
import { ProjectPortfolio } from 'src/modules/project/entities/projectportfolio.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Table({ tableName: 'tb_portfolios', timestamps: true })
export class Portfolio extends Model<InferAttributes<Portfolio>, InferCreationAttributes<Portfolio>> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare portfolioId: CreationOptional<string>;

  @Column(DataType.STRING)
  declare title: CreationOptional<string>;

  @Column(DataType.STRING)
  declare location: CreationOptional<string>;

  @Column(DataType.STRING)
  declare profession: CreationOptional<string>;

  @Column(DataType.STRING)
  declare academicBackground: CreationOptional<string>;

  @Column(DataType.STRING)
  declare banner: CreationOptional<string>;

  @Column(DataType.TEXT)
  declare description: CreationOptional<string>;

  @Column(DataType.STRING)
  declare githubUsername: CreationOptional<string>;

  @Column(DataType.ARRAY(DataType.STRING))
  declare links: CreationOptional<string[]>;

  //relationships
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  declare userId: CreationOptional<string>;

  @BelongsTo(() => User)
  declare user?: User;

  @BelongsToMany(() => Project, () => ProjectPortfolio)
  declare projects?: CreationOptional<Project[]>;
}
