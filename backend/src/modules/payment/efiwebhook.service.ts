import { Injectable, Logger } from "@nestjs/common";
import { EfiWebhookDto } from "./dto/efi-webhook.dto";
import { TransactionStatus } from "./entities/payment.entity";
import { EfiWebhookEvent } from "./utils/efi-event.enum";
import { PaymentService } from "./payment.service";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class EfiWebhookService {
    private readonly logger = new Logger(EfiWebhookService.name);

    constructor(private readonly paymentService: PaymentService, private readonly sequelize: Sequelize) { }

    async handleEfiWebhook(payload: EfiWebhookDto): Promise<void> {
        this.logger.log(`Evento recebido: ${payload.evento}`);
        const transaction = await this.sequelize.transaction();
        try {
            switch (payload.evento) {
                case EfiWebhookEvent.PIX_CONFIRMADO: {
                    const txid = payload.data?.txid;
                    if (!txid) { this.logger.warn('TXID não informado'); break; };
                    const payment = await this.paymentService.findByTxId(txid);
                    const paymentInstance = await this.paymentService.getById(payment.paymentId);

                    paymentInstance.update({ transaction_status: TransactionStatus.APPROVED }, { transaction });
                    break;
                }
                case EfiWebhookEvent.CARTAO_APROVADO: {
                    const chargeId = payload.data?.charge_id;
                    if (!chargeId) { this.logger.warn('charge_id não informado'); break; };

                    const payment = await this.paymentService.findByChargeId(chargeId);
                    const paymentInstance = await this.paymentService.getById(payment.paymentId);

                    paymentInstance.update({ transaction_status: TransactionStatus.APPROVED }, { transaction });
                    break;
                }
                case EfiWebhookEvent.CARTAO_RECUSADO: {
                    const chargeId = payload.data?.charge_id;
                    if (!chargeId) { this.logger.warn('charge_id não informado'); break; }

                    const payment = await this.paymentService.findByChargeId(chargeId);
                    const paymentInstance = await this.paymentService.getById(payment.paymentId);

                    paymentInstance.update({ transaction_status: TransactionStatus.REJECTED }, { transaction });
                    break;
                }
                default:
                    this.logger.warn(`Evento não tratado: ${payload.evento}`);
            }
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            this.logger.error('Erro interno ao processar webhook EFI', err instanceof Error ? err.stack : String(err));
        }
    }
}
