import { Proposal } from "./proposals";

export enum StatusJob { OPEN = 'OPEN', IN_PROGRESS = 'IN_PROGRESS', DONE = 'DONE', CANCELLED = 'CANCELLED', };
export enum JobLevel { LOW = "LOW", MEDIUM = "MEDIUM", JUNIOR = "JUNIOR", PLENO = "PLENO", SENIOR = "SENIOR", EXPERT = "EXPERT", };

export interface JobInput {
    title: string;
    description: string;
    level: JobLevel;
    budget: number;
    deadline: string;
    status: StatusJob
    linksReferences: string[];
    userId?: string;
}
// ouputs

export interface JobOutput {
    jobId: string;
    title: string;
    description: string;
    level: JobLevel;
    budget: number;
    deadline: Date;
    status: StatusJob;
    linksReferences: string[];
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface JobWithProposals {
    jobId: string;
    title: string;
    description: string;
    level: JobLevel;
    budget: number;
    deadline: Date;
    status: StatusJob;
    linksReferences: string[];
    userId: string;
    createdAt: Date,
    updatedAt: Date,
    proposals: Proposal[]
}