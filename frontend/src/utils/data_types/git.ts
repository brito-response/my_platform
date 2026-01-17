// Commit individual
export type Commit = {
  message: string;
  committedDate: string;
};

// Conteúdo quando for Pull Request
export type PullRequestContent = {
  __typename: "PullRequest";
  title: string;
  url: string;
  state: "OPEN" | "CLOSED" | string;
  commits: {
    nodes: {
      commit: Commit;
    }[];
  };
};

// Conteúdo quando for Issue
export type IssueContent = {
  __typename: "Issue";
  title: string;
  url: string;
  state: "OPEN" | "CLOSED" | string;
};

// Union discriminada
export type Content = IssueContent | PullRequestContent;

// Item do projeto
export type ProjectItem = {
  id: string;
  content: Content | null;
};

// Resposta completa do GitHub
export type GithubProjectResponse = {
  data: {
    user: {
      projectV2: {
        id: string;
        title: string;
        items: {
          nodes: ProjectItem[];
        };
      } | null;
    } | null;
  };
};

// Stats que o frontend usa
export type ProjectStats = {
  title: string;
  totalItems: number;
  open: number;
  closed: number;
  commits: number;
};

// Dados extraídos da URL
export type GithubProjectUrlData = {
  username: string;
  projectNumber: number;
};


export type GithubRepo = {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    fork: boolean;
    html_url: string;
    description: string | null;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    language: string | null;
    languages_url: string;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    owner: {
        login: string;
        id: number;
        avatar_url: string;
        html_url: string;
    };
};

export type PortfolioData = {
    linguagem: string;
    porcentagem: number;
};