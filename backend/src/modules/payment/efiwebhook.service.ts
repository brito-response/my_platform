import { Injectable, Logger } from '@nestjs/common';
import { EfiWebhookEvent } from './utils/efi-event.enum';
import { EfiWebhookDto } from './dto/efi-webhook.dto';
import { ApiError } from 'src/common/errors/api.error';
import { PaymentRepository } from './repository/payment.repository';
import { TransactionStatus } from './entities/payment.entity';

@Injectable()
export class EfiWebhookService {

    private readonly logger = new Logger(EfiWebhookService.name);

    constructor(
        private readonly paymentRepository: PaymentRepository,
    ) { }

    async handleEfiWebhook(payload: EfiWebhookDto): Promise<void> {
        this.logger.log(`Evento recebido: ${payload.evento}`);

        switch (payload.evento) {

            /** PIX */
            case EfiWebhookEvent.PIX_CONFIRMADO:
                await this.handlePixConfirmed(payload);
                break;

            /** BOLETO */
            case EfiWebhookEvent.BOLETO_PAGO:
                await this.handleBoletoPaid(payload);
                break;

            /** CARTÃO */
            case EfiWebhookEvent.CARTAO_APROVADO:
                await this.handleCreditCardApproved(payload);
                break;

            case EfiWebhookEvent.CARTAO_RECUSADO:
                await this.handleCreditCardRefused(payload);
                break;

            default:
                this.logger.warn(`Evento não tratado: ${payload.evento}`);
        }
    }

    private async handlePixConfirmed(payload: EfiWebhookDto) {
        const txid = payload.data.txid;
        if (!txid) throw new ApiError('TXID não informado', 400);

        const payment = await this.paymentRepository.findByTxId(txid);
        if (!payment) return;

        payment.transaction_status = TransactionStatus.PENDING;
        await payment.save();
    }

    private async handleBoletoPaid(payload: EfiWebhookDto) {
        const chargeId = payload.data.charge_id;
        if (!chargeId) return;

        const payment = await this.paymentRepository.findByChargeId(chargeId);
        if (!payment) return;

        payment.transaction_status = TransactionStatus.PENDING;
        await payment.save();
    }

    private async handleCreditCardApproved(payload: EfiWebhookDto) {
        const chargeId = payload.data.charge_id;
        if (!chargeId) return;

        const payment = await this.paymentRepository.findByChargeId(chargeId);
        if (!payment) return;

        payment.transaction_status = TransactionStatus.PENDING;
        await payment.save();
    }

    private async handleCreditCardRefused(payload: EfiWebhookDto) {
        const chargeId = payload.data.charge_id;
        if (!chargeId) return;

        const payment = await this.paymentRepository.findByChargeId(chargeId);
        if (!payment) return;

        payment.transaction_status = TransactionStatus.PENDING;
        await payment.save();
    }
}
