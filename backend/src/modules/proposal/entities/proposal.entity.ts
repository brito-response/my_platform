import type { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Job } from 'src/modules/job/entities/job.entity';
import { User } from 'src/modules/user/entities/user.entity';

export enum ProposalStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

@Table({ tableName: 'tb_proposals', timestamps: true })
export class Proposal extends Model<InferAttributes<Proposal>, InferCreationAttributes<Proposal>> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare proposalId: CreationOptional<string>;

  @Column(DataType.FLOAT)
  declare value: number;

  @Column(DataType.DATE)
  declare deadline: Date;

  @Column(DataType.TEXT)
  declare message: string;

  @Column(DataType.ENUM(...Object.values(ProposalStatus)))
  declare status: ProposalStatus;

  // relationships
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  declare userId: CreationOptional<string>;

  @BelongsTo(() => User)
  declare user?: User;

  @ForeignKey(() => Job)
  @Column(DataType.UUID)
  declare jobId: CreationOptional<string>;

  @BelongsTo(() => Job)
  declare job?: Job;

}
