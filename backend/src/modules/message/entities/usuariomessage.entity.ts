import type { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "src/modules/user/entities/user.entity";
import { Message } from "./message.entity";

@Table({ tableName: "tb_usersmessages", timestamps: true })
export class UserMessage extends Model<InferAttributes<UserMessage>, InferCreationAttributes<UserMessage>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare usermessageId: CreationOptional<string>;

    //relationships
    @ForeignKey(() => User)
    @Column(DataType.UUID)
    declare userId: string;

    @ForeignKey(() => Message)
    @Column(DataType.UUID)
    declare messageId: string;

    @BelongsTo(() => User)
    declare user?: User;

    @BelongsTo(() => Message)
    declare message?: Message;

}
