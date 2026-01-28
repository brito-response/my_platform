import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { ProposalStatus } from '../entities/proposal.entity';

// types for service
export interface ProposalStatusCount {
  status: ProposalStatus;
  count: number;
};

export interface ProposalsData {
  totalProposals: number;
  proposalsByStatus: ProposalStatusCount[];
};


// implents for swagger
export class ProposalStatusCountDto implements ProposalStatusCount {
  @ApiProperty({ example: 'PENDING' })
  status: ProposalStatus;

  @ApiProperty({ example: 10 })
  count: number;
}

@Exclude()
export class ResponseProposalreportsDto implements ProposalsData {

  @ApiProperty({ example: 25 })
  @Expose()
  totalProposals: number;

  @ApiProperty({ type: [ProposalStatusCountDto], example: [{ status: 'PENDING', count: 5 }, { status: 'ACCEPTED', count: 15 }, { status: 'REJECTED', count: 5 }] })
  @Expose()
  proposalsByStatus: ProposalStatusCountDto[];

};
