import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "src/modules/user/entities/user.entity";

export enum TypeWalletStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  BANNED = 'BANNED',
};

@Table({ tableName: "tb_wallets", timestamps: true })
export class Wallet extends Model<InferAttributes<Wallet>, InferCreationAttributes<Wallet>> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare walletId: CreationOptional<string>;

  @Column(DataType.STRING)
  declare name: string;

  @Default(0)
  @Column(DataType.DECIMAL(15, 2))
  declare balance: number;                                      // saldo

  @Default(0)
  @Column(DataType.DECIMAL(15, 2))
  declare blockedBalance: number;                              // saldo bloqueado

  @Default("BRL")
  @Column(DataType.STRING(3))
  declare currency: string;                                    // moeda

  @Default(TypeWalletStatus.ACTIVE)
  @Column(DataType.ENUM(...Object.values(TypeWalletStatus)))
  declare status: TypeWalletStatus;

  @Default(0)
  @Column(DataType.INTEGER)
  declare version: number;


  //relationships

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  declare userId: CreationOptional<string>;

  @BelongsTo(() => User)
  declare user?: User;

}
