import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { Roles } from '../user/utils/decorators/roles.decorator';
import { JwtAuthGuard } from '../user/utils/guards/jwt.guard';
import { RolesGuard } from '../user/utils/guards/roles.guard';
import { ResponseWalletDto } from './dto';
import { plainToInstance } from 'class-transformer';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) { }

  @ApiOkResponse({ type: ResponseWalletDto, isArray: true })
  @ApiBearerAuth('jwt')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAll(): Promise<ResponseWalletDto[]> {
    const wallests = await this.walletService.findAll();
    return plainToInstance(ResponseWalletDto, wallests.map(wallet => wallet.toJSON()), { excludeExtraneousValues: true })
  }

  @ApiOkResponse({ type: ResponseWalletDto })
  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT', 'FREELANCER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/users/:userId")
  async getWalletByUser(@Param('userId') userId: string): Promise<ResponseWalletDto> {
    const wallet = await this.walletService.finByUserId(userId);
    return plainToInstance(ResponseWalletDto, wallet.toJSON(), { excludeExtraneousValues: true })
  }
}
