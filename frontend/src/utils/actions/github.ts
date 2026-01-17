import { GithubProjectUrlData } from "../data_types/git";

export function parseGithubProjectUrl(url: string): GithubProjectUrlData {
    const parsedUrl = new URL(url);
    const parts = parsedUrl.pathname.split("/").filter(Boolean);
    // ["users", "brito-response", "projects", "2"]

    if (parts.length !== 4 || parts[0] !== "users" || parts[2] !== "projects") {
        throw new Error("URL de GitHub Project inválida");
    }

    return { username: parts[1], projectNumber: Number(parts[3]) };
}