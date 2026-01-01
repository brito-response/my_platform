import type { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { BelongsToMany, Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "src/modules/user/entities/user.entity";
import { UserMessage } from "./usuariomessage.entity";

@Table({ tableName: "tb_messages", timestamps: true })
export class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare messageId: CreationOptional<string>;

    @Column({ type: DataType.TEXT, allowNull: false })
    declare content: string;

    @Column({ type: DataType.STRING, allowNull: true })
    declare file: string | null;

    //relationships
    @BelongsToMany(() => User, () => UserMessage)
    declare users?: User[]
}
