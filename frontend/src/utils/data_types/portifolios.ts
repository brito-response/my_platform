import { ProjectPortfolioOutput } from "./projects";

export interface Portfolio {
    portfolioId: string;
    title: string | null;
    location: string | null;
    profession: string | null;
    academicBackground: string | null;
    banner: string | null;
    description: string | null;
    githubUsername: string;
    links: string[] | null;
    userId: string;
    createdAt: string;
    updatedAt: string;
    projects:ProjectPortfolioOutput[]
}