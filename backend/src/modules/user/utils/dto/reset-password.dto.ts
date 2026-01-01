import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Match } from '../decorators/validators/match.decorator';

export class ResetPasswordDto {
  @ApiProperty({
    example: 'dfhsgfdsgfjdsgfhj@3fdwsf123',
    description: 'Token de redefinição',
  })
  @IsString()
  token: string;

  @ApiProperty({ example: 'joao@email.com', description: 'Email válido' })
  @IsEmail({}, { message: 'E-mail inválido.' })
  email: string;

  @ApiProperty({example: 'JoãoRaparigueiro321#',description: 'Senha com 6 a 20 caracteres'})
  @IsString()
  @Length(6, 20, { message: 'A senha deve ter entre 6 e 20 caracteres.' })
  password: string;

  @ApiProperty({example: 'JoãoRaparigueiro321#',description: 'Repita a senha'})
  @IsString()
  @Length(6, 20, { message: 'A senha deve ter entre 6 e 20 caracteres.' })
  @Match('password', { message: 'As senhas não coincidem.' })
  repassword: string;
}
