import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { Roles } from '../user/utils/decorators/roles.decorator';
import { JwtAuthGuard } from '../user/utils/guards/jwt.guard';
import { RolesGuard } from '../user/utils/guards/roles.guard';
import { Wallet } from './entities/wallet.entity';
import { ResponseWallet, ResponseWalletDto } from './dto/response-wallet.dto';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) { }

  @ApiOkResponse({ type: ResponseWalletDto, isArray: true })
  @ApiBearerAuth('jwt')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAll(): Promise<ResponseWalletDto[]> {
    return await this.walletService.findAll();
  }

  @ApiOkResponse({ type: ResponseWalletDto, isArray: true })
  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT', 'FREELANCER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/users/:userId")
  async getWalletByUser(@Param('userId') userId: string): Promise<ResponseWalletDto> {
    return await this.walletService.finByUserId(userId);
  }
}
