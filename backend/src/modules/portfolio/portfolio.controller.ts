import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { RegisterLinkDto } from './dto/register-link-portfolio.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../user/utils/decorators/roles.decorator';
import { JwtAuthGuard } from '../user/utils/guards/jwt.guard';
import { RolesGuard } from '../user/utils/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller('portfolios')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) { }

  @Post()
  async create(@Body() createPortfolioDto: CreatePortfolioDto) {
    return await this.portfolioService.create(createPortfolioDto);
  }

  @Get()
  async findAll() {
    return await this.portfolioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.portfolioService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePortfolioDto: UpdatePortfolioDto) {
    return await this.portfolioService.update(id, updatePortfolioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.portfolioService.remove(id);
  }

  @Get(":userId/links")
  async getlinksOfPortifolio(@Param('userId') userId: string) {
    return await this.portfolioService.getlinksOfUser(userId);
  }

  @Post(":portifolioId/links")
  async registerLink(@Param('portifolioId') portifolioId: string, @Body() linkObj: RegisterLinkDto) {
    return await this.portfolioService.saveLinkToUser(portifolioId, linkObj);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT', 'FREELANCER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id/banner')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({ destination: './uploads/portfolios', filename: (req, file, cb) => { const uniqueName = `${uuidv4()}${extname(file.originalname)}`; cb(null, uniqueName); } }),
  }))
  async updateBanner(@Param('id') portfolioId: string, @UploadedFile() file: Express.Multer.File, @Req() req: any,) {
    const bannerPath = `portfolios/${file.filename}`;
    const userId = req.user.userId; // vindo do JWT

    const updated = await this.portfolioService.updateBanner(portfolioId, userId, bannerPath);

    return { message: 'Banner atualizado com sucesso', portfolio: updated };
  }

  @Get(':id/projects')
  async findProjects(@Param('id') id: string) {
    return await this.portfolioService.findProjectsByPortfolioId(id);
  }
}

