import { IsNotEmpty, MinLength } from "class-validator";
import { Match } from "../decorators/validators/match.decorator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserPasswordDto {
    @ApiProperty({ description: "Senha atual do usuário", minLength: 6, example: "senhaAtual123" })
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty({ description: "Senha atual do usuário", minLength: 6, example: "senhaAtual123" })
    @IsNotEmpty()
    @MinLength(6)
    newPassword: string;

    @ApiProperty({ description: "Repetir nova senha para confirmação (deve ser igual a newPassword)", minLength: 6, example: "novaSenha123" })
    @IsNotEmpty()
    @MinLength(6)
    @Match('newPassword', { message: 'As senhas não coincidem.' })
    repeatPassword: string;
}