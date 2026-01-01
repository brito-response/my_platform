import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { TypeUserStatus } from "../../entities/user.entity";

export class UpdateUserDto {
  @ApiPropertyOptional({ description: "URL da foto de perfil" })
  @IsOptional()
  @IsString()
  photo?: string;

  @ApiPropertyOptional({ description: "Biografia do usuário" })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({ description: "Skills", type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @ApiPropertyOptional({ description: "Valor por hora" })
  @IsOptional()
  @IsNumber()
  hourly_rate?: number;

  @ApiPropertyOptional({ description: "Pontuação média" })
  @IsOptional()
  @IsNumber()
  score?: number;

  @ApiPropertyOptional({ description: "Usuário verificado" })
  @IsOptional()
  @IsBoolean()
  checked?: boolean;

  @ApiPropertyOptional({ description: "Status do usuário", enum: TypeUserStatus })
  @IsOptional()
  @IsEnum(TypeUserStatus)
  userStatus?: TypeUserStatus;
}
