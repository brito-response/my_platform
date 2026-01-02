import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { InjectModel } from "@nestjs/sequelize";
import { Wallet } from "../entities/wallet.entity";
import { Transaction } from "sequelize";

@Injectable()
export class WalletRepository extends BaseRepository<Wallet> {
    constructor(@InjectModel(Wallet) private readonly walletModel: typeof Wallet) {
        super(walletModel);
    }
    async findOneByUserId(userId: string, transaction?: Transaction): Promise<Wallet | null> {
        return this.walletModel.findOne({ where: { userId }, transaction, lock: transaction ? transaction.LOCK.UPDATE : undefined, });
    }
}