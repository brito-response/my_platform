import { GithubProjectUrlData, ParsedTask, PortfolioData, ProjectItem, UserTaskProgress } from "../data_types/git";

export function parseGithubProjectUrl(url: string): GithubProjectUrlData {
  const parsedUrl = new URL(url);
  const parts = parsedUrl.pathname.split("/").filter(Boolean);

  if (parts.length !== 4 || parts[0] !== "users" || parts[2] !== "projects") { throw new Error("URL de GitHub Project inválida"); }
  return { username: parts[1], projectNumber: Number(parts[3]) };
}

export function getDefaultLanguages(): PortfolioData[] {
  return [{ linguagem: "Cobol", porcentagem: 0 }, { linguagem: "TypeScript", porcentagem: 0 }, { linguagem: "Python", porcentagem: 0 }, { linguagem: "Java", porcentagem: 0 }, { linguagem: "C#", porcentagem: 0 }];
};

export function parseTaskFromCommit(message: string): ParsedTask | null {
  const match = message.match(/--t\s+([\w-]+)\s+(\d+)\/(\d+)/i);
  if (!match) return null;
  return { taskId: match[1], current: Number(match[2]), total: Number(match[3]) };
}


export function buildUserTaskProgress(items: ProjectItem[]): UserTaskProgress {
  const progress: UserTaskProgress = {};

  items.forEach(item => {
    if (item.content?.__typename !== "PullRequest") return;

    item.content.commits.nodes.forEach(({ commit }) => {
      const parsed = parseTaskFromCommit(commit.message);
      if (!parsed) return;

      const user = commit.author?.user?.login ?? commit.author?.name ?? "unknown";
      if (!progress[user]) {
        progress[user] = { tasks: {} };
      }

      progress[user].tasks[parsed.taskId] = { current: parsed.current, total: parsed.total, completed: parsed.current === parsed.total };
    });
  });

  return progress;
}