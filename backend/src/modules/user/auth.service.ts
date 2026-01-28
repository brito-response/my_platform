import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { ApiError } from 'src/common/errors/api.error';
import { TypeUser, TypeUserStatus, User } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { LoginResponse } from './utils/dto/response-login.dto';
import { ResponseResfreshToken } from './utils/dto/response-resfresh.dto';

@Injectable()
export class AuthService {
    private readonly JWT_SECRET: string;
    private readonly JWT_REFRESH_SECRET: string;

    constructor(private readonly configService: ConfigService, private readonly usuarioRepository: UserRepository) {
        this.JWT_SECRET = this.configService.get<string>('JWT_SECRET') ?? '';
        this.JWT_REFRESH_SECRET = this.configService.get<string>('JWT_REFRESH_SECRET') ?? '';
    }

    generateToken(userId: string, userName: string, email: string, image: string, typeuser: TypeUser, userStatus: TypeUserStatus, clientType: 'web' | 'mobile') {
        const expiresIn = clientType === 'web' ? '30m' : '7d';
        return jwt.sign({ userId, userName, email, image, typeuser, userStatus, roles: typeuser, clientType }, this.JWT_SECRET, { expiresIn });
    }

    generateRefreshToken(userId: string) {
        return jwt.sign({ userId }, this.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    }

    async login(email: string, password: string, clientType: 'web' | 'mobile'): Promise<LoginResponse> {
        const usuario: User | null = await this.usuarioRepository.buscarPorEmail(email);
        if (!usuario) throw new ApiError('user with this email not found', 404);

        const passwordMatch = await bcrypt.compare(password, usuario.password);
        if (!passwordMatch) throw new ApiError('Incorrect password', 401);

        const accessToken = this.generateToken(usuario.userId, usuario.name, usuario.email, usuario.photo, usuario.typeuser, usuario.userStatus, clientType);
        const refreshToken = this.generateRefreshToken(usuario.userId);

        return { accessToken, refreshToken };
    }

    private verifyToken(token: string, secret: string): any {
        try {
            return jwt.verify(token, secret) as jwt.JwtPayload;
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) { throw new ApiError('Token expired', 401); };
            if (err instanceof jwt.JsonWebTokenError) { throw new ApiError('Invalid token', 401); };
            throw new ApiError('Token verification failed', 401);
        }
    }

    async gernerateOtherTokenWithRefreshToken(oldRefreshToken: string, clientType: 'web' | 'mobile'):Promise<ResponseResfreshToken> {
        const payload = this.verifyToken(oldRefreshToken, this.JWT_REFRESH_SECRET);
        const usuario = await this.usuarioRepository.findById(payload.userId);
        if (!usuario) throw new ApiError('User not found', 404);

        const newAccessToken = this.generateToken(usuario.userId!, usuario.name!, usuario.email!, usuario.photo!, usuario.typeuser!, usuario.userStatus!, clientType);
        return { accessToken: newAccessToken };
    }



}
