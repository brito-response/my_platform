import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from './entities/payment.entity';
import { PaymentRepository } from './repository/payment.repository';
import { EfiWebhookController } from './webhook.controller';

@Module({
  imports: [SequelizeModule.forFeature([Payment])],
  controllers: [PaymentController, EfiWebhookController],
  providers: [PaymentService, PaymentRepository],
})
export class PaymentModule { }
