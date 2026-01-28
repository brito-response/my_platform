import { ApiProperty } from '@nestjs/swagger';
import { ProposalStatus } from '../entities/proposal.entity';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseProposalDto {
    @ApiProperty({ format: 'uuid', example: '9b9a7b62-fd5a-4e12-9c59-d3b3d6e94c67' })
    @Expose()
    proposalId: string;

    @ApiProperty({ example: 2500.5 })
    @Expose()
    value: number;

    @ApiProperty({ type: String, format: 'date-time', example: '2025-12-31T23:59:59Z' })
    @Expose()
    deadline: Date;

    @ApiProperty({ example: 'Olá! Tenho experiência em projetos similares e entrego antes do prazo.' })
    @Expose()
    message: string;

    @ApiProperty({ enum: ProposalStatus, example: ProposalStatus.PENDING })
    @Expose()
    status: ProposalStatus;

    @ApiProperty({ format: 'uuid' })
    @Expose()
    userId: string;

    @ApiProperty({ format: 'uuid' })
    @Expose()
    jobId: string;

    @ApiProperty({ type: String, format: 'date-time', required: false })
    @Expose()
    updatedAt?: Date;

    @ApiProperty({ type: String, format: 'date-time', required: false })
    @Expose()
    createdAt?: Date;

};
