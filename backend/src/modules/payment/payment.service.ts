import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentRepository } from './repository/payment.repository';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService extends BaseService<Payment, CreatePaymentDto,UpdatePaymentDto> {
  constructor(private readonly paymentRepository: PaymentRepository) {
    super(paymentRepository);
  }
}
