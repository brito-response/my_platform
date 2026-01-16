import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { Payment, TransactionStatus } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentRepository } from './repository/payment.repository';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { WalletService } from '../wallet/wallet.service';
import { EfiService } from './efi.service';
import { Sequelize } from 'sequelize-typescript';
import { UserService } from '../user/user.service';
import { ApiError } from 'src/common/errors/api.error';
import { PaymentResponse } from './utils/efi.interfaces';

@Injectable()
export class PaymentService extends BaseService<Payment, CreatePaymentDto, UpdatePaymentDto> {
  constructor(private readonly paymentRepository: PaymentRepository, private readonly userService: UserService, private readonly walletService: WalletService, private readonly efiService: EfiService, private readonly sequelize: Sequelize) {
    super(paymentRepository);
  }

  async getById(paymentId: string): Promise<Payment> {
    const payment = await this.paymentRepository.findById(paymentId);
    if (!payment) throw new ApiError("payment not found.", 404);
    return payment;
  }

  async findByTxId(txId: string): Promise<Payment> {
    const payment = await this.paymentRepository.findByTxId(txId);
    if (!payment) throw new ApiError("payment not found.", 404);
    return payment;
  }

  async findByChargeId(chargeId: string): Promise<Payment> {
    const payment = await this.paymentRepository.findByChargeId(chargeId);
    if (!payment) throw new ApiError("payment not found.", 404);
    return payment;
  }

  async createCreditPayment(userId: string, dto: CreatePaymentDto): Promise<PaymentResponse> {
    const transaction = await this.sequelize.transaction();
    try {
      const user = await this.userService.findOne(userId);
      const payment = await this.paymentRepository.createWithTransaction({ userId: user.userId, amount: dto.value, method: dto.method, transaction_status: TransactionStatus.PENDING, numberOfInstallments: dto.numberOfInstallments ?? 1 }, transaction);

      if (dto.method === 'pix') {
        const pixKey = await this.efiService.createRandomPixKey();
        const charge = await this.efiService.createImmediateChargePix({ chave: pixKey, valor: dto.value, nome: user.name, cpf: user.cpf, description: 'Crédito carteira Rei dos Freelas' });

        await payment.update({ txId: charge.txid }, { transaction });
        const qrCode = await this.efiService.generatePixQrCode(charge.loc.id);
        await transaction.commit();
        return { paymentId: payment.paymentId, type: 'pix', status: 'approved', qrCodeImage: qrCode.imagemQrcode, copyPaste: qrCode.qrcode };
      }

      if (dto.method === 'card') {
        const charge = await this.efiService.createCreditCardChargeOneStep([{ name: 'Crédito carteira', value: dto.value * 100, amount: dto.numberOfInstallments ?? 1 }], { name: user.name, cpf: user.cpf, email: user.email, phone_number: user.phone }, dto.paymentToken!);

        await payment.update({ chargeId: charge.data.charge_id }, { transaction });
        await transaction.commit();

        return { paymentId: payment.paymentId, type: 'card', status: 'approved' };
      }

      await transaction.rollback();
      throw new ApiError("invalid payment method.", 400);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async confirmPayment(paymentId: string): Promise<boolean> {
    const transaction = await this.sequelize.transaction();

    try {
      const payment = await this.getById(paymentId);
      if (payment.transaction_status !== TransactionStatus.APPROVED) return false;

      await this.walletService.addBalance(payment.userId, payment.amount, transaction);
      await transaction.commit();
      return true;
    } catch (err) {
      await transaction.rollback();
      return false;
    }
  }
}
