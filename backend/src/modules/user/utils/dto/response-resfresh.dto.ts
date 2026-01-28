import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

export interface ResponseResfreshToken {
    accessToken: string;
};

@Exclude()
export class ResponseResfreshTokenDto implements ResponseResfreshToken {

    @ApiProperty({ description: 'JWT para renovação do token', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
    @Expose()
    accessToken: string;
    
}