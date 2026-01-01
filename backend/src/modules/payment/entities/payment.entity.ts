import type { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "src/modules/user/entities/user.entity";
import { Job } from "src/modules/job/entities/job.entity";

export enum TransactionStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
}

@Table({ tableName: "tb_payments", timestamps: true })
export class Payment extends Model<InferAttributes<Payment>, InferCreationAttributes<Payment>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare paymentId: CreationOptional<string>;

    @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
    declare amount: number;

    @Column({ type: DataType.STRING(50), allowNull: false })
    declare method: string;

    @Column({ type: DataType.ENUM(...Object.values(TransactionStatus)), allowNull: false, defaultValue: TransactionStatus.PENDING, })
    declare transaction_status: TransactionStatus;

    //relationships
    @ForeignKey(() => User)
    @Column(DataType.UUID)
    declare userId: string;

    @BelongsTo(() => User)
    declare user?: User;

    @ForeignKey(() => Job)
    @Column(DataType.UUID)
    declare jobId: string;

    @BelongsTo(() => Job)
    declare job?: Job;
}
