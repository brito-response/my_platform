import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, UseGuards, UseInterceptors, UploadedFiles, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './utils/dto/create-user.dto';
import { User } from './entities/user.entity';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { EmailResetDto } from './utils/dto/email-reset.dto';
import { ResetPasswordDto } from './utils/dto/reset-password.dto';
import { ApiError } from 'src/common/errors/api.error';
import { UpdateUserDto } from './utils/dto/update-user.dto';
import { UpdateUserPasswordDto } from './utils/dto/update-user-password.dto';
import { JwtAuthGuard } from './utils/guards/jwt.guard';
import { Roles } from './utils/decorators/roles.decorator';
import { RolesGuard } from './utils/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { ResponseUserDto } from './utils/dto/response-user.dto';
import { plainToInstance } from 'class-transformer';
import { ApiErrorResponseDto } from 'src/common/errors/base.api.error.dto';
import { UsersDataDto } from './utils/dto/user-report.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiCreatedResponse({ type: ResponseUserDto })
  @ApiBadRequestResponse({ description: "passwords do not match", type: ApiErrorResponseDto })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const { password, repeatPassword } = createUserDto;
    if (password !== repeatPassword) throw new ApiError('passwords do not match', 400);
    const usercreated = await this.userService.createRemovePassword(createUserDto);
    return plainToInstance(ResponseUserDto, usercreated.toJSON(), { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: UsersDataDto })
  @ApiInternalServerErrorResponse({ type: ApiErrorResponseDto })
  @Get('reports')
  async findReports(): Promise<UsersDataDto> {
    const data = await this.userService.getReports();
    return plainToInstance(UsersDataDto, data.toJSON(), { excludeExtraneousValues: true })
  }

  @ApiOkResponse({ type: ResponseUserDto, isArray: true })
  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT', 'FREELANCER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.userService.findAll();
    return plainToInstance(ResponseUserDto, users.map(user => user.toJSON()), { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: UsersDataDto })
  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT', 'FREELANCER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUserDto): Promise<ResponseUserDto> {
    const userUpdated = await this.userService.update(id, updateUsuarioDto);
    return plainToInstance(ResponseUserDto, userUpdated.toJSON(), { excludeExtraneousValues: true })
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT', 'FREELANCER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/password')
  async updatePassword(@Param('id') id: string, @Body() updateUserPassword: UpdateUserPasswordDto): Promise<[number, User[]]> {
    return this.userService.updatePassword(id, updateUserPassword);
  }

  @Post('code-checked/:email')
  async sendEmailcheck(@Param('email') email: string): Promise<boolean> {
    return await this.userService.sendEmailcheck(email);
  }

  @Get('code-checked/:email/:code')
  async getCheckEmail(@Param('email') email: string, @Param('code') code: string): Promise<boolean> {
    return await this.userService.getCheckEmail(code, email);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT', 'FREELANCER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT', 'FREELANCER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<number> {
    return this.userService.remove(id);
  }

  @Post('email-reset-password')
  async sendEmailPassword(@Body() emailDto: EmailResetDto): Promise<boolean> {
    return await this.userService.sendEmailWithHashResetPassword(emailDto.email);
  }

  @Put('reset-password')
  async redefinePassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<{ usuarioId: number }> {
    const { token, email, password, repassword } = resetPasswordDto;
    const redefinido = await this.userService.redefinirSenha(token, email, password, repassword);
    return { usuarioId: redefinido };
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT', 'FREELANCER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('paginate')
  async getPaginate(@Query('limit') limit: string = '10', @Query('offset') offset: string = '0'): Promise<{ rows: User[]; count: number }> {
    const limitNumber = Number(limit);
    const offsetNumber = Number(offset);
    if (isNaN(limitNumber) || isNaN(offsetNumber)) throw new ApiError('Invalid query parameters, not numbers.', 400);
    return await this.userService.listarPaginado(limitNumber, offsetNumber);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT', 'FREELANCER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('typeof')
  async getAllUsers(@Query('tipouser') tipouser: string): Promise<User[]> {
    return await this.userService.getUsersOfType(tipouser);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT', 'FREELANCER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id/jobs')
  async getJobsOfUser(@Param('id') id: string) {
    return this.userService.getJobsOfUser(id);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT', 'FREELANCER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id/contracts')
  async getContractsOfUser(@Param('id') id: string) {
    return this.userService.getContractsOfUser(id);
  }

  @ApiBearerAuth('jwt')
  @Roles('ADMIN', 'CLIENT', 'FREELANCER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id/portfolios')
  async getUserPortfolio(@Param('id') userId: string) {
    return this.userService.getPortifolioFromUser(userId);
  }

  @Patch(':id/photo')
  @ApiOperation({ summary: 'Upload da foto do usuário' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { photo: { type: 'string', format: 'binary' }, }, }, })
  @UseInterceptors(FileInterceptor('photo', {
    storage: diskStorage({
      destination: join(process.cwd(), 'uploads/users/profile'),
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `photo-${uniqueSuffix}${ext}`);
      },
    }),
  }),
  )
  async uploadPhoto(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    if (!file) throw new ApiError('Nenhuma foto enviada', 400);
    const filePath = `/uploads/users/profile/${file.filename}`;
    // Chama o serviço para atualizar a foto do usuário
    const updatedUser = await this.userService.addPhoto(id, filePath);
    return updatedUser;
  }

}
