import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { TypeUser, TypeUserStatus } from "../../entities/user.entity";

export interface ResponseUser {
    userId: string;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    photo?: string;
    bio?: string;
    country: string;
    state: string;
    city: string;
    address: string;
    skills?: string[];
    hourly_rate?: number;
    score?: number;
    typeuser: TypeUser;
    userStatus: TypeUserStatus;
    checked?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

@Exclude()
export class ResponseUserDto implements ResponseUser {
    @Expose()
    @ApiProperty({ example: 'b8c1f1d4-7a5c-4b8f-9b1a-123456789abc' })
    userId: string;

    @Expose()
    @ApiProperty({ example: 'João Silva' })
    name: string;

    @Expose()
    @ApiProperty({ example: 'joao@email.com' })
    email: string;

    @Expose()
    @ApiProperty({ example: '12345678900' })
    cpf: string;

    @Expose()
    @ApiProperty({ example: '+55 11 99999-9999' })
    phone: string;

    @Expose()
    @ApiPropertyOptional({ example: 'https://meusite.com/foto.png' })
    photo?: string;

    @Expose()
    @ApiPropertyOptional({ example: 'Desenvolvedor fullstack' })
    bio?: string;

    @Expose()
    @ApiProperty({ example: 'Brasil' })
    country: string;

    @Expose()
    @ApiProperty({ example: 'SP' })
    state: string;

    @Expose()
    @ApiProperty({ example: 'São Paulo' })
    city: string;

    @Expose()
    @ApiProperty({ example: 'Rua Exemplo, 123' })
    address: string;

    @Expose()
    @ApiPropertyOptional({ example: ['NestJS', 'TypeScript', 'PostgreSQL'], type: [String] })
    skills?: string[];

    @Expose()
    @ApiPropertyOptional({ example: 120.5 })
    hourly_rate?: number;

    @Expose()
    @ApiPropertyOptional({ example: 4.8 })
    score?: number;

    @Expose()
    @ApiProperty({ enum: TypeUser, example: TypeUser.FREELANCER })
    typeuser: TypeUser;

    @Expose()
    @ApiProperty({ enum: TypeUserStatus, example: TypeUserStatus.ACTIVE })
    userStatus: TypeUserStatus;

    @Expose()
    @ApiPropertyOptional({ example: true })
    checked?: boolean;

    @Expose()
    @ApiPropertyOptional({ example: '2024-01-01T12:00:00.000Z' })
    createdAt?: Date;

    @Expose()
    @ApiPropertyOptional({ example: '2024-01-01T12:00:00.000Z' })
    updatedAt?: Date;
}