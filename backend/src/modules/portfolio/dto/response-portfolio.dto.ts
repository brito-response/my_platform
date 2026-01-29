import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export interface ResponsePortfolio {
    portfolioId: string;
    title?: string;
    location?: string;
    profession?: string;
    academicBackground?: string;
    banner?: string;
    description?: string;
    githubUsername?: string;
    links?: string[];
    userId?: string;
    createdAt: Date;
    updatedAt: Date;
};

@Exclude()
export class ResponsePortfolioDto implements ResponsePortfolio {

    @Expose()
    @ApiProperty({ example: 'a7d2e5f4-9c3b-4a6d-8c1e-123456789abc' })
    portfolioId: string;

    @Expose()
    @ApiPropertyOptional({ example: 'Full Stack Developer Portfolio' })
    title?: string;

    @Expose()
    @ApiPropertyOptional({ example: 'São Paulo - Brazil' })
    location?: string;

    @Expose()
    @ApiPropertyOptional({ example: 'Full Stack Developer' })
    profession?: string;

    @Expose()
    @ApiPropertyOptional({ example: 'Bachelor in Computer Science' })
    academicBackground?: string;

    @Expose()
    @ApiPropertyOptional({ example: 'https://cdn.example.com/banner.png' })
    banner?: string;

    @Expose()
    @ApiPropertyOptional({ example: 'Experienced developer focused on scalable web applications.' })
    description?: string;

    @Expose()
    @ApiPropertyOptional({ example: 'octocat' })
    githubUsername?: string;

    @Expose()
    @ApiPropertyOptional({ type: [String], example: ['https://linkedin.com/in/username', 'https://personal-site.com'] })
    links?: string[];

    @Expose()
    @ApiPropertyOptional({ example: 'b8c1f1d4-7a5c-4b8f-9b1a-123456789abc' })
    userId?: string;

    @Expose()
    @ApiProperty({ example: '2026-01-28T23:20:21.738Z' })
    createdAt: Date;

    @Expose()
    @ApiProperty({ example: '2026-01-28T23:20:21.738Z' })
    updatedAt: Date;
}