import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './utils/dto/create-user.dto';
import { BaseService } from 'src/common/base/base.service';
import { fromString, TypeUser, User } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { EmailService } from './email.service';
import { TokenService } from './token.service';
import * as bcrypt from 'bcrypt';
import { ApiError } from 'src/common/errors/api.error';
import { InferCreationAttributes } from 'sequelize';
import { UpdateUserPasswordDto } from './utils/dto/update-user-password.dto';
import { Contract } from '../contract/entities/contract.entity';
import { Job } from '../job/entities/job.entity';
import { PortfolioService } from '../portfolio/portfolio.service';
import { Portfolio } from '../portfolio/entities/portfolio.entity';
import { UsersData } from './utils/dto/user-report.dto';
import { UpdateUserDto } from './utils/dto/update-user.dto';

@Injectable()
export class UserService extends BaseService<User, CreateUserDto, UpdateUserDto> {
  constructor(private readonly userRepository: UserRepository, private readonly emailService: EmailService, private readonly tokenService: TokenService, private readonly portifolioService: PortfolioService) {
    super(userRepository);
  }

  async create(createDto: CreateUserDto): Promise<User> {
    const { repeatPassword, ...userData } = createDto;
    return await this.userRepository.criar(userData as InferCreationAttributes<User>);
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.userRepository.buscarPorEmail(email);
  }

  async sendEmailcheck(email: string): Promise<boolean> {
    const usuario = await this.userRepository.buscarPorEmail(email);
    if (usuario) {
      try {
        const token = await this.tokenService.generateToken(email);
        this.emailService.sendEmail(email, 'use esse link para verificar sua conta na nossa plataforma', token, `um html "/users/email-code-checked/:${token}/:${email}"`);
      } catch (error) {
        throw new ApiError(`Deu pau:${error}`, 400);
      }
      return true;
    }
    return false;
  }

  async getCheckEmail(token: string, email: string): Promise<boolean> {
    const tokenvalido = await this.tokenService.validateToken(token, email);
    if (tokenvalido) {
      const usuario = await this.userRepository.buscarPorEmail(email);
      if (usuario) {
        usuario.checked = true;
        const [atualizou] = await this.userRepository.update(usuario?.userId, usuario);
        return true;
      }
    }
    return false;
  }


  async sendEmailWithHashResetPassword(email: string): Promise<boolean> {
    const usuario = await this.userRepository.buscarPorEmail(email);
    if (usuario) {
      try {
        const token = await this.tokenService.generateToken(email);
        /** to: string → O destinatário do e-mail (exemplo: "usuario@email.com").
         *  subject: string → O assunto do e-mail (exemplo: "Bem-vindo ao nosso serviço!").
         *  text: string → O corpo do e-mail em texto puro (sem formatação HTML).
         *  html?: string → (Opcional) O corpo do e-mail em formato HTML, permitindo estilização e formatação. */
        this.emailService.sendEmail(email, 'Token para redefinição de senha', token, `um html "${token}"`);
      } catch (error) {
        throw new Error(`Deu pau:${error}`);
      }
      return true;
    }
    return false;
  }

  async redefinirSenha(token: string, email: string, password: string, repassword: string): Promise<number> {
    const tokenvalido = await this.tokenService.validateToken(token, email);
    if (tokenvalido) {
      const objetoEmailDecritado = await this.tokenService.decryptToken(token);
      if (objetoEmailDecritado === email && password === repassword) {
        const usuario = await this.userRepository.buscarPorEmail(email);
        if (usuario) {
          const salt = await bcrypt.genSalt(12);
          usuario.password = await bcrypt.hash(password, salt);
          const [atualizou] = await this.userRepository.update(usuario?.userId, usuario);
          return atualizou;
        }
      }
    }
    return 0;
  }

  async listarPaginado(limit: number, offset: number): Promise<{ rows: User[]; count: number }> {
    const objectWithUsuarios = await this.userRepository.findWithPagination(limit, offset);
    if (!objectWithUsuarios) throw new ApiError('Erro interno: o recurso não pôde ser recuperado!', 400);
    return objectWithUsuarios;
  }

  async getUsersOfType(tipoUsuario: string): Promise<User[]> {
    let tipo: TypeUser;
    try {
      tipo = fromString(tipoUsuario);
    } catch {
      throw new ApiError('this type of user is not valid.', 400);
    }
    return await this.userRepository.buscarPorTipo(tipo);
  }

  async updatePassword(id: string, updateDto: UpdateUserPasswordDto): Promise<[number, User[]]> {
    const user = await this.findOne(id);
    const passwordMatch = await bcrypt.compare(updateDto.password, user.password);

    if (!passwordMatch) throw new ApiError("invalid user password", 400);

    const hashed = await bcrypt.hash(updateDto.newPassword, 12);
    return this.userRepository.updatePassword(user.userId, hashed);
  }

  async getJobsOfUser(userId: string): Promise<Job[]> {
    const user = await this.userRepository.findOne(userId);
    if (!user) throw new ApiError(`Usuário com ID ${userId} não encontrado`, 404);

    const jobs = await this.userRepository.buscarJobsDoUsuario(userId);
    if (!jobs.length) throw new ApiError('Nenhum job encontrado para este usuário.', 404);

    return jobs;
  }

  async getContractsOfUser(userId: string): Promise<Contract[]> {
    const user = await this.userRepository.findOne(userId);
    if (!user) throw new ApiError(`Usuário com ID ${userId} não encontrado`, 404);

    const contracts = await this.userRepository.buscarContratosDoUsuario(userId);
    if (!contracts.length) throw new ApiError('Nenhum contrato encontrado para este usuário.', 404);

    return contracts;
  }

  async getPortifolioFromUser(userId: string): Promise<Portfolio> {
    const user = await this.userRepository.findOne(userId);
    if (!user) throw new ApiError(`Usuário com ID ${userId} não encontrado`, 404);
    return await this.portifolioService.getPortfolioOfUser(userId);
  }

  async addPhoto(id: string, newImages: string) {
    const user = await this.userRepository.getInstanceOfUserById(id);
    if (!user) throw new ApiError('Projeto não encontrado', 404);
    user.photo = newImages;
    await user.save();
    return user;
  }

  async getReports(): Promise<UsersData> {
    return await this.userRepository.findAllUsersData();
  }

}
