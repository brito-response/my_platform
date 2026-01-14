import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from './entities/payment.entity';
import { PaymentRepository } from './repository/payment.repository';
import { EfiWebhookController } from './webhook.controller';
import { EfiWebhookService } from './efiwebhook.service';
import { WalletModule } from '../wallet/wallet.module';
import { EfiService } from './efi.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [SequelizeModule.forFeature([Payment]), WalletModule, UserModule],
  controllers: [PaymentController, EfiWebhookController],
  providers: [PaymentService, EfiService, EfiWebhookService, PaymentRepository],
})
export class PaymentModule { }
