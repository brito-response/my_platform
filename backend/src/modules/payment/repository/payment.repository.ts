import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { InjectModel } from "@nestjs/sequelize";
import { Payment } from "../entities/payment.entity";

@Injectable()
export class PaymentRepository extends BaseRepository<Payment> {
    constructor(@InjectModel(Payment) private readonly paymentModel: typeof Payment) {
        super(paymentModel);
    }
}