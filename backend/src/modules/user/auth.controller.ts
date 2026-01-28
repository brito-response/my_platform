import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './utils/dto/login-user.dto';
import { ApiError } from 'src/common/errors/api.error';
import { RefreshDto } from './utils/dto/refresh-user.dto';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginResponseDto } from './utils/dto/response-login.dto';
import { ApiErrorResponseDto } from 'src/common/errors/base.api.error.dto';
import { ResponseResfreshTokenDto } from './utils/dto/response-resfresh.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(200)
    @ApiOkResponse({ type: LoginResponseDto })
    @ApiBadRequestResponse({ description: "client with type invalid", type: ApiErrorResponseDto })
    @ApiNotFoundResponse({ description: "user with this email not found", type: ApiErrorResponseDto })
    @ApiUnauthorizedResponse({ description: "incorrect password", type: ApiErrorResponseDto })
    @Post('login')
    async login(@Body() loginUsuarioDto: LoginUserDto): Promise<LoginResponseDto> {
        const { email, password, clientType } = loginUsuarioDto;
        if (!['web', 'mobile'].includes(clientType)) throw new ApiError('client with type invalid', 400);
        return await this.authService.login(email, password, clientType);
    }


    @ApiOkResponse({ type: ResponseResfreshTokenDto })
    @ApiNotFoundResponse({ description: "user not found" })
    @ApiBadRequestResponse({ description: "client with type invalid", type: ApiErrorResponseDto })
    @Post('refresh')
    async refresh(@Body() body: RefreshDto): Promise<ResponseResfreshTokenDto> {
        const { refreshToken, clientType } = body;
        if (!refreshToken) throw new ApiError('refresh token é obrigatório', 400);
        if (!['web', 'mobile'].includes(clientType)) throw new ApiError('client with type invalid', 400);

        return await this.authService.gernerateOtherTokenWithRefreshToken(refreshToken, clientType);
    }
}
