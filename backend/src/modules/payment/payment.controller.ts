import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { EfiWebhookService } from './efiwebhook.service';
import { EfiWebhookDto } from './dto/efi-webhook.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService, private readonly efiWebhookService: EfiWebhookService) { }

  @Post(':id/credits')
  async createCredit(@Param('id') userIdLogado: string, @Body() dto: CreatePaymentDto) {
    return this.paymentService.createCreditPayment(userIdLogado, dto);
  }

   @Post('webhook/efi')
  async handleWebhook(@Body() payload: EfiWebhookDto) {
    await this.efiWebhookService.handleEfiWebhook(payload);
    return { ok: true };
  }

  @Get()
  async findAll() {
    return await this.paymentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.paymentService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return await this.paymentService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.paymentService.remove(id);
  }

}
