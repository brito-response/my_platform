import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponse } from './utils/interfaces/login-response';
import { LoginUserDto } from './utils/dto/login-user.dto';
import { ApiError } from 'src/common/errors/api.error';
import { RefreshDto } from './utils/dto/refresh-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginUsuarioDto: LoginUserDto): Promise<LoginResponse> {
        const { email, password, clientType } = loginUsuarioDto;
        if (!['web', 'mobile'].includes(clientType)) throw new ApiError('client type inválido', 400);
        return await this.authService.login(email, password, clientType);
    }

    @Post('refresh')
    async refresh(@Body() body: RefreshDto) {
        const { refreshToken, clientType } = body;
        if (!refreshToken)throw new ApiError('refresh token é obrigatório', 400);
        if (!['web', 'mobile'].includes(clientType)) throw new ApiError('client type inválido', 400);

        return await this.authService.gernerateOtherTokenWithRefreshToken(refreshToken, clientType);
    }
}
