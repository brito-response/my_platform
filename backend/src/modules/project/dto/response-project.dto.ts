import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

export interface ResponseProject {
    projectId: string;
    title: string;
    description: string;
    images: string[];
    link: string;
    favorite: boolean;
    createdAt: Date;
    updatedAt: Date;
};

@Exclude()
export class ResponseProjectDto implements ResponseProject {

    @Expose()
    @ApiProperty({ example: '3f1b8b9e-7e8d-4e1a-9b62-123456789abc' })
    projectId: string;

    @Expose()
    @ApiProperty({ example: 'E-commerce Platform' })
    title: string;

    @Expose()
    @ApiProperty({ example: 'A full-stack e-commerce platform built with NestJS and React.' })
    description: string;

    @Expose()
    @ApiProperty({ type: [String], example: ['https://cdn.example.com/project1.png', 'https://cdn.example.com/project2.png',] })
    images: string[];

    @Expose()
    @ApiProperty({ example: 'https://github.com/user/project' })
    link: string;

    @Expose()
    @ApiPropertyOptional({ example: true, description: 'Indicates if the project is marked as favorite' })
    favorite: boolean;

    @Expose()
    @ApiProperty({ example: '2026-01-28T23:20:21.738Z' })
    createdAt: Date;

    @Expose()
    @ApiProperty({ example: '2026-01-28T23:20:21.738Z' })
    updatedAt: Date;
};