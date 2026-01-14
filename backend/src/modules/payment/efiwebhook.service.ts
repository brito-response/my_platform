import { Injectable, Logger } from "@nestjs/common";
import { EfiWebhookDto } from "./dto/efi-webhook.dto";
import { TransactionStatus } from "./entities/payment.entity";
import { PaymentRepository } from "./repository/payment.repository";
import { EfiWebhookEvent } from "./utils/efi-event.enum";

@Injectable()
export class EfiWebhookService {
    private readonly logger = new Logger(EfiWebhookService.name);

    constructor(private readonly paymentRepository: PaymentRepository) { }

    async handleEfiWebhook(payload: EfiWebhookDto): Promise<void> {
        this.logger.log(`Evento recebido: ${payload.evento}`);
        try {
            switch (payload.evento) {
                case EfiWebhookEvent.PIX_CONFIRMADO: {
                    const txid = payload.data?.txid;
                    if (!txid) {
                        this.logger.warn('TXID não informado');
                        break;
                    }

                    await this.updateByTxId(TransactionStatus.APPROVED, txid);
                    break;
                }
                case EfiWebhookEvent.CARTAO_APROVADO: {
                    const chargeId = payload.data?.charge_id;
                    if (!chargeId) {
                        this.logger.warn('charge_id não informado');
                        break;
                    }

                    await this.updateByChargeId(TransactionStatus.APPROVED, chargeId);
                    break;
                }
                case EfiWebhookEvent.CARTAO_RECUSADO: {
                    const chargeId = payload.data?.charge_id;
                    if (!chargeId) {
                        this.logger.warn('charge_id não informado');
                        break;
                    }

                    await this.updateByChargeId(TransactionStatus.REJECTED, chargeId);
                    break;
                }
                default:
                    this.logger.warn(`Evento não tratado: ${payload.evento}`);
            }
        } catch (error) {
            this.logger.error('Erro interno ao processar webhook EFI',error instanceof Error ? error.stack : String(error));
        }
    }


    private async updateByTxId(status: TransactionStatus, txid?: string) {
        if (!txid) {
            this.logger.warn('TXID não informado');
            return;
        }

        const payment = await this.paymentRepository.findByTxId(txid);
        if (!payment) return;

        if (payment.transaction_status === status) return;

        payment.transaction_status = status;
        await payment.save();
    }


    private async updateByChargeId(status: TransactionStatus, chargeId: string) {
        const payment = await this.paymentRepository.findByChargeId(chargeId);
        if (!payment) return;
        if (payment.transaction_status === status) return;

        payment.transaction_status = status;
        await payment.save();
    }
}
