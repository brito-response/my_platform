export interface ProjectOutput {
  projectId: string;
  title: string;
  description: string;
  images: string[];
  link: string;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectPortfolioOutput {
  projectId: string;
  title: string;
  description: string;
  images: string[];
  link: string;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
  ProjectPortfolio: IProjectPortfolioOut;
}

export interface IProjectPortfolioOut {
  projectportifolioId: string;
  projectId: string;
  portfolioId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectInput {
  title: string;
  description: string;
  link: string;
  favorite: boolean;
  portfolioId: string;
}

export interface ProjectsDataOut {
    totalProjects: number;
}