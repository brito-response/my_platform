import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { EfiWebhookService } from './efiwebhook.service';
import { EfiWebhookDto } from './dto/efi-webhook.dto';

@Controller('webhooks/efi')
export class EfiWebhookController {

  constructor(
    private readonly webhookService: EfiWebhookService,
  ) {}

  @Post()
  @HttpCode(200)
  async receiveWebhook(@Body() body: EfiWebhookDto): Promise<string> {
    await this.webhookService.handleEfiWebhook(body);
    // A Efi espera literalmente isso
    return '200';
  }
}
