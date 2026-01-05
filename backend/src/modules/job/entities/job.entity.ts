import type { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Category } from 'src/modules/category/entities/category.entity';
import { JobCategory } from 'src/modules/category/entities/jobcategory.entity';
import { Contract } from 'src/modules/contract/entities/contract.entity';
import { Payment } from 'src/modules/payment/entities/payment.entity';
import { Proposal } from 'src/modules/proposal/entities/proposal.entity';
import { User } from 'src/modules/user/entities/user.entity';

export enum StatusJob {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export enum JobLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  JUNIOR = "JUNIOR",
  PLENO = "PLENO",
  SENIOR = "SENIOR",
  EXPERT = "EXPERT",
}

@Table({ tableName: 'tb_jobs', timestamps: true })
export class Job extends Model<InferAttributes<Job>, InferCreationAttributes<Job>> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare jobId: CreationOptional<string>;

  @Column(DataType.STRING)
  declare title: string;

  @Column(DataType.TEXT)
  declare description: string;

  @Column(DataType.ENUM(...Object.values(JobLevel)))
  declare level: JobLevel;

  @Column(DataType.INTEGER)
  declare maxFreelancers:number;

  @Column(DataType.FLOAT)
  declare budget: number; // orçamento

  @Column(DataType.DATE)
  declare deadline: Date; // prazo final

  @Column(DataType.ENUM(...Object.values(StatusJob)))
  declare status: StatusJob;

  @Column(DataType.ARRAY(DataType.STRING))
  declare linksReferences: CreationOptional<string[]>;


  // relationships 
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  declare userId: string;

  @BelongsTo(() => User)
  declare user?: User;

  @HasOne(() => Payment)
  declare payment?: Payment;

  @BelongsToMany(() => Category, () => JobCategory)
  declare categories?: Category[];

  @HasMany(() => Proposal)
  declare proposals?: Proposal[];

  @HasOne(() => Contract)
  declare contract?: Contract;

}
