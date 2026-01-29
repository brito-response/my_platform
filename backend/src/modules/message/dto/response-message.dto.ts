import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export interface ResponseMessage {
    messageId: string;
    content: string;
    file: string | null;
    createdAt: Date;
    updatedAt: Date;
};

@Exclude()
export class ResponseMessageDto implements ResponseMessage {

    @Expose()
    @ApiProperty({ example: '8a7c2d4e-1f23-4a9b-b123-abcdef123456' })
    messageId: string;

    @Expose()
    @ApiProperty({ example: 'Olá, essa é uma mensagem de teste' })
    content: string;

    @Expose()
    @ApiPropertyOptional({ example: 'https://cdn.app.com/files/file.pdf', nullable: true })
    file: string | null;

    @Expose()
    @ApiProperty({ example: '2026-01-28T23:20:21.738Z' })
    createdAt: Date;

    @Expose()
    @ApiProperty({ example: '2026-01-28T23:20:21.738Z' })
    updatedAt: Date;
};