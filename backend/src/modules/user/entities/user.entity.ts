import type { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { AfterCreate, BeforeCreate, BelongsToMany, Column, DataType, Default, HasMany, HasOne, Model, PrimaryKey, Table } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { Portfolio } from 'src/modules/portfolio/entities/portfolio.entity';
import { Message } from 'src/modules/message/entities/message.entity';
import { UserMessage } from 'src/modules/message/entities/usuariomessage.entity';
import { Contract } from 'src/modules/contract/entities/contract.entity';
import { UserContract } from 'src/modules/contract/entities/usercontract.entity';
import { Review } from 'src/modules/review/entities/review.entity';
import { Proposal } from 'src/modules/proposal/entities/proposal.entity';
import { Payment } from 'src/modules/payment/entities/payment.entity';
import { Job } from 'src/modules/job/entities/job.entity';
import { TypeWalletStatus, Wallet } from 'src/modules/wallet/entities/wallet.entity';

export enum TypeUser {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  FREELANCER = 'FREELANCER',
}
export function fromString(value: string): TypeUser {
  switch (value) {
    case 'ADMIN':
      return TypeUser.ADMIN;
    case 'CLIENT':
      return TypeUser.CLIENT;
    case 'FREELANCER':
      return TypeUser.FREELANCER;
    default:
      throw new Error('Tipo de usuário inválido.');
  }
}

export enum TypeUserStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  BANNED = 'BANNED',
}

@Table({ tableName: 'tb_users', timestamps: true })
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare userId: CreationOptional<string>;

  @Column(DataType.STRING)
  declare name: string;

  @Column({ type: DataType.STRING, unique: true })
  declare email: string;

  @Column({ type: DataType.STRING, unique: true })
  declare cpf: string;

  @Column(DataType.STRING)
  declare password: string;

  @Column(DataType.STRING)
  declare phone: string;

  @Column(DataType.STRING)
  declare photo: CreationOptional<string>;

  @Column(DataType.STRING)
  declare bio: CreationOptional<string>;

  @Column(DataType.STRING)
  declare country: string;

  @Column(DataType.STRING)
  declare state: string;

  @Column(DataType.STRING)
  declare city: string;

  @Column(DataType.STRING)
  declare address: string;

  @Column(DataType.ARRAY(DataType.STRING))
  declare skills: CreationOptional<string[]>;

  @Column(DataType.FLOAT)
  declare hourly_rate: CreationOptional<number>;

  @Column(DataType.FLOAT)
  declare score: CreationOptional<number>;

  @Column(DataType.ENUM(...Object.values(TypeUser)))
  declare typeuser: TypeUser;

  @Column(DataType.ENUM(...Object.values(TypeUserStatus)))
  declare userStatus: CreationOptional<TypeUserStatus>;

  @Column(DataType.BOOLEAN)
  declare checked: CreationOptional<boolean>;

  //relationships (no atributes use "?"" e no CreationOptional)
  @HasOne(() => Portfolio)
  declare portifolio?: Portfolio;

  @HasOne(() => Wallet)
  declare wallet?: Wallet;

  @BelongsToMany(() => Message, () => UserMessage)
  declare messages?: Message[];

  @BelongsToMany(() => Contract, () => UserContract)
  declare contracts?: Contract[];

  @HasMany(() => Review)
  declare reviews?: Review[];

  @HasMany(() => Proposal)
  declare proposals?: Proposal[];

  @HasMany(() => Payment)
  declare payments?: Payment[];

  @HasMany(() => Job)
  declare jobs?: Job[];

  //Listeners
  @BeforeCreate
  static async hashPassword(instance: User) {
    const salt = await bcrypt.genSalt(12);
    instance.userStatus = TypeUserStatus.ACTIVE;
    instance.password = await bcrypt.hash(instance.password, salt);
  }

  @AfterCreate
  static async createPortfolio(instance: User) {
    await Portfolio.create({ userId: instance.userId });
  }

  @AfterCreate
  static async createWallet(instance: Wallet) {
    await Wallet.create({ userId: instance.userId, version: 0, name: 'You Wallet', balance: 0, blockedBalance: 0, currency: '', status: TypeWalletStatus.ACTIVE });
  }
}