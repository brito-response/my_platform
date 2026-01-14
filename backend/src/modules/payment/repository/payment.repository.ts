import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { InjectModel } from "@nestjs/sequelize";
import { Payment } from "../entities/payment.entity";
import { InferCreationAttributes, Transaction } from "sequelize";

@Injectable()
export class PaymentRepository extends BaseRepository<Payment> {
    constructor(@InjectModel(Payment) private readonly paymentModel: typeof Payment) {
        super(paymentModel);
    }

    async findByTxId(txId: string): Promise<Payment | null> {
        return await this.paymentModel.findOne({
            where: { txId },
        });
    }

    async findByChargeId(chargeId: string): Promise<Payment | null> {
        return await this.paymentModel.findOne({
            where: { chargeId },
        });
    }

    // async createWithTransaction(data: InferCreationAttributes<Payment>, transaction: Transaction): Promise<Payment> {
    //     return this.paymentModel.create(data, { transaction });
    // }
}