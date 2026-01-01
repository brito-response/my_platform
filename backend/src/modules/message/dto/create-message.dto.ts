import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateMessageDto {
    @ApiProperty({ description: 'Conteúdo textual da mensagem', example: 'Olá, tudo bem?', })
    @IsString()
    content: string;

    @ApiProperty({ description: 'UUID do usuário que está enviando a mensagem', example: 'c1d2e3f4-5678-90ab-cdef-1234567890ab', })
    @IsUUID()
    senderId: string;

    @ApiProperty({ description: 'UUID do usuário que está recebendo a mensagem', example: 'd2e3f4a5-6789-0abc-def1-234567890abc', })
    @IsUUID()
    receiverId: string;

    @ApiPropertyOptional({ description: 'Arquivo anexo (opcional), pode ser uma URL ou nome do arquivo', example: 'https://meu-servidor.com/uploads/comprovante.pdf', })
    @IsOptional()
    @IsString()
    file?: string;
}
