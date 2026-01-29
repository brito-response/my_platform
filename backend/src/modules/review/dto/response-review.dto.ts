import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

export interface ResponseReview {
    reviewId: string;
    rating: number;
    comment: string | null;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
};


@Exclude()
export class ResponseReviewDto implements ResponseReview {

    @Expose()
    @ApiProperty({ example: '9c1c5b4a-8a5b-4a0d-9d6c-123456789abc' })
    reviewId: string;

    @Expose()
    @ApiProperty({ minimum: 1, maximum: 5, example: 4, description: 'Rating from 1 to 5', })
    rating: number;

    @Expose()
    @ApiPropertyOptional({ example: 'Very good service!', nullable: true, })
    comment: string | null;

    @Expose()
    @ApiProperty({
        example: 'b8c1f1d4-7a5c-4b8f-9b1a-123456789abc',
    })
    userId: string;

    @Expose()
    @ApiPropertyOptional({ example: '2026-01-28T23:20:21.738Z' })
    createdAt?: Date;

    @Expose()
    @ApiPropertyOptional({ example: '2026-01-28T23:20:21.738Z' })
    updatedAt?: Date;
};