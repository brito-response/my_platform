export interface ProposalStatusCount {
  status: string;
  count: number;
}

export interface ProposalsData {
  totalProposals: number;
  proposalsByStatus: ProposalStatusCount[];
}
