import { ApiProperty } from "@nestjs/swagger";

export class CreateReviewDto {
    @ApiProperty({ example: 5, description: 'Avaliação de 1 a 5' })
    rating: number;

    @ApiProperty({ example: 'Excelente profissional!', required: false })
    comment?: string;

    @ApiProperty({ example: 'uuid-do-usuario' })
    userId: string;
}
