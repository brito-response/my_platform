import type { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "src/modules/user/entities/user.entity";

@Table({ tableName: "tb_reviews", timestamps: true })
export class Review extends Model<InferAttributes<Review>, InferCreationAttributes<Review>> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    declare reviewId: CreationOptional<string>;

    @Column({ type: DataType.INTEGER, allowNull: false, validate: { min: 1, max: 5 } })
    declare rating: number;

    @Column({ type: DataType.TEXT, allowNull: true })
    declare comment: string | null;

    //relationships
    @ForeignKey(() => User)
    @Column(DataType.UUID)
    declare userId: string;

    @BelongsTo(() => User)
    declare user?: User;

}
