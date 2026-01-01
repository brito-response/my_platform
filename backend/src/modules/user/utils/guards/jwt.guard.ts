import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { TypeUser, TypeUserStatus } from '../../entities/user.entity';
import { ConfigService } from '@nestjs/config';

interface JwtPayload { userId: string; typeuser: TypeUser; userStatus: TypeUserStatus; clientType: 'web' | 'mobile'; iat?: number; exp?: number; }

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request & { user?: JwtPayload }>();
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token não informado');
    }
    const token = authHeader.split(' ')[1];
    const JWT_SECRET = this.configService.get<string>('JWT_SECRET') ?? '';

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

      if (decoded.userStatus !== 'ACTIVE') {
        throw new UnauthorizedException('Usuário não está ativo');
      }

      request.user = decoded; // adiciona o payload do token no request
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
