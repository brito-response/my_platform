import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

export interface LoginResponse { accessToken: string; refreshToken: string; };

@Exclude()
export class LoginResponseDto implements LoginResponse {

    @ApiProperty({ description: 'JWT de acesso', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
    @Expose()
    accessToken: string;

    @ApiProperty({ description: 'JWT para renovação do token', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
    @Expose()
    refreshToken: string;
}