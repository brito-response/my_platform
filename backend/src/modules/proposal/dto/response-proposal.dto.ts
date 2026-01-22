import { ApiProperty } from '@nestjs/swagger';
import { ProposalStatus } from '../entities/proposal.entity';

export class ResponseProposalDto {
    @ApiProperty({ format: 'uuid', example: '9b9a7b62-fd5a-4e12-9c59-d3b3d6e94c67' })
    proposalId: string;

    @ApiProperty({ example: 2500.5 })
    value: number;

    @ApiProperty({ type: String, format: 'date-time', example: '2025-12-31T23:59:59Z' })
    deadline: Date;

    @ApiProperty({ example: 'Olá! Tenho experiência em projetos similares e entrego antes do prazo.' })
    message: string;

    @ApiProperty({ enum: ProposalStatus, example: ProposalStatus.PENDING })
    status: ProposalStatus;

    @ApiProperty({ format: 'uuid' })
    userId: string;

    @ApiProperty({ format: 'uuid' })
    jobId: string;

    @ApiProperty({ type: String, format: 'date-time', required: false })
    updatedAt?: Date;

    @ApiProperty({ type: String, format: 'date-time', required: false })
    createdAt?: Date;

};
