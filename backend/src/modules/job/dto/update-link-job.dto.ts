import { IsNotEmpty, IsString, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateLinkJobDto {
    @ApiProperty({ description: "Link de produção do projeto", example: "https://meuprojeto.com", required: true })
    @IsString({ message: "O link deve ser uma string" })
    @IsNotEmpty({ message: "O link não pode estar vazio" })
    @IsUrl({}, { message: "O link deve ser uma URL válida" })
    linkProject: string;
}
