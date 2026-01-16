import type { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "src/modules/user/entities/user.entity";

export enum TransactionStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
};

export enum PaymentMethod {
    CARD = "card",
    PIX = "pix",
    BOLETO = "boleto",
};

@Table({ tableName: "tb_payments", timestamps: true })
export class Payment extends Model<InferAttributes<Payment>, InferCreationAttributes<Payment, { omit: | 'paymentId' | 'code' | 'datePayment' | 'paymentsMonths' }>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare paymentId: CreationOptional<string>;

    @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
    declare amount: number;

    @Column({ type: DataType.ENUM(...Object.values(PaymentMethod)), allowNull: true, defaultValue: null })
    declare method: PaymentMethod;

    @Column({ type: DataType.ENUM(...Object.values(TransactionStatus)), allowNull: false, defaultValue: TransactionStatus.PENDING, })
    declare transaction_status: TransactionStatus;

    @Column(DataType.INTEGER)
    declare numberOfInstallments: CreationOptional<number>;

    @Column({ type: DataType.ARRAY(DataType.BOOLEAN), allowNull: false, defaultValue: new Array(12).fill(false) })
    declare paymentsMonths: CreationOptional<boolean[]>;

    @Column({ type: DataType.TEXT, allowNull: true })
    declare chargeId?: CreationOptional<string>;

    @Column({ type: DataType.TEXT, allowNull: true })
    declare txId?: CreationOptional<string>;

    @Column({ type: DataType.TEXT, allowNull: true })
    declare locId?: CreationOptional<string>;

    @Column(DataType.TEXT)
    declare qrCode?: CreationOptional<string>;

    @Column(DataType.TEXT)
    declare imageQrCode?: CreationOptional<string>;

    @Column(DataType.TEXT)
    declare code: CreationOptional<string>;

    @Column(DataType.DATE)
    declare datePayment: CreationOptional<Date>;

    //relationships
    @ForeignKey(() => User)
    @Column(DataType.UUID)
    declare userId: string;

    @BelongsTo(() => User)
    declare user?: User;
}
