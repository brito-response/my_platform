import type { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';
import { UserContract } from './usercontract.entity';
import { Job } from 'src/modules/job/entities/job.entity';

export enum ContractStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
}

@Table({ tableName: 'tb_contracts', timestamps: true })
export class Contract extends Model<InferAttributes<Contract>, InferCreationAttributes<Contract>> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare contractId: CreationOptional<string>;

  @Column({ field: 'start_date', type: DataType.DATE })
  declare startDate: Date;

  @Column({ field: 'end_date', type: DataType.DATE })
  declare endDate: Date;

  @Column(DataType.ENUM(...Object.values(ContractStatus)))
  declare status: ContractStatus;

  @Column({ field: 'payment_status', type: DataType.ENUM(...Object.values(PaymentStatus)) })
  declare paymentStatus: PaymentStatus;

  // relationships
  @BelongsToMany(() => User, () => UserContract)
  declare users?: User[];

  @ForeignKey(() => Job)
  @Column(DataType.UUID)
  declare jobId: CreationOptional<string>;

  @BelongsTo(() => Job)
  declare job?: Job;

}
