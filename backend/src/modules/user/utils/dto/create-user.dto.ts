import { IsEmail,IsIn, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { TypeUser } from '../../entities/user.entity';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome completo do usuário' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email do usuário' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'CPF do usuário' })
  @IsNotEmpty()
  @IsString()
  cpf: string;

  @ApiProperty({ description: 'Senha do usuário', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'Repetição da senha para validação', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  repeatPassword: string;

  @ApiPropertyOptional({ description: 'Telefone do usuário' })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty({ description: 'País do usuário' })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({ description: 'Estado do usuário' })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({ description: 'Cidade do usuário' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ description: 'Endereço do usuário' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ description: 'Tipo de usuário', enum: [TypeUser.CLIENT, TypeUser.FREELANCER]})
  @Transform(({ value }) => value.toUpperCase())
  @IsIn([TypeUser.CLIENT, TypeUser.FREELANCER], { message: 'typeuser deve ser "client" ou "freelancer"' })
  typeuser: TypeUser;
}
