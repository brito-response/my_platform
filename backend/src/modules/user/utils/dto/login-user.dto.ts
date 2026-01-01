import { IsEmail, IsIn, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'joao@email.com', description: 'Email válido' })
  @IsEmail({}, { message: 'E-mail inválido.' })
  email: string;

  @ApiProperty({ example: 'JoãoRaparigueiro321#', description: 'Senha com 6 a 20 caracteres' })
  @IsString()
  @Length(6, 20, { message: 'A senha deve ter entre 6 e 20 caracteres.' })
  password: string;

  @ApiProperty({ example: 'web', description: 'Tipo de cliente (web ou mobile)', enum: ['web', 'mobile'] })
  @IsIn(['web', 'mobile'], { message: 'O tipo de cliente deve ser "web" ou "mobile".' })
  clientType: 'web' | 'mobile';
}
