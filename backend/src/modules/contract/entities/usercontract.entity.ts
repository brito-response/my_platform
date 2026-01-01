import type { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';
import { Contract } from './contract.entity';


@Table({ tableName: 'tb_userscontracts', timestamps: true })
export class UserContract extends Model<InferAttributes<UserContract>, InferCreationAttributes<UserContract>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare usercontractId: CreationOptional<string>;

    // relationships
    @ForeignKey(() => User)
    @Column(DataType.UUID)
    declare userId: string;

    @ForeignKey(() => Contract)
    @Column(DataType.UUID)
    declare contractId: string;

    @BelongsTo(()=>User)
    declare user?:User;

    @BelongsTo(()=>Contract)
    declare contract?:Contract;

}
