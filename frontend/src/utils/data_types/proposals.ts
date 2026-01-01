export enum ProposalStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
}
export interface Proposal {
    proposalId: string;
    value: number;
    deadline: Date;
    message: string;
    status: ProposalStatus;
    userId: string;
    jobId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProposalInput {
    value: number;
    deadline: Date;
    message: string;
    status: ProposalStatus;
    userId: string;
    jobId: string;
};

export interface ProposalStatusCountOut {
    status: string;
    count: number;
}

export interface ProposalsDataOut {
    totalProposals: number;
    proposalsByStatus: ProposalStatusCountOut[];
}
