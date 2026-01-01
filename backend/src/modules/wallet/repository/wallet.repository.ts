import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { InjectModel } from "@nestjs/sequelize";
import { Wallet } from "../entities/wallet.entity";

@Injectable()
export class WalletRepository extends BaseRepository<Wallet> {
    constructor(@InjectModel(Wallet) private readonly walletModel: typeof Wallet) {
        super(walletModel);
    }
}